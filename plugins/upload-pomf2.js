import fetch from 'node-fetch';
import {
    FormData,
    Blob
} from 'formdata-node';
import {
    fileTypeFromBuffer
} from 'file-type';

let handler = async (m, {
    args,
    usedPrefix,
    command
}) => {
    try {
        let q = m.quoted ? m.quoted : m;
        let mime = (q.msg || q).mimetype || '';
        if (!mime) throw 'No media found';
        let media = await q.download();
        await m.reply(wait);
        let linkPom = await pomf2(media);
        const response = linkPom;
        if (response.success) {
            const fileSize = formatBytes(response.files[0].size);
            const pesan = `*Pesan Anda berhasil terkirim! 🚀*\n\n*File Detail:*\n*URL:* ${response.files[0].url}\n*Ukuran:* ${fileSize}`;
            await m.reply(pesan);
        } else {
            await m.reply('Pesan Anda gagal terkirim. 🙁');
        }
    } catch (error) {
        console.error(error);
        await m.reply('Terjadi kesalahan dalam pemrosesan permintaan Anda. 🙁');
    }
};

handler.help = ["pomf2"];
handler.tags = ["tools"];
handler.command = /^(pomf2)$/i;
export default handler;

const pomf2 = async buffer => {
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
        let res = await fetch('https://pomf2.lain.la/upload.php', { // 1 Day Expiry Date
            method: 'POST',
            body: form
        });
        let json = await res.json();
        if (!json.success) throw json;
        return json;
    } catch (error) {
        console.error(error);
        throw error; // Rethrow the error to the calling function
    }
};

function formatBytes(bytes) {
    if (bytes === 0) {
        return '0 B';
    }
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / 1024 ** i).toFixed(2)} ${sizes[i]}`;
}