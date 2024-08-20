import fetch from 'node-fetch';

let handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {
    const input_data = await generateModel();

    let [urutan, tema] = text.split("|")
    if (!tema) return m.reply("Input query!\n*Example:*\n" + usedPrefix + command + " [nomor]|[query]")

    await m.reply(wait)
    try {
        let data = input_data.map((item, index) => ({
            title: item.replace(/[_-]/g, ' ').replace(/\..*/, ''),
            id: item
        }));
        if (!urutan) return m.reply("Input query!\n*Example:*\n" + usedPrefix + command + " [nomor]|[query]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"))
        if (isNaN(urutan)) return m.reply("Input query!\n*Example:*\n" + usedPrefix + command + " [nomor]|[query]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"))
        if (urutan > data.length) return m.reply("Input query!\n*Example:*\n" + usedPrefix + command + " [nomor]|[query]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* ${item.title}`).join("\n"))
        let out = data[urutan - 1].id

        
        const openAIResponse = await generateImage(out, tema);

        if (openAIResponse) {
            const result = openAIResponse;
            const tag = `@${m.sender.split('@')[0]}`;

            await conn.sendMessage(m.chat, {
                image: {
                    url: result.url
                },
                caption: `Nih effect *${out}* nya\nRequest by: ${tag}`,
                mentions: [m.sender]
            }, {
                quoted: m,
                ephemeralExpiration: ephemeral
            });
        } else {
            console.log("Tidak ada respons dari OpenAI atau terjadi kesalahan.");
        }
    } catch (e) {
        await m.reply(eror)
    }
}
handler.help = ["sitius *[nomor]|[query]*"]
handler.tags = ["ai"]
handler.command = /^(sitius)$/i
export default handler

async function generateImage(model, prompt) {
  try {
    const response = await fetch('https://api.sitius.tech/gen/', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt,
        negative: '',
        model
      }),
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Gagal melakukan permintaan ke server');
    }
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    throw error;
  }
}

async function generateModel() {
  try {
    const response = await fetch('https://api.sitius.tech/models/', {
      method: 'GET',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error('Gagal melakukan permintaan ke server');
    }
  } catch (error) {
    console.error('Terjadi kesalahan:', error);
    throw error;
  }
}