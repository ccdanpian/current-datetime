import { PluginErrorType, createErrorResponse } from '@lobehub/chat-plugin-sdk';
import moment from 'moment-timezone';

export const config = {
  runtime: 'edge',
};

export default async (req: Request) => {
  // 确保只处理 POST 请求
  if (req.method !== 'POST') {
    return createErrorResponse(PluginErrorType.MethodNotAllowed);
  }
  // 获取请求参数
  const args = await req.json();
  
  // 检查时区参数是否存在，如果不存在，则使用北京时间时区作为默认值
  const timezone = args.timezone || 'Asia/Shanghai';
  
  // 获取当前时间
  const currentTime = moment().tz(timezone).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
  // 获取当前星期几
  const dayOfWeek = moment().tz(timezone).format('dddd');
  
  // 构造响应数据
  const responseData = {
    currentTime: currentTime,
    dayOfWeek: dayOfWeek,
  };
  return new Response(JSON.stringify(responseData));
};
