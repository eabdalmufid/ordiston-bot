import axios from 'axios';
import cheerio from 'cheerio';
import fetch from "node-fetch";
import fs from "fs";
import {
	FormData,
	Blob
} from 'formdata-node';
import {
	fileTypeFromBuffer
} from 'file-type';

async function uploadPomf2(buffer) {
	try {
		const {
			ext,
			mime
		} = await fileTypeFromBuffer(buffer) || {};
		let form = new FormData();
		const blob = new Blob([buffer.toArrayBuffer()], {
			type: mime
		});
		form.append('files[]', blob, 'tmp.' + ext);
		let res = await fetch('https://pomf2.lain.la/upload.php', {
			method: 'POST',
			body: form
		});
		let json = await res.json();
		if (!json.success) throw json;
		return json;
	} catch (error) {
		console.error(error);
		throw error;
	}
}

async function ttsModel() {
	try {
		const response = await axios.get('https://tiktokvoicegenerator.com');
		const $ = cheerio.load(response.data);

		return $('select#voice option[value*="_"]').get().map((option) => ({
			title: $(option).text().trim(),
			id: $(option).attr('value')
		}));
	} catch (error) {
		console.error('Terjadi kesalahan:', error);
		return [];
	}
}

async function tiktokTts(text, model) {
	try {
		const modelVoice = model ? model : "en_us_001";
		const {
			status,
			data
		} = await axios.post("https://tiktok-tts.weilnet.workers.dev/api/generation", {
			text: text,
			voice: modelVoice,
		}, {
			headers: {
				"content-type": "application/json",
			},
		});
		return data;
	} catch (err) {
		console.log(err.response.data);
		return err.response.data;
	}
}

async function enhanceImg(url, scale) {
	const scaleNumber = scale ? scale : 2;
	const {
		data
	} = await axios.post("https://toolsapi.spyne.ai/api/forward", {
		image_url: url,
		scale: scaleNumber,
		save_params: {
			extension: ".png",
			quality: 95,
		},
	}, {
		headers: {
			"content-type": "application/json",
			accept: "*/*",
		},
	});
	return data;
}

async function cekResi(kurir, resi) {
	let {
		data
	} = await axios.post("https://pluginongkoskirim.com/front/resi", {
		kurir: kurir,
		resi: resi,
	}, {
		headers: {
			accept: "*/*",
			"content-type": "application/json",
		},
	});
	return data;
}

const baseCerpen = 'http://cerpenmu.com/100-cerpen-kiriman-terbaru';

const pickRandom = ext => ext[Math.floor(Math.random() * ext.length)];

const fetchURL = async url => {
	const {
		data
	} = await axios.get(url);
	return cheerio.load(data);
};

const listCerpen = async () => {
	const $ = await fetchURL(baseCerpen);
	const result = [];
	$('#content > article > strong > a').each(function() {
		result.push($(this).attr('href'));
	});
	return pickRandom(result);
};

const getUrlCerpenHorror = async () => {
	const randomNumber = Math.floor(Math.random() * 127);
	const $ = await fetchURL(`https://cerpenmu.com/category/cerpen-horor-hantu/page/${randomNumber}`);
	const result = [];
	$('div#wrap > #content > article > article').each(function() {
		result.push($(this).find('h2 > a').attr('href'));
	});
	return pickRandom(result);
};

const getCerpenData = async url => {
	const $ = await fetchURL(url);
	return {
		title: $('#content > article > h1').text(),
		creator: $('#content > article > a:nth-child(2)').text(),
		category: $('#content > article > a:nth-child(4)').text(),
		content: $('#content > article > p').text(),
	};
};

const anime = {
	neko: async () => axios.get('https://api.waifu.pics/sfw/neko'),
	waifu: async () => axios.get('https://api.waifu.pics/sfw/waifu'),
	shinobu: async () => axios.get('https://api.waifu.pics/sfw/shinobu'),
};

const truthOrDare = async (language = 'id') => {
	try {
		const [dareResponse, truthResponse] = await Promise.all([
			axios.post('https://psycatgames.com/api/tod-v2/', {
				id: 'truth-or-dare',
				language,
				category: 'mixed',
				type: 'dare',
			}, {
				headers: {
					Referer: 'https://psycatgames.com'
				},
			}),
			axios.post('https://psycatgames.com/api/tod-v2/', {
				id: 'truth-or-dare',
				language,
				category: 'mixed',
				type: 'truth',
			}, {
				headers: {
					Referer: 'https://psycatgames.com'
				},
			}),
		]);
		const dare = pickRandom(dareResponse.data.results);
		const truth = pickRandom(truthResponse.data.results);
		return {
			status: true,
			dare,
			truth
		};
	} catch (err) {
		console.log(err);
		return {
			status: false,
			message: 'Unknown error occurred'
		};
	}
};

const getCerpen = async () => {
	try {
		const url = await listCerpen();
		const data = await getCerpenData(url);
		return {
			status: true,
			...data
		};
	} catch {
		return {
			status: false,
			message: 'Unknown error occurred'
		};
	}
};

const getCerpenHorror = async () => {
	try {
		const url = await getUrlCerpenHorror();
		const data = await getCerpenData(url);
		return {
			status: true,
			...data
		};
	} catch (err) {
		console.log(err);
		return {
			status: false,
			message: String(err)
		};
	}
};

const baseOtakudesu = "https://otakudesu.wiki/";
const baseFilmApik = "https://film-apik.online/";
const baseSSS = "https://instasupersave.com/";

