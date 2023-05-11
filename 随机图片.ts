import plugin from '../src/lib/plugins'
import { EType, Messgetype, PluginType } from '../src/lib/types'
/** 指令集 */
export class randomImage extends plugin {
  [parameter: string]: PluginType
  constructor() {
    super({
      name: '随机图片', //指令名
      event: EType.MESSAGES, //响应事件
      eventType: 'CREATE', //事件类型
      dsc: '随机二次元图片', //功能说明
      rule: [
        {
          reg: '^/随机图片$', //匹配消息正则，命令正则
          fnc: 'getImage' //函数
        }
      ]
    })
  }
  /**
   * 指令方法
   * @param e 消息对象
   * @returns
   */
  async getImage(e: Messgetype) {
    /* 消息发送机制 */
    e.reply('', {
      /* 网上图片url */
      image: 'https://img.paulzzh.com/touhou/random'
    })
    return false
  }
}
