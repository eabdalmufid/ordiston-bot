const cooldown = 300000;
let handler = async (m, { usedPrefix }) => {
    let user = global.db.data.users[m.sender];
    let timers = cooldown - (new Date() - user.lastmining);

    if (user.health < 80) {
        return m.reply(`
⚠️ Butuh setidaknya 80 ❤️Healths untuk menambang!! ⚠️
Silakan beli ❤️Healths terlebih dahulu dengan mengetik *${usedPrefix}buy potion <jumlah>*,
dan ketik *${usedPrefix}heal <jumlah>* untuk menggunakan potion.
`.trim());
    }

    if (user.pickaxe == 0) {
        return m.reply('⛏️ Kamu tidak bisa menambang tanpa alat penambang (pickaxe)! ⛏️');
    }

    if (new Date() - user.lastmining <= cooldown) {
        return m.reply(`
⏳ Kamu sudah menambang sebelumnya! Silakan tunggu *${(timers / 1000).toFixed(2)} detik* sebelum menambang lagi.
`.trim());
    }

    const rewards = reward(user);
    let text = 'Kamu telah menambang dan kehilangan';
    for (const lost in rewards.lost) {
        if (user[lost]) {
            const total = rewards.lost[lost].getRandom();
            user[lost] -= total * 1;
            if (total) {
                text += `\n*${global.rpg.emoticon(lost)}${lost}:* ${total}`;
            }
        }
    }

    text += '\n\nNamun kamu mendapatkan';
    for (const rewardItem in rewards.reward) {
        if (rewardItem in user) {
            const total = rewards.reward[rewardItem].getRandom();
            user[rewardItem] += total * 1;
            if (total) {
                text += `\n*${global.rpg.emoticon(rewardItem)}${rewardItem}:* ${total}`;
            }
        }
    }

    m.reply(text.trim());
    user.lastmining = new Date() * 1;
};

handler.help = ['mining'];
handler.tags = ['rpg'];
handler.command = /^(mining)$/i;
handler.cooldown = cooldown;
handler.disabled = false;
handler.group = true;

export default handler;


function reward(user = {}) {
    let rewards = {
        reward: {
            exp: 1000,
            trash: 101,
            string: 25,
            rock: 30,
            iron: 25,
            diamond: 10,
            emerald: 4,
            common: 2 * (user.dog && (user.dog > 2 ? 2 : user.dog) * 1.2 || 1),
            uncommon: [0, 0, 0, 1, 0].concat(
                new Array(5 - (
                    (user.dog > 2 && user.dog < 6 && user.dog) || (user.dog > 5 && 5) || 2
                )).fill(0)
            ),
            mythic: [0, 0, 0, 0, 0, 1, 0, 0, 0].concat(
                new Array(8 - (
                    (user.dog > 5 && user.dog < 8 && user.dog) || (user.dog > 7 && 8) || 3
                )).fill(0)
            ),
            legendary: [0, 0, 0, 0, 0, 0, 0, 1, 0, 0].concat(
                new Array(10 - (
                    (user.dog > 8 && user.dog) || 4
                )).fill(0)
            ),
            iron: [0, 0, 0, 1, 0, 0],
            gold: [0, 0, 0, 0, 0, 1, 0],
            diamond: [0, 0, 0, 0, 0, 0, 1, 0].concat(
                new Array(5 - (
                    (user.fox < 6 && user.fox) || (user.fox > 5 && 5) || 0
                )).fill(0)
            ),
        },
        lost: {
            health: 40 - user.cat * 4,
            pickaxedurability: 10
        }
    }
    return rewards
}