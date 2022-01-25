let handler = async (m, { text }) => {

    let emojis = ["🍎", "🍌", "🍇", "♦️", "🥇", "💵"];
    let a = Math.floor(Math.random() * emojis.length);
    let b = Math.floor(Math.random() * emojis.length);
    let c = Math.floor(Math.random() * emojis.length);
    let x = [],
        y = [],
        z = [];
    for (let i = 0; i < 3; i++) {
        x[i] = emojis[a];
        a++;
        if (a == emojis.length) a = 0;
    }
    for (let i = 0; i < 3; i++) {
        y[i] = emojis[b];
        b++;
        if (b == emojis.length) b = 0;
    }
    for (let i = 0; i < 3; i++) {
        z[i] = emojis[c];
        c++;
        if (c == emojis.length) c = 0;
    }
    let end;
    if (a == b && b == c) {
        end = 'JACKPOT!!! *+10000 EXP!*';
        global.DATABASE._data.users[m.sender].exp += 10000

    } else if (a == b || a == c || b == c) {
        end = 'Dikit Lagi! *+500 EXP!*';
        global.DATABASE._data.users[m.sender].exp += 500
    } else {
        end = 'Coba Lagi!';
    }
return m.reply(`
*「 SLOT MACHINE 」*

${x[0]} | ${y[0]} | ${z[0]}
${x[1]} | ${y[1]} | ${z[1]} <===
${x[2]} | ${y[2]} | ${z[2]}

${end}
`.trim()
    )
}
handler.help = ['slot']
handler.tags = ['game']
handler.command = /^(slot?)$/i
handler.limit = true
handler.register = true

module.exports = handler
