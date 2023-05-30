import { plugin, Messagetype } from 'alemon'

/** 指令集 */
export class randomImage extends plugin {
  constructor() {
    super({
      name: '随机图片',
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
  async getImage(e: Messagetype): Promise<boolean> {
    /* 消息发送机制 */
    e.reply('', {
      /* 网上图片url */
      image: 'https://img.paulzzh.com/touhou/random'
    })
    return false
  }
}
