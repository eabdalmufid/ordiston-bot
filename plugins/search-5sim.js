import axios from 'axios'

let bestPrice = 1337, bestPriceCT = ''
let token = "eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MDg0MjUwNTIsImlhdCI6MTY3Njg4OTA1MiwicmF5IjoiNzRmYjkyNDJiZDI0MGJjNGViYzk1ODQ5NTQxNzU4ZGMiLCJzdWIiOjE0NTc0NTJ9.xCeLJwMW0U5TDNgQOp-RSwprRxZXTv-2GBIUDnMb5T8LjyAL_quVH_86VdHdHLmPuzi0vTjNQUTBEYM4naOW13pkhgb5pzLcjkCvPaC65S8frr8UqQ38IuQsfObc2FSKCkikks0li6fvFDxnsXfhhAOHjd1fftzHAP8AZkOW4PNZx4jNTDCescaYwt-1aM2MKEecXV_7vyrdqoHO7SYnpIFpLurPS0LlYsLbYm9ceT-hf8YVQitvPjQSkjcjudgKIm6QSHzEazPLDld0SQAWHmTVba06TIJYwjK0B_8mfnRONrnkrcpyx9Vt1r6nbfclnRYzFQfd3UQ02Cl7Eyhxeg"
let handler = async (m, { conn, args }) => {
	if (!args[0]) throw 'What product you want to search?'
	let product = args[0].toLowerCase(), txt = '*List Price :*\n'
	for (let country of await getCountryList()) {
		let data = await getProductList(country)
		txt += `- *${country.capitalize()}*, ${data[product]?.['Price'] ? data[product]?.['Price'] + '₽' : 'Unknown Price'}\n`
		if (data[product]?.['Price'] < bestPrice) {
			bestPrice = data[product]?.['Price']
			bestPriceCT = country
		}
	}
	m.reply(`${bestPriceCT ? '*The Best Price is ' + bestPrice + '₽ From ' + bestPriceCT : '' + '*'}\n\n${txt}`.trim())
	bestPriceCT = null
}
handler.tags = handler.help = ['search']
handler.command = /^5sim$/i

export default handler

async function getCountryList() {
	let res = await axios.get('https://5sim.net/v1/guest/countries', {
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
    }
});
return Object.keys(res.data)
}

async function getProductList(country) {
let res_ = await axios.get('https://5sim.net/v1/guest/products/' + country.toLowerCase() + '/any', {
    headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + token
    }
});
return res_.data
}