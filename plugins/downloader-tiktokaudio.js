import fetch from 'node-fetch'

var handler = async (m, {
	text,
	conn,
	usedPrefix,
	command
}) => {
	var delay = time => new Promise(res => setTimeout(res, time))
	if (!text) throw `Example: ${usedPrefix + command} https://vt.tiktok.com/ZS81qJD5v/`;
	if (!(text.includes('http://') || text.includes('https://'))) return m.reply(`url invalid, please input a valid url. Try with add http:// or https://`);
	var body = text.replace(/\s+/g, '+')
	try {
		var {
			data,
			code,
			msg
		} = await tiktokDl(body)
		if (code !== 0) throw msg
			var vid = data.music || data.play
			await conn.sendFile(m.chat, vid, 'tiktok.mp3', '', m)
	} catch (e) {
		m.reply(eror)
	};
};
handler.help = ['tiktokaudio'].map((v) => v + ' <url>');
handler.tags = ['downloader'];
handler.command = /^(tiktokaudio)$/i

export default handler;
async function tiktokDl(url) {
	var xzn = await fetch('https://www.tikwm.com/api/?url=' + url)
	var wtf = xzn.json();
	return wtf
}