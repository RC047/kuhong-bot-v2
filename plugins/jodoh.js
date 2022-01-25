let handler  = async (m, { conn }) => {
  conn.reply(m.chat,`${pickRandom(global.jodoh)}`, m)
}
handler.help = ['jodoh']
handler.tags = ['primbon']
handler.command = /^(jodoh)$/i
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

global.jodoh = [
'Jodohmu Berawal Dari Huruf : A',
'Jodohmu Berawal Dari Huruf : B',
'Jodohmu Berawal Dari Huruf : C',
'Jodohmu Berawal Dari Huruf : D',
'Jodohmu Berawal Dari Huruf : E',
'Jodohmu Berawal Dari Huruf : F',
'Jodohmu Berawal Dari Huruf : G',
'Jodohmu Berawal Dari Huruf : H',
'Jodohmu Berawal Dari Huruf : I',
'Jodohmu Berawal Dari Huruf : J',
'Jodohmu Berawal Dari Huruf : K',
'Jodohmu Berawal Dari Huruf : L',
'Jodohmu Berawal Dari Huruf : N',
'Jodohmu Berawal Dari Huruf : M',
'Jodohmu Berawal Dari Huruf : O',
'Jodohmu Berawal Dari Huruf : P',
'Jodohmu Berawal Dari Huruf : Q',
'Jodohmu Berawal Dari Huruf : R',
'Jodohmu Berawal Dari Huruf : S',
'Jodohmu Berawal Dari Huruf : T',
'Jodohmu Berawal Dari Huruf : U',
'Jodohmu Berawal Dari Huruf : V',
'Jodohmu Berawal Dari Huruf : W',
'Jodohmu Berawal Dari Huruf : X',
'Jodohmu Berawal Dari Huruf : Y',
'Jodohmu Berawal Dari Huruf : Z',
'_Jodohmu tidak bisa ditentukan_',
'_Anda akan selalu Jomblo_',
'_Jodohmu akan ada nanti di Akhirat_',
]