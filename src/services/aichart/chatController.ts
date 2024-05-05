// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** chatSingle POST / */
export async function chatSingleUsingPost2(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.chatSingleUsingPOST2Params,
  options?: { [key: string]: any },
) {
  return request<API.MonoPromptResponse_>('/', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** chatSingle POST /chat */
export async function chatSingleUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.chatSingleUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.MonoChatResponse_>('/chat', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** chatCont POST /chats */
export async function chatContUsingPost(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.chatContUsingPOSTParams,
  options?: { [key: string]: any },
) {
  return request<API.MonoChatResponse_>('/chats', {
    method: 'POST',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** chatImage POST /image */
export async function chatImageUsingPost(options?: { [key: string]: any }) {
  return request<API.MonoImageResponse_>('/image', {
    method: 'POST',
    ...(options || {}),
  });
}

/** chatSingle POST /prompt */
export async function chatSingleUsingPost1(options?: { [key: string]: any }) {
  return request<API.BaseResponseString_>('/prompt', {
    method: 'POST',
    ...(options || {}),
  });
}

/** chatSingleStream GET /stream/chat */
export async function chatSingleStreamUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.chatSingleStreamUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.FluxString_>('/stream/chat', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** chatContStream GET /stream/chats */
export async function chatContStreamUsingGet(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.chatContStreamUsingGETParams,
  options?: { [key: string]: any },
) {
  return request<API.FluxString_>('/stream/chats', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
