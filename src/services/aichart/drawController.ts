// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** getAwardList GET /lottery/award/list */
export async function getAwardListUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getAwardListUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseListAwardListDTO_>('/lottery/award/list', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** draw GET /lottery/draw */
export async function drawUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.drawUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.BaseResponseString_>('/lottery/draw', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
