// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: [
    {
      path: '/public/callback',
      component: '../layouts/UserLayout',
    },
    {
      path: '/',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          path: '/',
          component: '../layouts/BasicLayout',
          authority: ['admin', 'user'],
          routes: [
            {
              path: '/',
              name: 'welcome',
              icon: 'smile',
              component: './Welcome',
            },
            {
              path: '/label_management',
              name: 'label_management',
              icon: 'smile',
              routes: [
                {
                  path: '/label_management/user_label',
                  name: 'user_label',
                  icon: 'smile',
                  component: './LabelManagement/UserLabel',
                },
                {
                  path: '/label_management/group_list',
                  name: 'group_list',
                  icon: 'smile',
                  component: './LabelManagement/GroupList',
                },
                {
                  path: '/label_management/create_group',
                  name: 'create_group',
                  icon: 'smile',
                  component: './LabelManagement/CreateGroup',
                },
                {
                  path: '/label_management/edit_group',
                  name: 'edit_group',
                  icon: 'smile',
                  component: './LabelManagement/EditGroup',
                },
                {
                  path: '/label_management/user_label',
                  name: 'user_label',
                  icon: 'smile',
                  component: './LabelManagement/UserLabel',
                },
                {
                  path: '/label_management/group_users',
                  name: 'group_users',
                  icon: 'smile',
                  component: './LabelManagement/GroupUsers',
                }
              ],
            },
            {
              path: '/abtest',
              name: 'abtest',
              icon: 'smile',
              routes: [
                {
                  path: '/abtest/list',
                  name: 'abtest_list',
                  icon: 'smile',
                  component: './AbTest/List',
                },
                {
                  path: '/abtest/create',
                  name: 'abtest_create',
                  icon: 'smile',
                  component: './AbTest/Create',
                },
                {
                  path: '/abtest/edit',
                  name: 'abtest_edit',
                  icon: 'smile',
                  component: './AbTest/Edit',
                },
                {
                  path: '/abtest/view',
                  name: 'abtest_view',
                  icon: 'smile',
                  component: './AbTest/View',
                }
              ],
            },
            {
              path: '/msg_template',
              name: 'msg_template',
              icon: 'smile',
              component: './MsgTemplate',
            },
            {
              path: '/msg_push',
              name: 'msg_push',
              icon: 'smile',
              routes: [
                {
                  path: '/msg_push/list',
                  name: 'msg_push_list',
                  icon: 'smile',
                  component: './MsgPush/List',
                },
                {
                  path: '/msg_push/create',
                  name: 'msg_push_create',
                  icon: 'smile',
                  component: './MsgPush/Create',
                },
                {
                  path: '/msg_push/edit',
                  name: 'msg_push',
                  icon: 'smile',
                  component: './MsgPush/Edit',
                },
                {
                  path: '/msg_push/view',
                  name: 'msg_push_view',
                  icon: 'smile',
                  component: './MsgPush/View',
                }
              ],
            },
            {
              path: '/user_push_record',
              name: 'user_push_record',
              icon: 'smile',
              component: './UserPushRecord',
            },
            {
              path: '/data_report',
              name: 'data_report',
              icon: 'smile',
              routes: [
                {
                  path: '/data_report/push_effect',
                  name: 'data_report_push_effect',
                  icon: 'smile',
                  component: './DataReport/PushEffect',
                },
                {
                  path: '/data_report/abtest',
                  name: 'data_report_abtest',
                  icon: 'smile',
                  component: './DataReport/AbTest',
                },
                {
                  path: '/data_report/push_stable',
                  name: 'data_report_push_stable',
                  icon: 'smile',
                  component: './DataReport/PushStable',
                },
                {
                  path: '/data_report/hour',
                  name: 'data_report_hour',
                  icon: 'smile',
                  component: './DataReport/Hour',
                },
                {
                  path: '/data_report/day',
                  name: 'data_report_day',
                  icon: 'smile',
                  component: './DataReport/Day',
                }
              ],
            },
            {
              path: '/blackwhite',
              name: 'blackwhite',
              icon: 'smile',
              routes: [
                {
                  path: '/blackwhite/test_white',
                  name: 'blackwhite_test_white',
                  icon: 'smile',
                  component: './BlackWhite/TestWhite',
                },
                {
                  path: '/blackwhite/email_unsubsribe_black',
                  name: 'blackwhite_email_unsubsribe_black',
                  icon: 'smile',
                  component: './BlackWhite/EmailUnsubscribeBlack',
                },
                {
                  path: '/blackwhite/messenger_unsubsribe_black',
                  name: 'blackwhite_messenger_unsubsribe_black',
                  icon: 'smile',
                  component: './BlackWhite/MessengerUnsubscribeBlack',
                }
              ],
            },
            {
              path: '/system_setting',
              name: 'system_setting',
              icon: 'smile',
              routes: [
                {
                  path: '/system_setting/email_account_management',
                  name: 'system_setting_email_account_management',
                  icon: 'smile',
                  component: './SystemSetting/EmailAccountManagement',
                },
                {
                  path: '/system_setting/messenger_ads_management',
                  name: 'system_setting_messenger_ads_management',
                  icon: 'smile',
                  component: './SystemSetting/MessengerAdsManagement',
                },
                {
                  path: '/system_setting/product_site_management',
                  name: 'system_setting_product_site_management',
                  icon: 'smile',
                  component: './SystemSetting/ProductSiteManagement',
                },
                {
                  path: '/system_setting/access_management',
                  name: 'system_setting_access_management',
                  icon: 'smile',
                  component: './SystemSetting/AccessManagement',
                }
              ],
            },
            {
              path: '/account_management',
              name: 'account_management',
              icon: 'smile',
              routes: [
                {
                  path: '/account_management/list',
                  name: 'account_management_list',
                  icon: 'smile',
                  component: './AccountManagement/List',
                }
              ],
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
});
