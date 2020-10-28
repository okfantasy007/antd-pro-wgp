/**
 * Ant Design Pro v4 use `@ant-design/pro-layout` to handle Layout.
 * You can view component api by:
 * https://github.com/ant-design/ant-design-pro-layout
 */
import ProLayout, {
  MenuDataItem,
  BasicLayoutProps as ProLayoutProps,
  Settings,
} from '@ant-design/pro-layout';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link, connect, Dispatch, history } from 'umi';
import { Result, Button } from 'antd';
import Authorized from '@/utils/Authorized';
import RightContent from '@/components/GlobalHeader/RightContent';
import { ConnectState } from '@/models/connect';
import { getMatchMenu } from '@umijs/route-utils';
import { getQueryObject } from '@/utils/utils';
import logo from '../assets/logo.svg';
import {TableOutlined} from '@ant-design/icons';
import menuFakeData from '@/mock/menu';


const formatter = (data: any[]) => {
  // @ts-ignore
  const routersData = []
  data.forEach(item => {
    // @ts-ignore
    let m: {
      hideChildrenInMenu: any;
      hideInMenu: any;
      target: any;
      redirect: any;
      icon: any;
    } = getQueryObject(item.params)

    let routerInfo = {
      path: item.module,
      locale: item.action,
      name: item.title,
      icon: <TableOutlined />,
    }
    if (item.children && item.children.length > 0) {
      routerInfo = Object.assign({}, routerInfo, { children: formatter(item.children) })
    }
    if (item.params) {
      routerInfo = Object.assign({}, routerInfo, {
        icon: m.icon,
        redirect: m.redirect,
        target: m.target,
        hideInMenu: m.hideInMenu,
        hideChildrenInMenu: m.hideChildrenInMenu
      })
    }
    if (routerInfo.icon) {
      const { icon } = routerInfo;
      // const v4IconName = toHump(icon.replace(icon[0], icon[0].toUpperCase()));
      // const NewIcon = allIcons[icon] || allIcons[''.concat(v4IconName, 'Outlined')];

      if (icon) {
        try {
          // eslint-disable-next-line no-param-reassign
          // @ts-ignore
          routerInfo.icon = <TableOutlined />
        } catch (error) {
          console.log(error)
        }
      }
    }
    routersData.push(routerInfo)
  })
  // @ts-ignore
  return routersData

};

const noMatch = (
  <Result
    status={403}
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={
      <Button type="primary">
        <Link to="/user/login">Go Login</Link>
      </Button>
    }
  />
);
export interface BasicLayoutProps extends ProLayoutProps {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
  route: ProLayoutProps['route'] & {
    authority: string[];
  };
  settings: Settings;
  dispatch: Dispatch;
}
export type BasicLayoutContext = { [K in 'location']: BasicLayoutProps[K] } & {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
};
/**
 * use Authorized check all menu item
 */

const menuDataRender = (menuList: MenuDataItem[]): MenuDataItem[] =>
  menuList.map((item) => {
    const localItem = {
      ...item,
      children: item.children ? menuDataRender(item.children) : undefined,
    };
    return Authorized.check(item.authority, localItem, null) as MenuDataItem;
  });

const BasicLayout: React.FC<BasicLayoutProps> = (props) => {
  const {
    dispatch,
    children,
    settings,
    location = {
      pathname: '/',
    },
  } = props;

  const menuDataRef = useRef<MenuDataItem[]>([]);

  const [menuData = [], setMenuData] = useState([]);
  useEffect(() => {
    const Token = localStorage.getItem('app-login-token')
    if (Token && dispatch) {
      dispatch({
        type: 'user/fetchCurrent',
      });
      // oa菜单按钮权限
      dispatch({
        type: 'user/fetchAccessList',
        payload: Token,
      });
      dispatch({
        type: 'user/fetchMenus',
        payload: Token,
      })
        .then((res: { data: string | any[]; }) => {
          if (res?.data && res?.data.length > 0) {
            // @ts-ignore
            setMenuData(formatter(menuFakeData))
            // setMenuData(formatter(res.data || []))
          }
        });
    } else {
      window.location.href = `http://oacenter.wondershare.cn/public/logout`
    };
  }, []);

  /**
   * init variables
   */

  const handleMenuCollapse = (payload: boolean): void => {
    if (dispatch) {
      dispatch({
        type: 'global/changeLayoutCollapsed',
        payload,
      });
    }
  };
  // get children authority
  const authorized = useMemo(
    () =>
      getMatchMenu(location.pathname || '/', menuDataRef.current).pop() || {
        authority: undefined,
      },
    [location.pathname],
  );

  return (
    <ProLayout
      logo={logo}
      onCollapse={handleMenuCollapse}
      onMenuHeaderClick={() => history.push('/')}
      menuItemRender={(menuItemProps, defaultDom) => {
        if (menuItemProps.isUrl || !menuItemProps.path) {
          return defaultDom;
        }
        return <Link to={menuItemProps.path}>{defaultDom}</Link>;
      }}
      breadcrumbRender={(routers = []) => {
        console.log('breadcrumbRender routers', routers);
        if (routers.length > 0 && routers[0].path === '/') {
          return [
            {
              path: '/',
              breadcrumbName: '首页',
            }
          ]
        }
        return [
          {
            path: '/',
            breadcrumbName: '首页',
          },
          ...routers,
        ]
      }}
      itemRender={(route, params, routes, paths) => {
        if (routes.length > 1 && routes[0].path === '/' && routes[1].path === '/') {
          return null;
        }
        const first = routes.indexOf(route) === 0;
        return first ? (
          <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
        ) : (
          <span>{route.breadcrumbName}</span>
        );
      }}
      menuDataRender={() => {
        console.log('menuDataRender menuData', menuData);
        return menuData;
      }}
      rightContentRender={() => <RightContent />}
      {...props}
      {...settings}
    >
      <Authorized authority={authorized!.authority} noMatch={noMatch}>
        {children}
      </Authorized>
    </ProLayout>
  );
};

export default connect(({ global, settings }: ConnectState) => ({
  collapsed: global.collapsed,
  settings,
}))(BasicLayout);
