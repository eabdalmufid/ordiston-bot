import moment from 'moment-timezone'
import PhoneNum from 'awesome-phonenumber'

let regionNames = new Intl.DisplayNames(['en'], {
    type: 'region'
})

let handler = async (m, {
    conn,
    usedPrefix,
    text,
    command,
    args
}) => {
    let pc = Object.entries(conn.chats)
        .map(([nama, isi]) => ({
            nama,
            ...isi
        }))
        .filter(v => !v.nama.endsWith('g.us') && v.nama.endsWith('s.whatsapp.net'));

    if (!args[0]) {
        let list = pc.map((chat, index) => {
            const messagesCount = chat.messages ? Object.keys(chat.messages).length : 0;
            return `*[ ${index + 1} ]*\n*Name:* ${chat.name || ''}\n*Number:* ${chat.id.split('@')[0] || ''}\n*Presences:* ${chat.presences || ''}\n*Messages:* ${messagesCount}`;
    }).join('\n\n');
        m.reply(`📺 Private List:\n\n${list}`);
    } else {
        let i = parseInt(args[0]) - 1;
        if (!pc[i]) {
            return m.reply('Invalid index!');
        }

        let presences = pc[i].presences || 'Tidak diketahui';

        let num = pc[i].id
        if (!(await conn.onWhatsApp(num))[0]?.exists) throw 'User not exists'
        let img = await conn.profilePictureUrl(num, 'image').catch(_ => './src/avatar_contact.png')
        let bio = await conn.fetchStatus(num).catch(_ => {})
        let name = await conn.getName(num)
        let business = await conn.getBusinessProfile(num)
        let format = PhoneNum(`+${num.split('@')[0]}`)
        let country = regionNames.of(format.getRegionCode('international'))
        let wea = `\n\n*▾ WHATSAPP ▾*\n\n*° Country :* ${country.toUpperCase()}\n*° Name :* ${name ? name : '-'}\n*° Presences :* ${presences ? presences : '-'}\n*° Format Number :* ${format.getNumber('international')}\n*° Url Api :* wa.me/${num.split('@')[0]}\n*° Mentions :* @${num.split('@')[0]}\n*° Status :* ${bio?.status || '-'}\n*° Date Status :* ${bio?.setAt ? moment(bio.setAt.toDateString()).locale('id').format('LL') : '-'}\n\n${business ? `\t\t\t\t*▾ INFO BUSINESS ▾*\n\n*° BusinessId :* ${business.wid}\n*° Website :* ${business.website ? business.website : '-'}\n*° Email :* ${business.email ? business.email : '-'}\n*° Category :* ${business.category}\n*° Address :* ${business.address ? business.address : '-'}\n*° Timeone :* ${business.business_hours.timezone ? business.business_hours.timezone : '-'}\n*° Descripcion* : ${business.description ? business.description : '-'}` : '*Standard WhatsApp Account*'}`
        img ? await conn.sendMessage(m.chat, {
            image: {
                url: img
            },
            caption: wea,
            mentions: [num]
        }, {
            quoted: m,
            ephemeralExpiration: ephemeral
        }) : m.reply(wea)
    }

}
handler.help = ['listpc']
handler.tags = ['owner']
handler.command = ['listpc']

export default handler