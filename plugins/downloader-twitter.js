/*import fetch from 'node-fetch';
import { twitter } from "social_media_downloader"; // Add this import
import hx from 'hxz-api';

let handler = async (m, { args, usedPrefix, command }) => {
    if (!args[0]) {
        return m.reply('Masukkan Link Twitter yang ingin diunduh.');
    }

    try {
        let list = '*⚡ Twitter Search Result ⚡*\n\n';
        list += `1. *Metode A*\n   ${usedPrefix}${command} ${args[0]} v1\n\n`;
        list += `2. *Metode B*\n   ${usedPrefix}${command} ${args[0]} v2\n\n`;
        list += `3. *Metode C*\n   ${usedPrefix}${command} ${args[0]} v3\n\n`;
        list += 'Ketik angka metode untuk memilih Twitter Search.\nContoh: ' + usedPrefix + command + ' ' + args[0] + ' v1';

        if (args[1] === 'v1') {
            let res = await twitterDl(args[0]);
            for (let x = 0; x < res.media.length; x++) {
                let caption = x === 0 ? res.caption.replace(/https:\/\/t.co\/[a-zA-Z0-9]+/gi, '').trim() : '';
                conn.sendFile(m.chat, res.media[x].url, '', caption, m);
            }
        } else if (args[1] === 'v2') {
            await hx.fbdown(`${args[0]}`)
                .then(G => {
                    let ten = `${G.HD}`;
                    conn.sendFile(m.chat, ten, '', `*desc*: ${G.desc}\n━━━━━•───────────────\n       ⇆  ❚❚ ▷  ↻`, m);
                });
        } else if (args[1] === 'v3') {
            let p = await twitter(args[0]);
            throw p;
        } else {
            m.reply(list);
        }
    } catch (e) {
        m.reply('Error. Periksa kembali link atau metode yang Anda masukkan.');
    }
};

handler.help = ['twitter'].map(v => v + ' <query>');
handler.tags = ['downloader'];
handler.command = /^twit(t(er(dl)?)?)?$/i;

export default handler;

async function twitterDl(url) {
	let id = /twitter\.com\/[^/]+\/status\/(\d+)/.exec(url)[1]
	if (!id) throw 'Invalid URL'
	let res = await fetch(`https://tweetpik.com/api/tweets/${id}`)
	if (res.status !== 200) throw res.statusText
	let json = await res.json()
	if (json.media) {
		let media = []
		for (let i of json.media) {
			if (/video|animated_gif/.test(i.type)) {
				let vids = await (await fetch(`https://tweetpik.com/api/tweets/${id}/video`)).json()
				let vid = vids.variants.pop()
				media.push({
					url: vid.url,
					type: i.type
				})
			} else {
				media.push({
					url: i.url,
					type: i.type
				})
			}
		}
		return {
			caption: json.text,
			media 
		}
	} else throw 'No media found'
}*/

import fetch from 'node-fetch'

let handler = async (m, { conn, text }) => {
	if (!text) throw 'Input Twitter URL'
	let res = await twitterDl(text)
	await m.reply('_In progress, please wait..._')
	for (let x = 0; x < res.media.length; x++) {
		let caption = x === 0 ? res.caption.replace(/https:\/\/t.co\/[a-zA-Z0-9]+/gi, '').trim() : ''
		conn.sendFile(m.chat, res.media[x].url, '', caption, m)
	}
}
handler.help = ['twitter']
handler.tags = ['downloader']
handler.command = /^((twt|twitter)(dl)?)$/i

export default handler

async function twitterDl(url) {
	let id = /twitter\.com\/[^/]+\/status\/(\d+)/.exec(url)[1]
	if (!id) throw 'Invalid URL'
	let res = await fetch(`https://tweetpik.com/api/tweets/${id}`)
	if (res.status !== 200) throw res.statusText
	let json = await res.json()
	if (json.media) {
		let media = []
		for (let i of json.media) {
			if (/video|animated_gif/.test(i.type)) {
				let vid = await (await fetch(`https://tweetpik.com/api/tweets/${id}/video`)).json()
				vid = vid.variants.pop()
				media.push({
					url: vid.url,
					type: i.type
				})
			} else {
				media.push({
					url: i.url,
					type: i.type
				})
			}
		}
		return {
			caption: json.text,
			media 
		}
	} else throw 'No media found'
}