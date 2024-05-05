// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** checkIn POST /score/checkIn */
export async function checkInUsingPost(options?: { [key: string]: any }) {
  return request<API.BaseResponseString_>('/score/checkIn', {
    method: 'POST',
    ...(options || {}),
  });
}

/** getUserById GET /score/get */
export async function getUserByIdUsingGet(options?: { [key: string]: any }) {
  return request<API.BaseResponseLong_>('/score/get', {
    method: 'GET',
    ...(options || {}),
  });
}
