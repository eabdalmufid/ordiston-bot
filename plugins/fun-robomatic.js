import fetch from 'node-fetch'

let handler = async(m, { conn, args, text }) => {
if (!text) throw "Input text"
const encodedParams = new URLSearchParams();
		encodedParams.append("in", text);
		encodedParams.append("op", "in");
		encodedParams.append("cbot", "1");
		encodedParams.append("SessionID", "RapidAPI1");
		encodedParams.append("ChatSource", "RapidAPI");
		encodedParams.append("cbid", "1");
		encodedParams.append("key", "RHMN5hnQ4wTYZBGCF3dfxzypt68rVP");
		
		const options = {
			method: 'POST',
			headers: {
				'content-type': 'application/x-www-form-urlencoded',
				'X-RapidAPI-Host': 'robomatic-ai.p.rapidapi.com',
				'X-RapidAPI-Key': '414ed3dd91mshcc92bca3c605999p125f24jsnf2650ad70ac3'
			},
			body: encodedParams
		};

	await fetch('https://robomatic-ai.p.rapidapi.com/api.php', options)
	.then(res => res.json())
	.then(res => m.reply(res.out))
	.catch(e => m.reply(eror));
}
handler.command = /^robo$/i
handler.limit = true
export default handler