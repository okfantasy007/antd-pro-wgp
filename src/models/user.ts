import { Effect, Reducer } from 'umi';

import { queryCurrent, queryMenus, queryAccessList, query as queryUsers } from '@/services/user';

export interface CurrentUser {
  avatar?: string;
  name?: string;
  title?: string;
  group?: string;
  signature?: string;
  tags?: {
    key: string;
    label: string;
  }[];
  userid?: string;
  unreadCount?: number;
}

export interface UserModelState {
  currentUser?: CurrentUser;
}

export interface UserModelType {
  namespace: 'user';
  state: UserModelState;
  effects: {
    fetch: Effect;
    fetchCurrent: Effect;
    fetchMenus: Effect;
    fetchAccessList: Effect;
  };
  reducers: {
    saveCurrentUser: Reducer<UserModelState>;
    saveMenus: Reducer<UserModelState>;
    changeNotifyCount: Reducer<UserModelState>;
    saveAccessList: Reducer<UserModelState>;
  };
}

// @ts-ignore
const UserModel: UserModelType = {
  namespace: 'user',

  state: {
    currentUser: {},
    // @ts-ignore
    menus: [],
    isShowAccountConfig: false,
    accessList: [],
  },

  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },
    *fetchCurrent(_, { call, put }) {
      // 请求数据接口
      const response = yield call(queryCurrent);
      // 存储数据
      yield put({
        type: 'saveCurrentUser',
        payload: response,
      });
      return response
    },
    *fetchMenus({ payload }, { call, put }) {
      const response = yield call(queryMenus, payload);
      yield put({
        type: 'saveMenus',
        payload: response,
      });
      return response
    },
    *fetchAccessList({ payload }, { call, put }) {
      // 请求数据接口
      const response = yield call(queryAccessList, payload);
      // 存储数据
      yield put({
        type: 'saveAccessList',
        payload: response,
      });
      return response
    },
  },

  reducers: {
    saveCurrentUser(state, action) {
      return {
        ...state,
        currentUser: action.payload || {},
      };
    },
    saveMenus(state, action) {
      let isShow = false
      action.payload.data.length > 0 && action.payload.data.forEach((item: { action: string; children: { action: string; children: string | any[]; }[]; }) => {
        if (item.action === 'menu.customer-service-management') {
          item.children.forEach((i: { action: string; children: string | any[]; }) => {
            if (i.action === "menu.zendesk-login") {
              isShow = i.children.length === 0 ? false : true
            }
          })
        }
      })
      return {
        ...state,
        menus: action.payload.data || [],
        isShowAccountConfig: isShow
      };
    },
    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
    saveAccessList(state, action) {
      return {
        ...state,
        accessList: action.payload.data || {},
      };
    },
  },
};

export default UserModel;