const convertMs = (duration) => {
	const seconds = parseInt((duration / 1000) % 60);
	const minutes = parseInt((duration / (1000 * 60)) % 60);
	const hours = parseInt((duration / (1000 * 60 * 60)) % 24);
	const formatNumber = (value) => (value < 10 ? "0" + value : value);
	return `${formatNumber(hours)}:${formatNumber(minutes)}:${formatNumber(seconds)}`;
};

const otakuDesuSearch = async (query) => {
	try {
		const {
			data
		} = await axios.get(`${baseOtakudesu}?s=${query}&post_type=anime`);
		const $ = cheerio.load(data);
		const result = {
			status: true,
			data: []
		};

		$(".page > ul > li").each(function() {
			result.data.push({
				title: $(this).find("h2 > a").text().split(" Subtitle")[0],
				status: $(this).find("div:nth-child(4)").text().split(" : ")[1],
				genre: $(this).find("div:nth-child(3)").text().split(" : ")[1],
				rating: $(this).find("div:nth-child(5)").text().split(" : ")[1],
				thumbnail: $(this).find("img").attr("src"),
				url: $(this).find("h2 > a").attr("href"),
			});
		});

		if (result.data.length === 0) {
			return {
				status: false,
				message: "Couldn't find the anime you're looking for"
			};
		}

		return result;
	} catch (error) {
		console.error(error);
		return {
			status: false,
			message: "An error occurred"
		};
	}
};

const filmApikS = async (query) => {
	try {
		const {
			data
		} = await axios.get(`${baseFilmApik}?s=${query}`);
		const $ = cheerio.load(data);
		const result = {
			status: true,
			data: []
		};

		$(".search-page > .result-item > article").each(function() {
			result.data.push({
				title: $(this).find(".details > .title > a").text().replace("Nonton Film ", "").split(" Subtitle")[0].split(" Sub")[0],
				rating: $(this).find(".details > .meta > span").text().replace("IMDb ", "").replace("TMDb ", ""),
				thumbnail: $(this).find(".image > div > a > img").attr("src"),
				url: $(this).find(".image > div > a").attr("href"),
				synopsis: $(this).find(".details > .contenido > p").text(),
			});
		});

		if (result.data.length === 0) {
			return {
				status: false,
				message: "Couldn't find the movie you're looking for"
			};
		}

		return result;
	} catch (error) {
		console.error(error);
		return {
			status: false,
			message: "An error occurred"
		};
	}
};

const filmApikDl = async (url) => {
	try {
		const {
			data
		} = await axios.get(`${url}/play`);
		const result = {
			status: true,
			creator: "Wudysoft",
			Url: {},
		};
		const $ = cheerio.load(data);

		$(".box_links #download > .links_table > .fix-table > center > a").each(function() {
			const provider = $(this).text().split(" ")[1];
			const url = $(this).attr("href");
			result.Url[provider] = url;
		});

		if (Object.keys(result.Url).length === 0) {
			return {
				status: false,
				message: "Couldn't find the download link"
			};
		}

		return result;
	} catch (error) {
		console.error(error);
		return {
			status: false,
			message: "An error occurred"
		};
	}
};

async function findSongs(text) {
	try {
		const {
			data
		} = await axios.get("https://songsear.ch/q/" + encodeURIComponent(text));
		const $ = cheerio.load(data);
		const result = {
			title: $("div.results > div:nth-child(1) > .head > h3 > b").text() + " - " + $("div.results > div:nth-child(1) > .head > h2 > a").text(),
			album: $("div.results > div:nth-child(1) > .head > p").text(),
			number: $("div.results > div:nth-child(1) > .head > a").attr("href").split("/")[4],
			thumb: $("div.results > div:nth-child(1) > .head > a > img").attr("src")
		};

		const {
			data: lyricData
		} = await axios.get(`https://songsear.ch/api/song/${result.number}?text_only=true`);
		const lyrics = lyricData.song.text_html.replace(/<br\/>/g, "\n").replace(/&#x27;/g, "'");

		return {
			status: true,
			title: result.title,
			album: result.album,
			thumb: result.thumb,
			lyrics: lyrics
		};
	} catch (err) {
		console.log(err);
		return {
			status: false,
			error: "Unknown error occurred"
		};
	}
}

async function igStalk(username) {
	try {
		const {
			data
		} = await axios.get(`${baseSSS}api/ig/userInfoByUsername/${username}`);
		const pronouns = data.result.user.pronouns.length === 0 ? "" : data.result.user.pronouns.join("/");
		const res = data.result.user;

		return {
			status: true,
			creator: "Wudysoft",
			username: res.username,
			fullName: res.full_name,
			followers: res.follower_count,
			following: res.following_count,
			pronouns,
			verified: res.is_verified,
			private: res.is_private,
			totalPosts: res.media_count,
			bio: res.biography,
			externalUrl: res.external_url,
			urlAcc: `https://instagram.com/${username}`,
			profilePic: res.hd_profile_pic_url_info.url,
			pkId: res.pk_id
		};
	} catch (err) {
		console.log(err);
		return {
			status: false,
			creator: "Wudysoft",
			message: "Tidak dapat menemukan akun"
		};
	}
}

async function similarBand(query) {
	try {
		const {
			data
		} = await axios.get(`https://www.music-map.com/${query}`);
		const result = [];
		const $ = cheerio.load(data);
		$("#gnodMap > a").each(function() {
			result.push($(this).text());
		});

		return result;
	} catch (err) {
		console.log(err);
		return {
			status: false,
			message: "Error, I can't find similar band that you're looking for"
		};
	}
}

export {
	uploadPomf2,
	enhanceImg,
	cekResi,
	tiktokTts,
	ttsModel,
	anime,
	truthOrDare,
	getCerpen,
	getCerpenHorror,
	findSongs,
	igStalk,
	similarBand,
	otakuDesuSearch,
	filmApikS,
	filmApikDl
};