import request from '@/utils/request';

export async function query(): Promise<any> {
  return request('/api/users');
}

export async function queryMenus(token: string) {
  return request(`/api/v1/common/menus?token=${token}`);
}

export async function queryCurrent(): Promise<any> {
  return request('/api/v1/common/users');
}

export async function queryNotices(): Promise<any> {
  return request('/api/notices');
}

// 请求accessList列表
export async function queryAccessList(token: string) {
  return request(`/api/v1/common/access-list?token=${token}`);
}
