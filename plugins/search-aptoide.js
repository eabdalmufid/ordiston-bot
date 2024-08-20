import axios from "axios";
import { search } from "aptoide-scraper";
import { sizeFormatter } from "human-readable";

const format = sizeFormatter({
  std: "JEDEC",
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`,
});

const handler = async (m, { conn, text }) => {
  if (!text) throw "Tolong berikan kata kunci pencarian";
  try {
    await m.reply("Sedang mencari, mohon tunggu...");
    const aptoideResult = await axios.get(
      "http://ws75.aptoide.com/api/7/apps/search?query=" + encodeURIComponent(text) + "&trusted=true"
    );

    if (aptoideResult.data.datalist.total == 0) throw `Pencarian "${text}" tidak ditemukan :/`;
    
    const dataList = aptoideResult.data.datalist.list;
    const resultList = dataList.map((item, index) => `📱 *Aptoide Search* 🔍
*Nama Aplikasi:* ${item.package}
*Versi:* ${item.file.vername}
*Ukuran:* ${format(item.file.filesize)}
*Link Unduh:* ${item.file.path}
*Jumlah Unduhan:* ${item.stats.downloads}
`).join("\n");
    
    await m.reply(resultList);
  } catch (error) {
    try {
      await m.reply("Sedang mencari, mohon tunggu...");
      const searchData = await search(text);
      const searchList = searchData.map((item, index) => `📱 *Aptoide Search* 🔍
*Nama Aplikasi:* ${item.name}
*ID:* ${item.id}
`).join("\n");
      
      await m.reply(searchList);
    } catch (err) {
      await m.reply("Maaf, terjadi kesalahan dalam mencari.");
    }
  }
};

handler.help = ["aptoide"];
handler.tags = ["tools"];
handler.command = /^aptoide(search)?$/i;

export default handler;