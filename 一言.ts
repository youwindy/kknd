import { Messgetype } from '../src/lib/types'

/**
 * 指令集
 */
export const rule = [
  {
    name: '一言', //中文名
    event: 'MESSAGES', //响应频道事件
    eventType: 'CREATE', //创建类型
    dsc: '/一言', //【命令】功能说明
    priority: 5000, //优先级，越小优先度越高
    reg: '^/一言$', //匹配消息正则，命令正则
    fnc: 'getText' //函数
  }
]

/**
 * 指令方法
 * @param e 消息对象
 * @returns
 * 一言 
 */
export async function getText(e: Messgetype) {
  const api = 'http://api.guaqb.cn/v1/onesaid/';
  const res = await fetch(api);
  const text = await res.text();

  // 去除文本中的html标签
  function stripHtmlTags(text: string): string {
    return text.replace(/<\/?[^>]+(>|$)/g, '');
  }
  const cleanText = stripHtmlTags(text);
  e.reply(`${cleanText}`)
  return false
}
