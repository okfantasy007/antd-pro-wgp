import { MenuDataItem } from '@ant-design/pro-layout';
import { history, ConnectProps, connect } from 'umi';
import React, { useEffect } from 'react';
import { ConnectState } from '@/models/connect';
import { parse } from 'querystring';
import { message } from 'antd';

const queryParse = parse(location.search.replace('?', ''))
localStorage.setItem('app-login-token', queryParse.token as string)

const appLoginToken = localStorage.getItem('app-login-token')

export interface UserLayoutProps extends Partial<ConnectProps> {
  breadcrumbNameMap: {
    [path: string]: MenuDataItem;
  };
}
const UserLayout: React.FC<UserLayoutProps> = (props) => {

  const { dispatch } = props;
  useEffect(() => {
    debugger
    if(appLoginToken) {
      if (dispatch) {
        dispatch({
          type: 'user/fetchCurrent',
        }).then((res: { code: number; }) => {
          if (res.code === 0) {
            history.push('/welcome');
          } else {
            message.error('系统异常');
          }
        });
      }
    } else {
      window.location.href = `http://oacenter.wondershare.cn/public/logout`
    }
  }, []);
  return <></>;
};

export default connect(({ settings }: ConnectState) => ({ ...settings }))(UserLayout);
