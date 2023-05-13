import plugin from '../src/lib/plugins'
import { EType, Messgetype, PluginType } from '../src/lib/types'

export class isrecall extends plugin {
  [parameter: string]: PluginType
  constructor() {
    super({
      dsc: '引用撤回',
      event: EType.MESSAGES,
      eventType: 'CREATE',
      rule: [
        {
          reg: '^/撤回$',
          fnc: 'recall'
        }
      ]
    })
  }

  async recall(e: Messgetype) {
    const channelID = e.msg.channel_id
    const messageID = e.msg.message_reference.message_id
    const hideTip = true
    await client.messageApi.deleteMessage(channelID, messageID, hideTip)
    await client.messageApi.deleteMessage(channelID, e.msg.id, hideTip)

    if (cfg.sandbox) {
      console.info('撤回消息')
    }
    return false
  }
}
