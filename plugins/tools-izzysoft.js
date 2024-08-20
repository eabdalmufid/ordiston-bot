import cheerio from 'cheerio';
import axios from 'axios';

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {
  try {
    const query = text.split(' ');

    if (query.length === 0) {
      const usageMessage = "Cara Penggunaan:\n" + repoList.map((repo, index) => `${index + 1}. ${repo}`).join('\n');
      await m.reply(usageMessage);
      return;
    }

    if (query.length >= 1) {
      const indexRepo = parseInt(query[0]);

      if (isNaN(indexRepo) || indexRepo < 1 || indexRepo > repoList.length) {
        const errorMessage = `Input kurang tepat. Gunakan 'izzysoft <arg1> <arg2> <arg3>' dimana:\n`
        const repoListMessage = "List Repo (gunakan angka untuk memilih):\n" + repoList.map((repo, index) => `${index + 1}. ${repo}`).join('\n');
        await m.reply(errorMessage + repoListMessage);
        return;
      }

      const repo = repoList[indexRepo - 1];

      if (query.length === 1) {
        const pageMessage = "Masukkan nomor halaman.";
        await m.reply(pageMessage);
        return;
      }

      const page = parseInt(query[1]);

      if (isNaN(page) || page <= 0) {
        const errorMessage = "Nomor halaman tidak valid. Gunakan angka positif untuk halaman.";
        await m.reply(errorMessage);
        return;
      }

      const apkList = await getApk(repo, page);

      if (query.length === 2) {
        if (apkList.length === 0) {
          const noApkMessage = "Tidak ada APK yang ditemukan.";
          await m.reply(noApkMessage);
          return;
        }

        const listMessage = "List APK:\n" + apkList.map((apk, index) => `${index + 1}. ${apk.title}`).join('\n');
        await m.reply(listMessage);
        return;
      }

      const indexGetApk = parseInt(query[2]);

      if (isNaN(indexGetApk) || indexGetApk < 1 || indexGetApk > apkList.length) {
        const errorMessage = `Index APK tidak valid. Gunakan angka dari 1 hingga ${apkList.length} untuk memilih APK dari list.`;
        await m.reply(errorMessage);
        return;
      }

      const selectedApk = apkList[indexGetApk - 1];

      await m.reply(`*Title:* ${selectedApk.title}\n*Version:* ${selectedApk.version}\n*Date:* ${selectedApk.date}\n*License:* ${selectedApk.license}\n*Info:* ${selectedApk.info}\n*Download Links:* ${selectedApk.downloadLinks[0]}`);
    }
  } catch (error) {
    console.error(error);
    await m.reply("Terjadi kesalahan dalam menjalankan perintah. Silakan coba lagi nanti.");
  }
}

handler.help = ["izzysoft"]
handler.tags = ["tools"]
handler.command = /^(izzysoft)$/i
export default handler

const repoList = [
  "archive",
  "guardian",
  "iod",
  "kali",
  "main",
  "metatrans",
  "mobilsicher",
  "nit",
  "wind"
];

async function getApk(repo, page) {
  try {
    const url = `https://apt.izzysoft.de/fdroid/index.php/list/page/${page}?limit=10;repo=${repo}`;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    return $('.approw').map((index, element) => {
      const title = $(element).find('.boldname').text().trim();
      const [version, date] = $(element).find('.minor-details').eq(0).text().trim().split(' / ');
      const license = $(element).find('.minor-details').eq(1).text().trim();
      const info = $(element).find('.appdetailcell').eq(3).text().trim();
      const downloadLinks = $(element).find('.paddedlink[href^="https://"]').map((index, linkElement) => $(linkElement).attr('href')).get();

      return {
        title,
        version,
        date,
        license,
        info,
        downloadLinks,
      };
    }).get();
  } catch (error) {
    console.error(error);
    return [];
  }
}