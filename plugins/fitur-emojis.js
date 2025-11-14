import fetch from 'node-fetch';
import * as cheerio from 'cheerio';
import { sticker } from '../lib/sticker.js';

async function emojiGraph(url) {
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);

  const emojiData = [];

  $('.emoji__title').each((index, element) => {
    const emojiName = $(element).find('.emoji').text();
    const emojiLink = $(element).siblings('.emoji__copy').find('.emoji').text();
    const emojiDescription = $(element).siblings('p').text();

    const vendorData = [];
    $(element).siblings('.emoji__div__tablet').find('.block__emoji').each((i, vendorElement) => {
      const vendorName = $(vendorElement).find('a').text();
      const vendorLink = $(vendorElement).find('a').attr('href');
      const vendorImage = $(vendorElement).find('img').attr('data-src');
      vendorData.push({ name: vendorName, link: 'https://emojigraph.org' + vendorLink, image: 'https://emojigraph.org' + vendorImage });
    });

    emojiData.push({
      name: emojiName,
      link: emojiLink,
      description: emojiDescription,
      vendors: vendorData
    });
  });

  return emojiData;
}

async function searchEmoji(q) {
  try {
    const response = await fetch('https://emojigraph.org/id/search/?q=' + q + '&searchLang=id');
    const html = await response.text();
    const $ = cheerio.load(html);

    const links = $('#search__first .s__first__ul a').map((index, element) => 'https://emojigraph.org' + $(element).attr('href')).get();

    return links;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function emojiPedia(emoji) {
  const response = await fetch(`https://emojipedia.org/${encodeURI(emoji)}`);
  const html = await response.text();
  const $ = cheerio.load(html);
  return $('section.vendor-list > ul > li').map((_, v) => ({
    vendor: $('h2 a', v).text(),
    url: `https://emojipedia.org/${$('h2 a', v).attr('href').replace(/^\//, '')}`,
    image: $('.vendor-image img', v).attr('src').replace('/120/', '/240/'),
    version: $('.vendor-rollout li', v).map((_, ve) => ({
      name: $('.version-name a', ve).text(),
      url: `https://emojipedia.org/${$('.version-name a', ve).attr('href').replace(/^\//, '')}`,
      image: $('.vendor-image img', ve).attr('data-src').replace('/60/', '/240/'),
    })).get(),
  })).get();
}

let handler = async (m, { args, usedPrefix, command }) => {
  
  if (!args[0]) return m.reply('Silakan masukkan *emoji* atau perintah yang benar.');

  try {
    const url = await searchEmoji(args[0])
const res = await emojiGraph(url[0])
const emojiData = res[0].vendors
    if (!emojiData.length) return m.reply('Emoji tidak ditemukan atau input tidak valid. Silakan coba lagi.');

    if (!args[1]) {
      const vendorsList = emojiData.map((data, index) => `*${index + 1}.* ${data.name}`);
      return m.reply(`Daftar vendor untuk *${args[0]}*:\n\n${vendorsList.join('\n')}\n\nContoh: *${usedPrefix + command}* [emoji] [vendor]`);
    }

    const vendorIndex = parseInt(args[1]) - 1;
    if (isNaN(vendorIndex) || vendorIndex < 0 || vendorIndex >= emojiData.length) return m.reply(`Indeks vendor tidak valid. Harap berikan nomor yang valid dari angka 1 sampai ${emojiData.length}.`);

    const vendorData = emojiData[vendorIndex];
    m.reply(`Informasi emoji untuk *${args[0]}* (${vendorData.name}):\n\nURL: ${vendorData.link}\nGambar: ${vendorData.image}`);
    return m.reply(await sticker(false, vendorData.image, packname, m.name));
  } catch (error) {
    console.error('Error fetching or parsing data:', error);
    return m.reply('Terjadi kesalahan saat mencari data emoji.');
    }
};

handler.help = ['emoji'];
handler.tags = ['sticker'];
handler.command = /^(emo(jis|(ji)?)|se?moji)$/i;
export default handler;