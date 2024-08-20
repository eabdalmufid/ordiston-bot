import fs from 'fs';
import axios from 'axios';
import cheerio from 'cheerio';
import FormData from 'form-data';
import chalk from 'chalk';
import { fileURLToPath } from 'url';
const base = `https://m.photofunia.com`;

async function photofunSearch(teks) {
    try {
        const response = await axios.get(`${base}/search?q=${teks}`);
  const html = response.data;
  const $ = cheerio.load(html);
  const effectsArray = $('.effects-list li').map((index, element) => {
    const title = $(element).find('.name').text().trim();
    const link = $(element).find('a').attr('href');
    const description = $(element).find('.description').text().trim();
    const image = $(element).find('img').attr('src');
    if (title && link && description && image) {
      return { judul: title, link: base + link, desc: description, thumb: image };
    }
  }).get().filter(effect => effect !== undefined);
  return effectsArray;
    } catch (error) {
        console.error(error);
        return [];
    }
}

async function photofunEffect(url) {
    try {
        const emror = { "error": "Link Tidak Valid" };
        if (!url.includes(base)) return emror;
        const res = await axios.get(url);
        const $ = cheerio.load(res.data);
        const hasil = [];
        const inputs = [];
        const exam = $('div > div.image-preview > a > img').attr('src');
        const judul = $('div > h2').text();
        $('form > div >  input').each(function(a, b) {
            const input = $(b).attr('name');
            inputs.push({ input });
        });
        const desc = $('div.description').text();
        hasil.push({ judul, desc, exam, inputs });
        return hasil;
    } catch (error) {
        console.error(error);
        return {};
    }
}

async function photofunUse(teks, url) {
    try {
        const emror = { "error": "Link Tidak Valid" };
        if (!url.includes(base)) return emror;
        const form = new FormData();
        form.append("text", teks);
        const post = await fetch(url, {
            method: "POST",
            headers: { "User-Agent": "GoogleBot", ...form.getHeaders() },
            body: form.getBuffer(),
        });
        const html = await post.text();
        const $ = cheerio.load(html);
        const gambar = $('div.image-container').find('img').attr('src');
        return gambar;
    } catch (error) {
        console.error(error);
        return '';
    }
}

async function getCookies() {
    try {
        const response = await axios.get("https://photofunia.com/images?server=1", {
            headers: {
                "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; Flow) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/359.0.0.288 Safari/537.36",
                "Accept": "application/json, text/javascript, */*; q=0.01",
                "Host": "photofunia.com"
            }
        });
        const coki = response.headers['set-cookie'][0].split(';')[0];
        return { coki };
    } catch (e) {
        return handleError(e);
    }
}

async function getImageKey(url, image) {
    const u = new URL(url);
    try {
        const { coki } = await getCookies();
        const form = new FormData();
        form.append("image", image, { filename: `${Math.floor(Math.random() * 10000)}.jpg` });
        const response = await axios.post("https://photofunia.com/images?server=1", form, {
            headers: {
                ...getCommonHeaders(coki),
                "Referer": "https://photofunia.com" + u.pathname
            }
        });
        const imgkey = response.data.response.key;
        return { key: imgkey, coki, data: response.data };
    } catch (e) {
        return handleError(e);
    }
}

async function photofunImg(url, image) {
    const u = new URL(url);
    if (!/https:\/\/.+\.photofunia.+/g.test(url)) {
        return { status: "gagal", msg: "itu bukan link dari photofunia" };
    }
    const { key, coki } = await getImageKey(url, image);
    try {
        const form2 = new FormData();
        form2.append('current-category', "all_effects");
        form2.append('image', key);
        form2.append("image:crop", "0");
        const response = await axios.post("https://photofunia.com" + u.pathname + "?server=1", form2, {
            headers: {
                ...getCommonHeaders(coki),
                "Referer": "https://photofunia.com" + u.pathname
            }
        });
        const img = /data-share-image="(.+?)"/.exec(response.data)[1];
        return { status: "sukses", url: img };
    } catch (e) {
        return handleError(e);
    }
}

async function photofunImg2(url, image, image2) {
    const u = new URL(url);
    if (!/https:\/\/.+\.photofunia.+/g.test(url)) {
        return { status: "gagal", msg: "itu bukan link dari photofunia" };
    }
    const { key, coki } = await getImageKey(url, image);
    const img2 = await getImageKey(url, image2);
    try {
        const form2 = new FormData();
        form2.append('current-category', "all_effects");
        form2.append('image', key);
        form2.append('image2', img2.key);
        form2.append("image:crop", "0");
        const response = await axios.post("https://photofunia.com" + u.pathname + "?server=1", form2, {
            headers: {
                ...getCommonHeaders(coki),
                "Referer": "https://photofunia.com" + u.pathname
            }
        });
        const img = /data-share-image="(.+?)"/.exec(response.data)[1];
        return { status: "sukses", url: img };
    } catch (e) {
        return handleError(e);
    }
}

async function photofunText(url, text) {
    return new Promise(async (resolve) => {
        const u = new URL(url);
        if (!/https:\/\/.+\.photofunia.+/g.test(url)) {
            return resolve({ msg: "itu bukan link dari photofunia" });
        }
        try {
            const a = await axios.get("https://photofunia.com/cookie-warning?server=1", {
                headers: {
                    "Host": "photofunia.com",
                    "Referer": "https://photofunia.com" + u.pathname
                }
            });
            const coki = a.headers['set-cookie'][0].split(';')[0];
            const form = new FormData();
            form.append('current-category', 'all_effect');
            text.forEach((v, index) => {
            const fieldName = index === 0 ? 'text' : `text${index + 1}`;
            form.append(fieldName, v);
            });
            const response = await axios.post("https://photofunia.com" + u.pathname + "?server=1", form, {
                headers: {
                    ...getCommonHeaders(coki),
                    'referer': 'https://photofunia.com' + u.pathname
                }
            });
            const img = /data-share-image="(.+?)"/.exec(response.data)[1];
            return resolve({ status: "sukses", url: img });
        } catch (e) {
            return resolve(handleError(e));
        }
    });
}

function getCommonHeaders(cookie) {
    return {
        "User-Agent": "Mozilla/5.0 (X11; Linux x86_64; Flow) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/359.0.0.288 Safari/537.36",
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "Host": "photofunia.com",
        "cookie": cookie + "; accept_cookie=true",
        "Accept-Language": "id-ID,id;q=0.9,en-GB;q=0.8,en;q=0.7,en-US;q=0.6"
    };
}

function handleError(e) {
    if (e.response) {
        return { status: "gagal", msg: e.response.statusText };
    } else {
        return { status: "gagal", msg: "error nih" };
    }
}

const __filename = new URL('', import.meta.url).pathname;
const __dirname = new URL('.', import.meta.url).pathname;
const file = fileURLToPath(import.meta.url);
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(chalk.bgGreen(chalk.black("[  UPDATE ]")), chalk.white(`${__filename}`));
    import(`${file}?update=${Date.now()}`);
});

export {
    photofunSearch,
    photofunEffect,
    photofunUse,
    photofunImg,
    photofunImg2,
    photofunText
};