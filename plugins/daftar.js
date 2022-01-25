let { pickRandom } = require('../lib/functions')
let { createHash } = require('crypto')

let handler = async(m, { conn, text, usedPrefix, command }) => {
let [name, age, kota] = text.split `|`

  let user = global.DATABASE._data.users[m.sender]
  if (user.registered === true) throw `*「 SUDAH TERDAFTAR 」*\n\nAnda sudah terdaftar!\n\nMau Daftar ulang?\nKetik ${usedPrefix}unreg <sn>`
  let regTime = user.regTime
  let sn = createHash('md5').update(m.sender).digest('hex')
  let totalreg = Object.values(global.DATABASE._data.users).filter(user => user.registered == true).length
  let who = conn.getName(m.sender)
  let rage = `${pickRandom(['12','13','14','15','16','17','18','19','20','21','22','23','24'])}`
  let racity = `${pickRandom(['Bandung','Bogor','Jakarta','Maluku','Semaranag','Palembang','Badui'])}`

  if (!text) throw `Format salah!\n\nContoh :\n${usedPrefix}daftar ${who}|${rage}|${racity}`
  if (!name) throw 'Nama tidak boleh kosong!'
  if (!age) throw 'Umur tidak boleh kosong!'
  if (name > 10) throw 'Namamu terlalu panjang!'
  if (name < 2) throw 'Namamu terlalu pendek!'
  if (age > 40) throw 'Umurmu terlalu tua,, Maximal 40 tahun!'
  if (age < 12) throw 'Umurmu terlalu muda,, Minimal 12 tahun!'
  if (!kota) throw `Nama Kota tidak boleh kosong!`
  if (kota > 10) throw `Nama Kota terlalu panjang!`
  if (kota < 2) throw `Nama Kota terlalu pendek!`

  if (user.registered == false) {
  user.name = name
  user.age = parseInt(age)
  user.regTime = + new Date
  user.registered = true
   await conn.reply(m.chat, `
Pendaftaran Berhasil!


╭─「 INFO DAFTAR 」
│
│• Nama : ${name}
│• Umur : ${age} tahun
│• Kota : ${kota}
│• Total Reg : ${totalreg} nomor
│• Terdaftar Pada :
│${new Date(regTime)}
│• Kode Gift :
│${pickRandom(['inikodegiftcok','CryptoBwos01jabKhP10KjUuupO201Zx','BbJdQ0X37ohL016HhqK','BbL016JJQBCSr54OwwW0','giftkey01389320007','kode013923'])}
│• Serial Number :
│${sn}
╰────

*Hadiah Berdaftar!*
KodeGift sekarang dapat digunakan!
Ketik ${usedPrefix}freegift <kodegiftmu> untuk dapatkan hadiah!
Contoh :
${usedPrefix}freegift QQnsWa4261VVyz103B

*Daftar Ulang?*
Jika Anda salah daftar/ingin daftar ulang
Ketik ${usedPrefix}unreg <kode snmu>
Contoh :
${usedPrefix}unreg 2fbe2e4c979d6fd49eb02762f4580ff426e5a5d2
`.trim(), m)
  }
}
handler.help = ['daftar','register'].map(v => v + ' <nama|umur|kota>')
handler.tags = ['daftar']
handler.command = /^daftar|(reg)ister$/i

handler.register = true

module.exports = handler
