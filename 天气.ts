import { Messgetype } from '../src/lib/types'
/**
 * 指令集
 */
export const rule = [
  {
    name: '天气', //中文名
    event: 'MESSAGES', //响应频道事件
    eventType: 'CREATE', //创建类型
    dsc: '^/(.*)天气$', //【命令】功能说明
    priority: 5000, //优先级，越小优先度越高
    reg: '^/(.*)天气$', //匹配消息正则，命令正则
    fnc: 'getWeather' //函数
  }
]

/**
 * 指令方法
 * @param e 消息对象
 * @returns
 * 天气
 */
export async function getWeather(e: Messgetype) {
  const regex = /^\/(.*)天气$/;
  const matchResult = e.cmd_msg.match(regex);
  let address = '';
  if (matchResult) {
    address = matchResult[1];
  } else {
    e.reply('地址错误')
  }

  // 根据地址获取locationId
  const key = '2091da0c93dc4b90a00803f0d5f61b32'
  const address1 = await fetch(`https://geoapi.qweather.com/v2/city/lookup?location=${address}&key=${key}`)
  const location = await address1.json()
  
  const locationId = location['location'][0]['id'];
  // 获取天气信息
  const api = `https://devapi.qweather.com/v7/weather/now?location=${locationId}&key=${key}`;
  const res = await fetch(api);
  const data = await res.json();

  const centent = ''
  const obj = {
    embed: {
      title: ` ${location['location'][0]['adm1']} ${location['location'][0]['adm2']}`,
      prompt: `实时天气`,
      thumbnail: {
        url: ''
      },
      fields: [
        {
          name: `天气: ${data.now.text}`
        },
        {
          name: `温度: ${data.now.temp}`
        }, {
          name: `风: ${data.now.windScale}级${data.now.windDir}`
        }, {
          name: `风速: ${data.now.windSpeed}`
        }
      ]
    }
  }

  e.reply(centent, obj)
}
