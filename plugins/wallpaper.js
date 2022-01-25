let imageToBase64 = require('image-to-base64');
let axios = require("axios");
let handler = async(m, { conn, text }) => {
  await m.reply('Searching...')
let str = `
Nih Wallpapernya Bosque
`.trim()

    let items = ["wallpaper", "wallpaper indah", "gambar pemandangan", "gambar alam", "wallpaper alam", "wallpaper pemandangan", "pemandangan indah"];
    let wallpaper = items[Math.floor(Math.random() * items.length)];
    let url = "https://api.fdci.se/rep.php?gambar=" + wallpaper;
    
    axios.get(url)
      .then((result) => {
        let b = JSON.parse(JSON.stringify(result.data));
        let wallpaper =  b[Math.floor(Math.random() * b.length)];
        imageToBase64(wallpaper) // Path to the image
        .then(
            (response) => {
	let buf = Buffer.from(response, 'base64'); // Ta-da

    conn.sendFile(m.chat, buf, 'wallpaper.jpg', str, m)
            }
        )
        .catch(
            (error) => {
                console.log(error); // Logs an error if there was one
            }
        )
    
    });
    }
handler.help = ['wallpaper']
handler.tags = ['image']
handler.command = /^(wallpaper)$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null
handler.exp = 0
handler.limit = false

module.exports = handler