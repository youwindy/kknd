import { Messgetype } from '../src/lib/types';

// 触发词
const bot = '思知';
let choice = 0;
const names = ['思知', '青云客']

export const rule = [
    {
        name: 'ai', //中文名
        event: 'MESSAGES', //响应频道事件
        eventType: 'CREATE', //创建类型
        dsc: '机器人', //【命令】功能说明
        priority: 5000, //优先级，越小优先度越高
        reg: bot, //正则指令
        fnc: 'testAi' //函数匹配10
    }, {
        name: 'ai帮助', //中文名
        event: 'MESSAGES', //响应频道事件
        eventType: 'CREATE', //创建类型
        dsc: '/ai帮助', //【命令】功能说明
        priority: 5000, //优先级，越小优先度越高
        reg: '^/ai帮助$',
        fnc: 'aiHelp'
    }, {
        name: 'ai选择', //中文名
        event: 'MESSAGES', //响应频道事件
        eventType: 'CREATE', //创建类型
        dsc: '/ai选择', //【命令】功能说明
        priority: 5000, //优先级，越小优先度越高
        reg: '^/ai选择(.*)$',
        fnc: 'aiChoose'
    }
]
export async function aiHelp(e: Messgetype) {
    e.reply(`发送/ai选择+ai对应数字选择ai
        0.思知
        1.青云客`)
    return true
}
// 切换ai
export async function aiChoose(e: Messgetype) {
    const message = e.cmd_msg;
    choice = parseInt(message.replace(/\D/g, ''));
    if (choice < names.length) {
        e.reply(`切换成功,当前ai${names[choice]}`)
    }
    else {
        choice = 0;
        e.reply(`暂时没有那么多ai哦,已为您切换至${names[choice]}`);
    }
    return true
}


export async function testAi(e: Messgetype) {
    const lists = [
        'https://api.ownthink.com/bot?appid=xiaosi&userid=user&spoken=',
        'http://api.qingyunke.com/api.php?key=free&appid=0&msg=']
    const question = e.cmd_msg.replace(bot, '');
    const response = await fetch(lists[choice] + question);
    const answer = await response.json();
    if (choice == 0) {
        e.reply(answer.data.info.text)
    }
    else if (choice == 1) {
        e.reply(answer['content'])
    }
    return true
}
