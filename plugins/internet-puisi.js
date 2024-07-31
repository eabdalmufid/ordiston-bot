/*
Made by Ordiston
*/

import fetch from 'node-fetch'
let handler = async (m, { text, command, usedPrefix, args }) => {
let urut = text.split`|`
let one = urut[0]
let two = urut[1]

if (command == 'poetry') {
  let url = await fetch('https://poetrydb.org/author')
  let poetry = await url.json()
  let res = poetry.authors
  let row = Object.keys(res).map((v, index) => ({
		title:res[v],
		description: '',
		rowId: usedPrefix + 'poetrygeta ' + res[v]
	}))
	let button = {
		buttonText: 'Poetry Disini',
		description: `⚡ Silakan pilih poetry di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`,
		footerText: author
	}
	return await conn.sendListM(m.chat, button, row, m)
	}
	
	if (command == 'poetrygeta') {
	let url = await fetch('https://poetrydb.org/author/' + text)
	let poetry = await url.json()
	let listSections = []
	Object.values(poetry).map((v, index) => {
	listSections.push([' [ ' + ++index + ' ] ' + v.title, [
          [v.author, usedPrefix + 'poetrygetb ' + text + '|' + index, v.linecount + ' baris']
        ]])
	})
	return conn.sendList(m.chat, htki + ' 📺 Poetry 🔎 ' + htka, '⚡ Berikut daftar List Poetry...\nAkses langsung dengan copy namanya', author, 'Klik Disini', listSections, m)
  }
  
  
  if (command == 'poetrygetb') {
  let url = await fetch('https://poetrydb.org/author/' + one)
	let poetry = await url.json()
	let keyl = poetry[two].lines
	let str = keyl.join('\r\n')
	let caption = '*' + poetry[two].title + '*' + '\n\n' + str + '\n\n' + '*-' + poetry[two].author + '*'
	throw caption
  }
  
}
handler.help = ['poetry']
handler.tags = ['internet']
handler.command = /^poetry(get[ab])?$/i
handler.limit = true

export default handler
