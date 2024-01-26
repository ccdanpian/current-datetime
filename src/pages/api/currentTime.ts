import { PluginErrorType, createErrorResponse } from '@lobehub/chat-plugin-sdk';
import moment from 'moment-timezone';

export const config = {
  runtime: 'edge',
};


export default async (req: Request) => {
  // 确保只处理 POST 请求
  if (req.method !== 'POST') return createErrorResponse(PluginErrorType.MethodNotAllowed);

  // const rawArgs = req.body;
  const args = await req.json();

  // 获取当前的北京时间
  const currentTime = moment().tz(args.timezone).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
  // 获取当前是星期几
  const dayOfWeek = moment().tz(args.timezone).format('dddd')
  // 构造响应数据
  const responseData = {
    currentTime: currentTime,
    dayOfWeek: dayOfWeek,
  };

  return new Response(JSON.stringify(responseData));
};