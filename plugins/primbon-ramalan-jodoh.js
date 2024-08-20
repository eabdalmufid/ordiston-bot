const { Primbon } = await(await import('../lib/scraped-primbon.js'))
const primbon = new Primbon()
let handler = async (m, {
    conn,
    args,
    usedPrefix,
    command
}) => {
let text
if (args.length >= 1) {
  text = args.slice(0).join(" ")
} else if (m.quoted && m.quoted.text) {
  text = m.quoted.text
} else return m.reply("Masukkan pesan!")
await m.reply(wait)
try {
  const inputText = text.split("|");

  if (inputText.length === 8 && inputText.every(input => input.trim() !== '')) {
    const jodoh = await primbon.ramalan_jodoh(
      inputText[0], inputText[1], inputText[2], inputText[3],
      inputText[4], inputText[5], inputText[6], inputText[7]
    );

    const caption = `
=== Ramalan Jodoh ===
Nama Anda: ${jodoh.message.nama_anda.nama}
Tanggal Lahir Anda: ${jodoh.message.nama_anda.tgl_lahir}
Nama Pasangan: ${jodoh.message.nama_pasangan.nama}
Tanggal Lahir Pasangan: ${jodoh.message.nama_pasangan.tgl_lahir}
Hasil Ramalan: ${jodoh.message.result}
Catatan: ${jodoh.message.catatan}
`;

    await m.reply(caption);
  } else {
    console.error("Mohon pastikan semua input teks diisi. Total 8 input diperlukan.");
    await m.reply("Mohon pastikan semua input teks diisi. Total 8 input diperlukan.");
  }
} catch (error) {
  console.error("Error occurred during conversion:", error);
  await m.reply("Terjadi kesalahan!");
}

}
handler.help = ["ramaljodoh"]
handler.tags = ["primbon"]
handler.command = /^ramal(an)?jodoh$/i
export default handler