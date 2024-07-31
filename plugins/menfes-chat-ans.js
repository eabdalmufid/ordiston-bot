export async function before(m, { match }) {
    // if (match) return !1
    if (!m.chat.endsWith('@s.whatsapp.net'))
        return !0
    this.menfes = this.menfes ? this.menfes : {}
    let room = Object.values(this.menfes).find(room => [room.a, room.b].includes(room.b) && room.state === 'CHATTING')
    if (room) {
        if (/^.*(menfesleave|menfesstart)/.test(m.text))
            return
        let other = [room.a, room.b].find(user => user !== m.sender)
        await m.copyNForward(other, true)
    }
    return !0
}