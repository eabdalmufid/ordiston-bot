import cheerio from 'cheerio';
import axios from 'axios';

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {

    const inputArray = [
  "kolom",
  "lainnya/analisis",
  "lainnya/diplomatic-corner",
  "lainnya/editorial",
  "lainnya/infografis",
  "lainnya/investigasi",
  "lainnya/liyan-pojok",
  "lainnya/oase",
  "lainnya/obituary",
  "lainnya/opini",
  "lainnya/religi",
  "lainnya/serba-serbi",
  "lainnya/wawancara",
  "lifestyle",
  "news",
  "tech"
];

    let [query] = text.split(" ")
    const result = inputArray.includes(query)
  ? query
  : inputArray
      .filter(item => item.startsWith('lainnya/') && query === item.split('/').pop())
      .map(item => item)[0] || null;
    if (!result) return m.reply("*Example:*\n.dailynews lifestyle\n\n*Pilih type yg ada*\n" + inputArray.map((v, index) => "  ○ " + v.split('/').pop()).join("\n"))
            await m.reply(wait)
            try {
                let res = await fetchArticleData(result)
                let teks = res.map((item, index) => {
                    return `🔍 *[ RESULT ${index + 1} ]*
  
📚 Title: ${item.title}
🔗 Link: ${item.link}
📅 Date: ${item.date}
💬 Comment Count: ${item.commentCount}
📝 Excerpt: ${item.excerpt}
`;
                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)
            } catch (e) {
                await m.reply(eror)
            }
        
}
handler.help = ["dailynews"]
handler.tags = ["internet"]
handler.command = /^(dailynews)$/i
export default handler

/* New Line */

async function fetchArticleData(query) {
const url = 'https://www.dailynewsindonesia.com/rubrik/' + query;
  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    
    const articles = $('div.jeg_postblock_content').map((index, element) => ({
      title: $(element).find('h3.jeg_post_title a').text(),
      link: $(element).find('h3.jeg_post_title a').attr('href'),
      date: $(element).find('.jeg_meta_date a').text(),
      commentCount: $(element).find('.jeg_meta_comment a').text(),
      excerpt: $(element).find('div.jeg_post_excerpt p').text(),
    })).get();

    return articles.filter(article => Object.values(article).every(value => value));
  } catch (error) {
    throw error;
  }
};