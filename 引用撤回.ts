import { plugin, Messagetype } from 'alemon'

export class isrecall extends plugin {
  constructor() {
    super({
      dsc: '引用撤回',
      rule: [
        {
          reg: '^/撤回$',
          fnc: 'recall'
        }
      ]
    })
  }

  async recall(e: Messagetype) {
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
