import { plugin, Messagetype } from 'alemon'

// 触发词
const bot = '思知'
let choice = 0
const names = ['思知', '青云客']

export class someAi extends plugin {
  constructor() {
    super({
      name: 'ai',
      dsc: '机器人',
      rule: [
        {
          reg: bot,
          fnc: 'testAi'
        },
        {
          reg: '^/ai帮助$',
          fnc: 'aiHelp'
        },
        {
          reg: '^/ai选择(.*)$',
          fnc: 'aiChoose'
        }
      ]
    })
  }
  async testAi(e: Messagetype) {
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
    return false
  }
  async aiHelp(e: Messagetype) {
    e.reply(`发送/ai选择+ai对应数字选择ai
        0.思知
        1.青云客`)
    return false
  }
  async aiChoose(e: Messagetype) {
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
