import axios from 'axios';
import cheerio from 'cheerio';

const handler = async (m, {
    conn,
    args
}) => {
    const input = args.join(' ');
    if (!input) {
        return conn.reply(m.chat,
            `❌ Cara Penggunaan:\n` +
            `1. Untuk menampilkan panduan penggunaan dan contoh, ketik: *flammingtext*\n` +
            `2. Untuk menampilkan daftar urutan halaman dan contoh, ketik: *flammingtext [query]*\n` +
            `3. Untuk menampilkan daftar indeks dan contoh, ketik: *flammingtext [query|page]*\n` +
            `4. Untuk menampilkan hasil terpilih, ketik: *flammingtext [query|page|index]*`, m);

    }

    const [query, pageStr, idxStr] = input.split('|');

    const page = parseInt(pageStr);
    const idx = parseInt(idxStr);

    if (isNaN(page)) {
        return conn.reply(m.chat,
            '❌ Nomor halaman tidak valid. Silakan masukkan nomor halaman antara 1 dan 67.', m);

    }

    const searchResults = await getLogosByPage(query, page);

    if (isNaN(idx)) {
        const sortedTitles = searchResults.map((logo, index) => `*${index + 1}.* ${logo.title}`);
        return conn.reply(m.chat,
            `❌ Mohon berikan indeks. Contoh: *flammingtext ${query}|${page}|1*.\n\nHasil Pencarian:\n` + sortedTitles.join('\n'), m);

    }

    if (page < 1 || page > 67 || idx <= 0 || idx > searchResults.length) {
        return conn.reply(m.chat,
            '❌ Nomor halaman atau indeks tidak valid. Silakan periksa nomor halaman dan indeks yang dimasukkan.', m);

    }

    const selectedLogo = searchResults.find(logo => logo.page === page && logo.index === idx);

    if (!selectedLogo) {
        return conn.reply(m.chat,
            '❌ Hasil tidak ditemukan. Pastikan nomor halaman dan indeks yang dimasukkan benar.', m);

    }

    if (selectedLogo) {
        await conn.reply(m.chat,
            `${wait}\n${selectedLogo.title}`, m);
        const caption = `*Judul:* ${selectedLogo.title}\n*Link:* ${selectedLogo.link}`;
        const tag = `@${m.sender.split('@')[0]}`;

        try {
            await conn.sendMessage(m.chat, {
                image: await fetchArrayBufferToBuffer(selectedLogo.linkImage),
                caption: `${caption}\nPermintaan oleh: ${tag}`,
                mentions: [m.sender]
            }, {
                quoted: m,
                ephemeralExpiration: ephemeral
            });
        } catch (error) {
            return conn.reply(m.chat, '❌ Terjadi Kesalahan: ' + error.message, m);

        }
    }
};

handler.help = ['flammingtext [query|page|index]'];
handler.tags = ['pembuat'];
handler.command = /^(flammingtext)$/i;
export default handler;

async function getLogosByPage(query, page) {
    try {
        if (page < 1 || page > 67) {
            throw new Error('Nomor halaman tidak valid. Silakan masukkan nomor halaman antara 1 dan 67.');
        }

        const baseUrl = page === 1 ?
            `https://api.flamingtext.com/All-Logos/?text=${query}` :
            `https://api.flamingtext.com/All-Logos/page${page}?text=${query}`;

        const {
            data
        } = await axios.get(baseUrl);
        const $ = cheerio.load(data);

        return $('.ft-logo').map((index, element) => {
            const anchor = $(element).find('a');
            const img = $(element).find('img');
            const link = 'https://api.flamingtext.com' + anchor.attr('href');
            const linkImage = 'https://api.flamingtext.com' + img.attr('logo-src');
            const textParam = new URLSearchParams(linkImage.split('?')[1]).get('script');
            const title = textParam ? textParam.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : '';

            return {
                title,
                link,
                linkImage,
                page,
                index: index + 1
            };
        }).get();
    } catch (error) {
        console.error('Terjadi kesalahan:', error.message);
        return [];
    }
};

async function fetchArrayBufferToBuffer(url) {
    try {
        const response = await axios.get(url, {
            responseType: 'arraybuffer'
        });

        const arrayBuffer = response.data;
        const buffer = Buffer.from(arrayBuffer);

        return buffer;
    } catch (error) {
        console.error(error.message);
    }
}