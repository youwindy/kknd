import plugin from '../src/lib/plugins'
import { EType, Messgetype, PluginType } from '../src/lib/types'
/**
 * 指令集
 */
export class weather extends plugin {
  [parameter: string]: PluginType
  constructor() {
    super({
      name: '天气',
      event: EType.MESSAGES,
      eventType: 'CREATE',
      dsc: '^/(.*)天气$',
      rule: [
        {
          reg: '^/(.*)天气$',
          fnc: 'getWeather'
        }
      ]
    })
  }

  async getWeather(e: Messgetype) {
    const regex = /^\/(.*)天气$/
    const matchResult = e.cmd_msg.match(regex)
    let address = ''
    if (matchResult) {
      address = matchResult[1]
    } else {
      e.reply('地址错误')
    }

    // 根据地址获取locationId
    const key = '2091da0c93dc4b90a00803f0d5f61b32'
    const address1 = await fetch(
      `https://geoapi.qweather.com/v2/city/lookup?location=${address}&key=${key}`
    )
    const location = await address1.json()
    if (location.code == '404') {
      e.reply('地址信息出错，请输入城市名')
    } else {
      const locationId = location['location'][0]['id']
      // 获取天气信息
      const api = `https://devapi.qweather.com/v7/weather/now?location=${locationId}&key=${key}`
      const res = await fetch(api)
      const data = await res.json()

      const time = new Date(data.updateTime)
      const updateTime = time.toLocaleString('zh-CN')

      e.reply(
        segment.embed(
          ` ${location['location'][0]['adm1']}${location['location'][0]['adm2']}  ${data.now.text}`,
          `实时天气`,
          e.msg.author.avatar,
          [
            `温度: ${data.now.temp}`,
            `风: ${data.now.windScale}级${data.now.windDir}`,
            `风速: ${data.now.windSpeed}`,
            `更新时间: ${updateTime}`
          ]
        )
      )
      return false
    }
  }
}
