import { Messgetype } from '../src/lib/types'

/** 指令集 */
export const rule = [
  {
    name: '随机图片',          //指令名
    event: 'MESSAGES',      //响应事件
    eventType: 'CREATE',    //事件类型
    dsc: '随机二次元图片', //功能说明
    priority: 5000,         //优先级，越小优先度越高
    reg: '^/随机图片$',     //匹配消息正则，命令正则
    fnc: 'getImage'       //函数
  }
]

/**
 * 指令方法
 * @param e 消息对象
 * @returns
 */
export async function getImage(e: Messgetype) {

  // console.log(e)

  /* 消息发送机制 */
  e.reply('', {
    /* 网上图片url */
    image: 'https://img.paulzzh.com/touhou/random'
  })
  return false
}
