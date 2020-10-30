import request from '@/utils/request';
import { TableListParams } from './data.d';

export async function queryList(params?: { page: any; page_size: any }, recordId?: string) {
  return request(`/api/v1/dashboard/report/customer/list/${recordId}`, {
    params,
  });
}

export async function queryProductLines() {
  return request(`/api/v1/dashboard/report/customer/pline/list`, {});
}
