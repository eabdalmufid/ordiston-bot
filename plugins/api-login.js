import axios from 'axios'

let handler = async (m, { conn, text, usedPrefix, command }) => {
  	if (!text) throw `  *[ Api Ordiston | Auth ]*\n\nContoh Penggunaaan:\n${usedPrefix+command} username,email,password\n${usedPrefix+command} clarisa,clarisa@gmail.com,sandi321\n`
    let [username, email, password] = text.split(",")
    if (!username) throw `Masukan Usernamenya`
    if (!email) throw `Masukan Emailnya`
	if (!validateEmail(email)) throw 'Email Invalid'
    if (!password) throw `Masukan Passwordnya`
	await axios.post("https://api.ordiston.xyz/users/register", new URLSearchParams(Object.entries({
		username,
		email,
		password,
		confirmPassword: password
	})))
    .then((res) => {
    	m.reply("Sukses, data sudah di kirim private chat, silahkan cek email kamu untuk verifikasi email ke website api")
    	conn.reply(m.sender, `  *[ YOUR ACCOUNT ]*\n\nName: ${username}\nEmail: ${email}\nPassword: ${password}`, m)
    })
    .catch((err) => {
    	m.reply("Terjadi kesalahan saat register")
    })
}
handler.help = ["login"]
handler.command = ["login"]

export default handler

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}