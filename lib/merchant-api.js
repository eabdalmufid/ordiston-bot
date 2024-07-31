import axios from "axios"
import { createHash } from "node:crypto";

function md5(content, algo = "md5") {
  const hashFunc = createHash(algo);   // you can also sha256, sha512 etc
  hashFunc.update(content);
  return hashFunc.digest("hex");       // will return hash, formatted to HEX
}

		var userid = "4IBPmfPZ";
		var apikey = "9WMugYrv57cppyyEAZmb0LVXcWagTjr6YGbFqBZd1WeHDq1tTxKLwc2R2t0l36GA";
		var sign = md5(`${userid}${apikey}`);
		var headers = {
			"user-agent": "FrierenDv NodeJS(18.1x)",
		};
		
		var api = {
			prepaid: "https://ampangpedia.com/api/prepaid",
			social_media: "https://ampangpedia.com/api/social-media",
		};
	
	
	// Probably usefull
	async function profile() {
		let Response = {};
		const { data } = await axios
			.request({
				url: "https://ampangpedia.com/api/profile",
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					...headers,
				},
				data: new URLSearchParams({
					key: apikey,
					sign: sign,
				}),
			})
			.catch((e) => (e === null || e === void 0 ? void 0 : e.response));
		if (data.result && data.data) {
			Object.assign(Response, { ...data });
		} else {
			if (typeof data === "object") {
				Object.assign(Response, { ...data });
			} else {
				return data;
			}
		}
		return Response;
	}
	async function watch(trxid) {
		let retry = 0;
		let Response;
		while (true) {
			const { data } = await axios
				.request({
					url: api.prepaid,
					method: "POST",
					headers: {
						"Content-Type": "application/x-www-form-urlencoded",
						...headers,
					},
					data: new URLSearchParams({
						key: apikey,
						sign: sign,
						type: "status",
						trxid: trxid,
					}),
				})
				.catch((e) => (e === null || e === void 0 ? void 0 : e.response));
			if (data.result) {
				const { status } = Array.isArray(data.data) ? data.data[0] : data.data;
				if (status === "success") {
					Response = data;
					break;
				}
				if (status === "error") {
					Response = data;
					break;
				}
			} else {
				retry = retry + 1;
				if (retry >= 20) {
					Response = data.data ? data.data : false;
					break;
				}
			}
		}
		return Response;
	}
	async function post(api, opts) {
		const { data } = await axios
			.request({
				url: api,
				method: "POST",
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					...headers,
				},
				data: new URLSearchParams({
					key: apikey,
					sign: sign,
					...opts,
				}),
			})
			.catch((e) => (e === null || e === void 0 ? void 0 : e.response));
		if (data && typeof data === "object") {
			return {
				...data,
			};
		} else {
			return data;
		}
	}
	async function prepaid() {
		const order = async (service, id, server) => {
			if (!service || !id) {
				return {
					status: false,
					messagge: `Missing ${!service ? "service code" : "data_no"}`,
				};
			}
			return post(api.prepaid, {
				type: "order",
				service,
				data_no: `${id}${server ? server : ""}`,
			});
		};
		const status = async (trxid, limit) => {
			return post(api.prepaid, {
				type: "status",
				trxid: trxid ? trxid : "",
				limit: typeof limit === "number" ? limit : "",
			});
		};
		const services = async (filter_type, filter_value) => {
			return post(api.prepaid, {
				type: "services",
				filter_type: filter_type ? filter_type : "",
				filter_value: filter_value ? filter_value : "",
			});
		};
		var prepaid = {
			order,
			status,
			services,
		};
		return prepaid;
	}
	async function media() {
		const order = async (service, id, server) => {
			if (!service || !data_no) {
				return {
					status: false,
					messagge: `Missing ${!service ? "service code" : "data_no"}`,
				};
			}
			return post(api.social_media, {
				type: "order",
				service,
				data_no: `${id}${server ? server : ""}`,
			});
		};
		const status = async (trxid, limit) => {
			return post(api.social_media, {
				type: "status",
				trxid: trxid ? trxid : "",
				limit: limit ? limit : "",
			});
		};
		const services = async (filter_type, filter_value) => {
			return post(api.social_media, {
				type: "services",
				filter_type: filter_type ? filter_type : "",
				filter_value: filter_value ? filter_value : "",
			});
		};
		var media = {
			order,
			status,
			services,
		};
		return media;
	}

export { profile, watch, prepaid, post, media }