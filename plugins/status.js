let { performance } = require('perf_hooks')
let fetch = require('node-fetch')

let handler = async(m, { conn, text }) => {

  await m.reply('Testing...')
 let device = `Samsung Galaxy S10`
 let d = new Date
 let gmt = new Date(0).getTime() - new Date('1 January 1970').getTime()
 let battery = ['100','99','98','97','96','95','94','93','92','91','90','89','88','87','86','85','84','83','82','81','80','79','78','77','76','75','74','73','72','71','70','69','68','67','66','65','64','63','62','61','60','59','58','57','56','55','54','53','52','51','50','49','48','47','46','45','44','43','42','41','40','39','38','37','36','35','34','33','32','31','30','29','28','27','26','25','24','23','22','21','20','19','18','17','16','15','14','13','12','11','10','9','8','7','6','5','4','3','2','1'][Math.floor(((d * 1) + gmt) / 8460) % 100]
 let ip = `175.158.53.30`
 let ver = `Baileys`
 let version = `2.21.3.19`
 let mcc = `000`
 let mnc = `000`
 let os = `9.0`
 let browser = `Chrome (Mozzila)`
 let agent = `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36 Edg/89.0.774.68`
 let cpu = `Exynos 9820 (8 nm) - EMEA/LATAM`
 let rom = `${pickRandom(['120','121','119.2','118.7','124.1','124.5','124.9','126.3','126','126.6','126.8','126.9','126.1','127.2','125','125.7','125.3','114.9','113.4','124.2','122','117','117.7','117.9','117.6','117.4','117.1','117.2','118.6','119'])}GB / 128 GB`
 let status = `${pickRandom(['Fine','Fine','Fine','Fine','Fine','Updated','Updated','Bad','Not Good'])}`
 let charging = `${pickRandom(['false','false','false','true','true','true','false','false','true','false','null'])}`
 let connection = `${pickRandom(['4G','3G','4G','4G','4G','4G','3G','H+','H+','3G','4G','H','H+','H','3G','E','null'])}`
 let img2url = `${pickRandom(['null','null','null','undefined','https://i.ibb.co/frhZmyZ/pp.jpg'])}`
 let totalreg = Object.keys(global.DATABASE._data.users).length
 let totalgc = Object.keys(global.DATABASE._data.chats).length
 let totalft = Object.keys(global.DATABASE._data.stats).length
 let totalsend = global.DATABASE._data.stats['menu.js'].total
 let json = await (await fetch(`https://api.zeks.xyz/api`)).json()
 let old = performance.now()
 let neww = performance.now()

let hasil = `
╭─「 BOT STATUS 」
│
│• Device : ${device}
│• Status : ${status}
│• OS : ${os}
│• Ram : ${json.RAM}
│• Rom : ${rom}
│• Cpu :
│${cpu}
│• Battery : ${battery}%
│• Online : ${json.UPTIME}
│• Status Charging : ${charging}
│• Connection : ${connection}
│• Class : ${ver}
│• IP : ${ip}
│• WA Version : ${version}
│• Browser : ${browser}
│• User Agent :
│${agent}
│• MCC : ${mcc}
│• MNC : ${mnc}
│• Img2Url : ${img2url}
│• Total Reg : ${totalreg} nomor
│• Total Grup : ${totalgc} grup
│• Total Fitur : ${totalft} fitur
│• Total Balasan : ${totalsend} pesan
│• SpeedSec : ${json.SPEED}
│• SpeedMs :
│${neww - old} Ms
╰────
`.trim()

  await conn.reply(m.chat, hasil, m)
}
handler.help = ['status','ping']
handler.tags = ['info']
handler.command = /^(status|ping)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 10
handler.limit = false

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}
