let handler = async (m, { usedPrefix }) => m.reply(`
╭─「 BUY PREMIUM 」
│
│ > Keuntungan :
│• Limit Tidak Terbatas!
│• Fitur Premium Dapat Digunakan!
│• Dapat Menambahkan Bot Ke Grup!
│(nyewa bot)
│
│ > Bonus :
│• Diberikan Kode Gift Premium Seminggu!
│
│ > Harga :
│• 10K / Bulan (4 Minguu)
│• 30K / Tahun (12 Bulan)
│• 50K / VIP (Permanen + Bebas)
│
│ > Pembayaran :
│• https://saweria.co/RC047
│(Gopay, Ovo, Dana, LinkAJa, Qris)
╰────

List yang Beli Premium :
Silahkan ketik ${usedPrefix}ld
`.trim()) // Tambah sendiri kalo mau
handler.help = ['premium']
handler.tags = ['premium']
handler.command = /^(premium)$/i

handler.exp = 50

module.exports = handler
