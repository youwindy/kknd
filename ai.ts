import plugin from '../src/lib/plugins'
import { EType, Messgetype, PluginType } from '../src/lib/types'

// 触发词
const bot = '思知'
let choice = 0
const names = ['思知', '青云客']

export class someAi extends plugin {
  [parameter: string]: PluginType
  constructor() {
    super({
      name: 'ai',
      event: EType.MESSAGES,
      eventType: 'CREATE',
      dsc: '机器人',
      rule: [
        {
          reg: bot,
          fnc: 'testAi'
        }
      ]
    })
  }
  async testAi(e: Messgetype) {
    const lists = [
      'https://api.ownthink.com/bot?appid=xiaosi&userid=user&spoken=',
      'http://api.qingyunke.com/api.php?key=free&appid=0&msg='
    ]
    const question = e.cmd_msg.replace(bot, '')
    const response = await fetch(lists[choice] + question)
    const answer = await response.json()
    if (choice == 0) {
      e.reply(answer.data.info.text)
    } else if (choice == 1) {
      e.reply(answer['content'])
    }
    return true
  }
}

export class aiHelp extends plugin {
  [parameter: string]: PluginType
  constructor() {
    super({
      name: 'ai帮助',
      event: EType.MESSAGES,
      eventType: 'CREATE',
      dsc: 'ai帮助',
      rule: [
        {
          reg: '^/ai帮助$',
          fnc: 'aiHelp'
        }
      ]
    })
  }

  async aiHelp(e: Messgetype) {
    e.reply(`发送/ai选择+ai对应数字选择ai
        0.思知
        1.青云客`)
    return true
  }
}
// ai选择
export class aiChoose extends plugin {
  [parameter: string]: PluginType
  constructor() {
    super({
      name: 'ai选择',
      event: EType.MESSAGES,
      eventType: 'CREATE',
      dsc: '/ai选择',
      rule: [
        {
          reg: '^/ai选择(.*)$',
          fnc: 'aiChoose'
        }
      ]
    })
  }

  // 切换ai
  async aiChoose(e: Messgetype) {
    const message = e.cmd_msg
    choice = parseInt(message.replace(/\D/g, ''))
    if (choice < names.length) {
      e.reply(`切换成功,当前ai${names[choice]}`)
    } else {
      choice = 0
      e.reply(`暂时没有那么多ai哦,已为您切换至${names[choice]}`)
    }
    return true
  }
}
