export async function all(m) {
    if (!m.isGroup)
        return
    let chats = global.db.data.chats[m.chat]
    if (!chats.expired)
        return !0
    if (+new Date() > chats.expired) {
        let caption = `Bye🖐 *${this.user.name}* akan left dari grup!!`
    await this.sendButton(m.chat, caption, wm, null, [['Delete Expired', '/delexpired'], ['Cek Expired', '/cekexpired']], null)
        await this.groupLeave(m.chat)
        chats.expired = null
    }
}