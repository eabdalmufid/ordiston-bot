import fetch from "node-fetch";
import cheerio from "cheerio";

let handler = async (m, { conn, args, usedPrefix, command }) => {
try {
	if (!(args[0] || args[1]))
		throw `contoh:\n${
			usedPrefix + command
		} 1 2\n\nmaka hasilnya adalah surah Al-Fatihah ayat 2`;
	if (isNaN(args[0]) || isNaN(args[1]))
		throw `contoh:\n${
			usedPrefix + command
		} 1 2\n\nmaka hasilnya adalah surah Al-Fatihah ayat 2 `;
	let res = await alquran(args[0], args[1]);
	m.reply(wait)
	m.reply(
		`
${res.arab}
${res.latin}

${res.terjemahan}
${readMore}
${res.tafsir}

( ${res.surah} )
`.trim()
	);
	//conn.sendFile(m.chat, res.audio, "audio.mp3", "", m);
	await conn.sendMessage(m.chat, { audio: { url: res.audio }, ptt: true, mimetype: "audio/mpeg", fileName: "vn.mp3", waveform: [0,100,0,100,0] }, { quoted: m, ephemeralExpiration: ephemeral })
	} catch (e) {
	throw eror
	}
};
handler.help = ["alquran <114> <1>"];
handler.tags = ["quran"];
handler.command = /^(al)?quran$/i;
export default handler;

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

async function alquran(surah, ayat) {
	let res = await fetch(`https://kalam.sindonews.com/ayat/${ayat}/${surah}`);
	if (!res.ok) throw "Error, maybe not found?";
	let $ = cheerio.load(await res.text());
	let content = $(
		"body > main > div > div.content.clearfix > div.news > section > div.list-content.clearfix"
	);
	let Surah = $(content).find("div.ayat-title > h1").text();
	let arab = $(content).find("div.ayat-detail > div.ayat-arab").text();
	let latin = $(content).find("div.ayat-detail > div.ayat-latin").text();
	let terjemahan = $(content)
		.find("div.ayat-detail > div.ayat-detail-text")
		.text();
	let tafsir = "";
	$(content)
		.find("div.ayat-detail > div.tafsir-box > div")
		.each(function () {
			tafsir += $(this).text() + "\n";
		});
	tafsir = tafsir.trim();
	let keterangan = $(content).find("div.ayat-detail > div.ayat-summary").text();
	// https://quran.kemenag.go.id/assets/js/quran.js
	let audio = `https://raw.githubusercontent.com/AyGemuy/quran-json/main/Audio/${
		surah < 10 ? "00" : surah >= 10 && surah < 100 ? "0" : ""
	}${surah}/${
		ayat < 10 ? "00" : ayat >= 10 && ayat < 100 ? "0" : ""
	}${ayat}.mp3`;
	return {
		surah: Surah,
		arab,
		latin,
		terjemahan,
		tafsir,
		audio,
		keterangan,
	};
}