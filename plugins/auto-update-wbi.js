import fetch from "node-fetch"
import * as cheerio from 'cheerio';
import got from "got"
import {
    generateWAMessageFromContent
} from "@adiwajshing/baileys"

let handler = async (m, {
    command,
    usedPrefix,
    conn,
    text,
    args
}) => {
    await m.reply(wait)
    try {
        // Example usage
        const url = 'https://wabetainfo.com';
        const result = await WabetaInfo(url);
        let faq = formatQA(result.detail.featureName)
        let reac = formatRE(result.detail.reactions)
        let prev = formatArrayWithNumbers(result.detail.roundedAlertsImage)
        const output = `*${result.articles.title || 'Tidak diketahui'}*

*Update:*\n${result.detail.date || 'Tidak diketahui'}

*Desc:*\n${result.articles.desc || 'Tidak diketahui'}

*Faq:*\n${faq || 'Tidak diketahui'}

*Link:*\n${result.articles.link || 'Tidak diketahui'}

*Content:*\n${result.detail.content || 'Tidak diketahui'}

*Image:*\n${prev || 'Tidak diketahui'}

*Sharing:*\n${result.detail.socialSharing || 'Tidak diketahui'}

*Reactions:*\n${reac || 'Tidak diketahui'}\n`

        let icon = await (await conn.getFile(result.detail.ogImage)).data
        let msg = await generateWAMessageFromContent(m.chat, {
            extendedTextMessage: {
                text: output,
                jpegThumbnail: icon,
                contextInfo: {
                    mentionedJid: [m.sender],
                    externalAdReply: {
                        body: result.detail.author,
                        containsAutoReply: true,
                        mediaType: 1,
                        mediaUrl: result.articles.link,
                        renderLargerThumbnail: true,
                        showAdAttribution: false,
                        sourceId: null,
                        sourceType: null,
                        previewType: null,
                        sourceUrl: result.articles.link,
                        thumbnail: icon,
                        thumbnailUrl: icon,
                        title: result.detail.title
                    }
                }
            }
        }, {
            quoted: m,
            ephemeralExpiration: ephemeral
        })
        await conn.relayMessage(m.chat, msg.message, {})
    } catch (e) {
        await m.reply(eror)
    }
}
handler.help = ["wbi"]
handler.tags = ["info"]
handler.command = /^(wbi)$/i
export default handler

function formatQA(data) {
    return data.map((item, index) => `${index + 1}. ${item.name}\n${item.value}\n\n`).join('');
}

function formatRE(data) {
    return data.map((item, index) => `${item.name}: ${item.value}\n`).join('');
}

function formatArrayWithNumbers(array) {
  return array.map((element, index) => `${index + 1}. ${element}`).join('\n');
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

async function WabetaInfo(url) {
    const {
        body
    } = await got(url);
    const $ = cheerio.load(body);

    const article = $('article').first();
    const classAttr = article.attr('class');
    const categoryMatch = classAttr.match(/category-([^\s]+)/);
    const category = categoryMatch ? categoryMatch[1] : null;

    const link = article.find('h3.entry-title a').attr('href');
    const title = article.find('h3.entry-title a').text();
    const desc = article.find('.entry-content p').first().text().trim();
    const published = article.find('time.entry-date.published').attr('datetime');
    const updated = article.find('time.updated').attr('datetime');
    const content = article.find('.entry-content').html();
    const readMoreLink = article.find('.more-link').attr('href');
    const detail = await getArticleDetail(link);
    const articles = {
        category,
        link,
        title,
        desc,
        published,
        updated,
        content,
        readMoreLink
    };
    return {
        articles: articles,
        detail: detail
    };
}

async function getArticleDetail(url) {
    const {
        body
    } = await got(url);
    const $ = cheerio.load(body);

    const reactionKeys = ['suka', 'love', 'senang', 'kaget', 'sedih', 'bingung'];
    const formattedReactions = reactionKeys.map(key => ({
        name: capitalizeFirstLetter(key),
        value: $(`div.wpra-reaction:nth-child(${reactionKeys.indexOf(key) + 1}) .count-num`).text().trim()
    }));

    const featureName = $('table.styled-table tr:not(:first-child)').map((index, element) => ({
        name: $(element).find('td:nth-child(1)').text(),
        value: $(element).find('td:nth-child(2)').text()
    })).get();

    const ogImageUrl = $('meta[property="og:image"]').attr('content');

    return {
        date: $('time.entry-date.published').text(),
        author: $('a.url.fn.n').text(),
        title: $('h1.entry-title').text(),
        content: $('div.entry-content > p').text(),
        socialSharing: $('a.share-icon > span').map((index, element) => $(element).text()).get(),
        featureName,
        roundedAlertsImage: $('div.image-container.vertical img').map((index, element) => $(element).attr('src')).get(),
        reactions: formattedReactions,
        ogImage: ogImageUrl
    };
}