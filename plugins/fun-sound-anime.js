import cheerio from 'cheerio';
import fetch from 'node-fetch';

const handler = async (m, { conn, usedPrefix, text, command }) => {
  const args = text.trim().split(/\s+/);

  if (!args[0]) {
    const voices = await voiceV1();
    const message = voices.length === 0 ? '❓ Daftar suara kosong.' : `🔊 *Daftar Suara:*\n${voices.map((voice, index) => `*${index + 1}.* ${voice.name}`).join('\n')}`;
    return await m.reply(message);
  }

  const linkIndex = parseInt(args[0], 10) - 1;
  if (args.length === 1 && /^\d+$/.test(args[0])) {
    const voices = await voiceV1();
    if (linkIndex >= 0 && linkIndex < voices.length) {
      const listVoices = await ListVoice(voices[linkIndex].link);
      const message = listVoices.length === 0 ? '❓ Daftar suara kosong.' : `🔊 *Daftar Suara dari Link ${linkIndex + 1}:*\n${listVoices.map((voice, index) => `*${index + 1}.* ${voice.name}`).join('\n')}`;
      return await m.reply(message);
    } else {
      return await m.reply('❌ Indeks link tidak valid. Harap pilih indeks link yang valid.\nContoh penggunaan: *voice 1*');
    }
  }

  if (args.length === 2 && /^\d+$/.test(args[0]) && /^\d+$/.test(args[1])) {
    const voiceIndex = parseInt(args[1], 10) - 1;
    const voices = await voiceV1();
    if (linkIndex >= 0 && linkIndex < voices.length) {
      const listVoices = await ListVoice(voices[linkIndex].link);
      if (voiceIndex >= 0 && voiceIndex < listVoices.length) {
        return await conn.sendFile(m.chat, listVoices[voiceIndex].link, '', m, null, adReply);
      } else {
        return await m.reply('❌ Indeks suara tidak valid. Harap pilih indeks suara yang valid.\nContoh penggunaan: *voice 1 1*');
      }
    } else {
      return await m.reply('❌ Indeks link tidak valid. Harap pilih indeks link yang valid.\nContoh penggunaan: *voice 1 1*');
    }
  }

  if (args.length === 1 && args[0].toLowerCase() === 'v2') {
    const voices = await voiceV2();
    const message = voices.length === 0 ? '❓ Daftar suara kosong.' : `🔊 *Daftar Suara dari voiceV2():*\n${voices.map((voice, index) => `*${index + 1}.* ${voice.text}`).join('\n')}`;
    return await m.reply(message);
  }

  if (args.length === 2 && args[0].toLowerCase() === 'v2' && /^\d+$/.test(args[1])) {
    const voiceIndex = parseInt(args[1], 10) - 1;
    const voices = await voiceV2();
    if (voiceIndex >= 0 && voiceIndex < voices.length) {
      return await conn.sendFile(m.chat, voices[voiceIndex].link, '', m, null, adReply);
    } else {
      return await m.reply('❌ Indeks suara tidak valid. Harap pilih indeks suara yang valid.\nContoh penggunaan: *voice v2 1*');
    }
  }

  // Voice v3 numbers
  if (args[0].toLowerCase() === 'v3' && args[1]) {
    const voiceV3Sounds = {
      'ara': 'https://andgyk.is-a.dev/anime-soundboard/audio/ara-ara.mp3',
      'ganbare': 'https://andgyk.is-a.dev/anime-soundboard/audio/ganbare-ganbare-senpai.mp3',
      'konichiwa': 'https://andgyk.is-a.dev/anime-soundboard/audio/hashira-konichiwa.mp3',
      'nani': 'https://andgyk.is-a.dev/anime-soundboard/audio/nani.mp3',
      'rikka': 'https://andgyk.is-a.dev/anime-soundboard/audio/rikka-ow.mp3',
      'ultra': 'https://andgyk.is-a.dev/anime-soundboard/audio/ultra-instinct.mp3',
      'ahh': 'https://andgyk.is-a.dev/anime-soundboard/audio/yemete-kudasai-ah.mp3',
      'yemete': 'https://andgyk.is-a.dev/anime-soundboard/audio/yemete-kudasai.mp3',
      'yuno': 'https://andgyk.is-a.dev/anime-soundboard/audio/yuno-yukki.mp3',
    };

    const soundLink = voiceV3Sounds[args[1].toLowerCase()];
    if (soundLink) {
      return await conn.sendFile(m.chat, soundLink, args[1] + '.mp3', '', fakes, null, adReply);
    } else {
      return await m.reply('❌ Suara v3 tidak valid. Harap pilih suara yang valid.\nContoh penggunaan: *voice v3 ara*');
    }
  }

  return await m.reply('❌ Perintah tidak valid. Harap gunakan format yang benar.\nContoh penggunaan: *voice v1*, *voice 1*, *voice 1 1*, *voice v2*, *voice v2 1*, *voice v3 ara*');
};

handler.help = ['voice'];
handler.command = ['voice'];
handler.tags = ['music'];
export default handler;

// Remaining functions unchanged

async function voiceV1() {
    try {
        const url = 'https://www.nonstick.com/soundsource/';

        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);

        return $('div.column.two-third.column_column table tbody tr')
            .map((index, element) => ({
                name: $(element).find('td a').text().trim(),
                link: $(element).find('td a').attr('href'),
            }))
            .get()
            .filter(({
                name,
                link
            }) => name !== '' && link !== undefined);
    } catch (error) {
        console.error('Error fetching and parsing data:', error);
        return [];
    }
}

async function voiceV2() {
    try {
        const url = 'https://www.nonstick.com/sound-archive/';

        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);

        return $('div.column.one.column_column')
            .map((index, element) => $(element).parent().find('a').map((i, el) => ({
                link: $(el).attr('href'),
                name: $(element).text().trim(),
                quality: $(el).next('b').text().trim(),
                text: $(el).text().trim(),
            })).get())
            .get()
            .flat();
    } catch (error) {
        console.error('Error fetching and parsing data:', error);
        return [];
    }
}

async function ListVoice(url) {
    try {
        const response = await fetch(url);
        const html = await response.text();
        const $ = cheerio.load(html);

        return $('div.column.one.column_column table tbody tr')
            .map((index, element) => ({
                link: $(element).find('td a').attr('href'),
                name: $(element).find('td a b').text().trim(),
                quality: $(element).find('td b').last().text().trim(),
            }))
            .get()
            .filter(({
                name,
                link,
                quality
            }) => name !== '' && link !== undefined && quality !== '');
    } catch (error) {
        console.error('Error fetching and parsing data:', error);
        return [];
    }
}