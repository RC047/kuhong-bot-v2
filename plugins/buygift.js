let handler = async m => m.reply(`
╭─「 BUY GIFT CODE 」
│
│ > Keterangan :
│• Fitur Gift adalah fitur kode yang berisi
│hadiah! Anda bisa mendapatkan exp & limit
│sepuasnya! Hingga masa berlaku kodegiftnya habis!
│
│ > Kode Gratis :
│• Kode akan dberikan dengan cara berdaftar
│
│ > Harga :
│• 5K / Minggu (7 Hari)
│• 15K / Bulan (4 Minggu)
│• 30K / VIP (Permanen)
│
│ > Pembayaran :
│• Saweria :
│https://saweria.co/RC047
│• Pulsa (TRI +5K) :
│+62895337278647
╰────
`.trim()) // Tambah sendiri kalo mau
handler.help = ['buygift']
handler.tags = ['hadiah']
handler.command = /^(buygift)$/i

module.exports = handler
