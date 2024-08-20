import cheerio from "cheerio";
import { URL } from "url";
import axios from "axios";
import crypto from "crypto";
import { Agent } from "https";

const Instance = axios.create({});

Instance.interceptors.response.use((response) => {
	if (response.status !== 200) {
		return { error: true, data: response.data };
	}
	return { error: false, data: response.data };
});

Instance.interceptors.request.use((config) => {
	config.headers["Referer"] = config.url;
	config.headers["User-Agent"] = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML like Gecko) Chrome/89.0.4389.90 Safari/537.36";
	config.httpsAgent = new Agent({
		keepAlive: true,
	});
	return config;
});


export default async function doods(url, opts = {}) {
	return fetch_url(url, opts).catch((err) => {
		return {
			error: true,
			message: err,
		};
	});
}

async function fetch_url(url, opts = {}) {
	const { data, error } = await Instance.get(url);
	if (error) {
		throw new Error("Error fetching url");
	}
	const iframe_url = get_iframe_url(data);
	if (!iframe_url) {
		const base_url = get_base_url(url).endsWith("/")
			? get_base_url(url)
			: get_base_url(url) + "/";
		const { path, token, expiry, char } = get_token(data);
		const _url = await pass_hash(base_url + path, { Referer: url });
		if (!_url) {
			throw new Error("Error fetching url");
		}
		return {
			url: _url,
			fullUrl: _url + char + "?" + new URLSearchParams({ token, expiry }),
			meta: {
				token,
				expiry,
				char,
			},
			download: () =>
				download(_url + char + "?" + new URLSearchParams({ token, expiry }), opts),
		};
	}
	const base_url = get_base_url(url);
	return doods(base_url + iframe_url, { ...opts });
}

async function pass_hash(url, opts = {}) {
	const { data, error } = await Instance.get(url, opts);
	if (error) {
		throw new Error("Error fetching url");
	}
	return data;
}

async function download(url, opts = {}) {
	return Instance.get(url, {
		...opts,
		headers: {
			"User-Agent":
				"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML like Gecko) Chrome/89.0.4389.90 Safari/537.36",
			Referer: "https://doodstream.com/",
		},
	});
}

function get_iframe_url(html) {
	const $ = cheerio.load(html);
	const iframe = $("#os_player iframe");
	const src = iframe.attr("src");
	return src;
}

function get_base_url(url) {
	const { origin } = new URL(url);
	return origin;
}
function random_str() {
	return crypto.randomBytes(10).toString('hex');
}

function get_token(html) {
	const $ = cheerio.load(html);
	const scripts = $("script");
	for (let i = 0; i < scripts.length; i++) {
		const script = scripts[i];
		const text = $(script).html();
		if (text.includes("data:text/vtt;base64")) {
			const expiry = Date.now();
			const hash = text.split("hash=")[1].split("&")[0];
			const token = text.split("token=")[1].split("&")[0];
			return {
				path: join_url_parts("pass_md5", hash, token),
				expiry,
				token,
				char: random_str(),
			};
		}
	}
}
function join_url_parts(...parts) {
	return parts.join("/");
}