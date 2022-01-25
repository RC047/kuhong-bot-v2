let { getBuffer, succes } = require('/data/data/com.termux/files/home/kuhong/lib/functions.js')

let handler  = async (m, { conn }) => {

let buff = await getBuffer('https://i.ibb.co/305yt26/bf84f20635dedd5dde31e7e5b6983ae9.jpg')

  conn.sendFile(m.chat, buff, 'truth.jpg', `“${pickRandom(global.truth)}”`, m)
}
handler.help = ['truth']
handler.tags = ['game']
handler.command = /^(truth)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler

function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}

global.truth = [
"Acara tv apa yang paling kamu benci?\nBerikan alasannya!",
"Apa baju yang (menurutmu) paling jelek yang pernah kamu pakai, dan kapan kamu memakainya?",
"Apa hal paling buruk (gosip) yang pernah kamu bilang tentang temenmu?",
"Apa hal paling memalukan dari dirimu?",
"Apa hal paling memalukan dari temanmu?",
"Apa hal pertama yang kamu lihat saat kamu melihat orang lain (lawan jenis)?",
"Apa hal pertama yang terlintas di pikiranmu saat kamu melihat cermin?",
"Apa hal terbodoh yang pernah kamu lakukan?",
"Apa hal terbodoh yang pernah kamu lakukan?",
"Apa ketakutan terbesar kamu?",
"Apa mimpi terburuk yang pernah kamu alami?",
"Apa mimpi terkonyol yang sampai sekarang kamu kamu ingat?",
"Apa pekerjaan paling konyol yang pernah kamu bayangin kamu akan jadi?",
"Apa sifat terburukmu menurut kamu?",
"Apa sifat yang ingin kamu rubah dari dirimu?",
"Apa sifat yang ingin kamu rubah dari temanmu?",
]
