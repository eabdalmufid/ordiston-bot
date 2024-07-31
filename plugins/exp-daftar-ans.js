export async function before(m) {
    let user = global.db.data.users[m.sender];
        if (user.banned) return this.reply(m.chat, "Lu olang kena banned ama oe la!", m);
        if (!m.quoted || !m.quoted.fromMe || !m.quoted.isBaileys || !m.text) return true;
        this.registrasi = this.registrasi || {};
        if (!this.registrasi[m.chat] || m.quoted.id != this.registrasi[m.chat].MSG.key.id) return;
        let txt = (m.msg && m.msg.selectedDisplayText ? m.msg.selectedDisplayText : m.text ? m.text : '');
        if (!txt) return this.reply(m.chat, "Lu masukkan input a!", m);
        if (txt === this.registrasi[m.chat].OTP) {
            user.name = this.registrasi[m.chat].NAME.trim();
            user.age = this.registrasi[m.chat].AGE;
            user.regTime = +new Date;
            user.registered = true;
            
            let benar = `✨ OTP Benar!\n@${m.sender.split('@')[0]} telah di verifikasi!\n\n`;
            await this.sendMessage(m.chat, {
                text: benar,
                mentions: [m.sender],
            }, {
                quoted: m,
                ephemeralExpiration: ephemeral
            });
            await this.sendMessage(m.sender, {
                image: this.registrasi[m.chat].VERIFIED,
                caption: this.registrasi[m.chat].CAPTION,
                mentions: [m.sender],
            }, {
                quoted: m,
                ephemeralExpiration: ephemeral
            });
            clearTimeout(this.registrasi[m.chat].timeout);
            await this.sendMessage(m.chat, { delete: this.registrasi[m.chat].MSG.key });
            delete this.registrasi[m.chat];
        } else {
            let salah = `✖️ OTP Salah!\n@${m.sender.split('@')[0]} tidak di verifikasi!`;
            await this.sendMessage(m.chat, {
                text: salah,
                mentions: [m.sender],
            }, {
                quoted: m,
                ephemeralExpiration: ephemeral
            });
            clearTimeout(this.registrasi[m.chat].timeout);
            await this.sendMessage(m.chat, { delete: this.registrasi[m.chat].MSG.key });
            delete this.registrasi[m.chat];
        }
        return true;
    }