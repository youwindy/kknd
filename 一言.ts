import plugin from '../src/lib/plugins'
import { EType, Messgetype, PluginType } from '../src/lib/types'

/**
 * 指令集
 */
export class yiyan extends plugin {
  [parameter: string]: PluginType
  constructor() {
    super({
      dsc: '/一言', //【命令】功能说明
      name: '一言', //中文名
      event: EType.MESSAGES, //响应频道事件
      eventType: 'CREATE', //创建类型
      rule: [
        {
          reg: '^/一言$', //匹配消息正则，命令正则
          fnc: 'getText' //函数
        }
      ]
    })
  }
  /**
   * 指令方法
   * @param e 消息对象
   * @returns
   * 一言
   */
  async getText(e: Messgetype) {
    const api = 'http://api.guaqb.cn/v1/onesaid/'
    const res = await fetch(api)
    const text = await res.text()

    // 去除文本中的html标签
    function stripHtmlTags(text: string): string {
      return text.replace(/<\/?[^>]+(>|$)/g, '')
    }
    const cleanText = stripHtmlTags(text)
    e.reply(`${cleanText}`)
    return false
  }
}
