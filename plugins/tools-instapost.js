import axios from 'axios';

let handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {
    
    let [urutan, tema] = text.split("|")
    if (!tema) return m.reply("Input query!\n*Example:*\n.instapost [nomor]|[query]")
    
    await m.reply(wait)
    try {
    const input_data = await getPostByUsername(tema);

        let data = input_data
        if (!urutan) return m.reply("Input query!\n*Example:*\n.instapost [nomor]|[query]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* https://www.instagram.com/p/${item.shortcode}`).join("\n"))
        if (isNaN(urutan)) return m.reply("Input query!\n*Example:*\n.instapost [nomor]|[query]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* https://www.instagram.com/p/${item.shortcode}`).join("\n"))
        if (urutan > data.length) return m.reply("Input query!\n*Example:*\n.instapost [nomor]|[query]\n\n*Pilih angka yg ada*\n" + data.map((item, index) => `*${index + 1}.* https://www.instagram.com/p/${item.shortcode}`).join("\n"))
        let outpic = data[urutan - 1].picture
        let outcap = data[urutan - 1].description
        let outcode = data[urutan - 1].shortcode

        if (input_data) {
            
            await conn.sendFile(m.chat, outpic, '', "\n*Desc:*\n" + outcap + "\n*Link:*\nhttps://www.instagram.com/p/" + outcode, m);
        } else {
            console.log("Tidak ada respons dari OpenAI atau terjadi kesalahan.");
        }
    } catch (e) {
        await m.reply(eror)
    }
}
handler.help = ["instapost *[nomor]|[query]*"]
handler.tags = ["tools"]
handler.command = /^(instapost)$/i
export default handler

function cleanupDesc(string) {
  return string.split('#')[0].trim('\n');
};

const axiosInstance = axios.create({
  baseURL: 'https://i.instagram.com',
  headers: {
    'x-ig-app-id': '936619743392459',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36',
    'Accept-Language': 'en-US,en;q=0.9,ru;q=0.8',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept': '*/*',
  },
});

async function scrapeUser(username) {
  try {
    const response = await axiosInstance.get(`/api/v1/users/web_profile_info/?username=${username}`);
    return response.data.data.user;
  } catch (error) {
    throw error;
  }
}

async function getPostByUsername(username) {
  try {
    const result = await scrapeUser(username);
    const rawPosts = result.edge_owner_to_timeline_media.edges;
    const posts = rawPosts.map(function ({ node: r }) {
      const d = r.edge_media_to_caption.edges;
      const hasNoDesc = d.length === 0;

      return {
        shortcode: r.shortcode,
        description: hasNoDesc ? '' : cleanupDesc(d[0].node.text),
        timestamp: r.taken_at_timestamp,
        dimensions: {
          height: r.dimensions.height,
          width: r.dimensions.width,
        },
        picture: r.display_url,
        owner: r.owner.id,
        isVideo: r.is_video,
        isSidecar: r['__typename'] === 'GraphSidecar',
      };
    });

    return posts;
  } catch (error) {
    throw error;
  }
}