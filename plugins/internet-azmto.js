import cheerio from 'cheerio';
import fetch from 'node-fetch';

let handler = async (m, {
    conn,
    args,
    usedPrefix,
    text,
    command
}) => {

    let lister = [
        "detail",
        "search"

    ]

    let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|")
    if (!lister.includes(feature)) return m.reply("*Example:*\n.azmto search|vpn\n\n*Pilih type yg ada*\n" + lister.map((v, index) => "  ○ " + v).join("\n"))

    if (lister.includes(feature)) {

        if (feature == "search") {
            if (!inputs) return m.reply("Input query link\nExample: .azmto search|vpn")
            await m.reply(wait)
            try {
                let res = await searchAzm(inputs)
                let teks = res.map((item, index) => {
                    return `🔍 *[ RESULT ${index + 1} ]*
🔗 Link: ${item.posterLink}
🖼️ Img: ${item.posterImg}
📺 Title: ${item.posterTitle}
📅 Year: ${item.posterYear}
⏰ Duration: ${item.posterDuration}
`
                }).filter(v => v).join("\n\n________________________\n\n")
                await m.reply(teks)

            } catch (e) {
                await m.reply(eror)
            }
        }

        if (feature == "detail") {
            if (!inputs) return m.reply("Input query link\nExample: .azmto detail|vpn")
            await m.reply(wait)
            try {
                let item = await detailAzm(inputs)
                let serverLinks = item.serverLinks.map((item) => {
                    return `🌐 label: ${item.label}\n🔗 link: ${item.link}`
                }).filter(v => v).join("\n")
                let teks = `🔍 *[ RESULT ]*
🔍 breadcrumbs: ${item.breadcrumbs}
🖼️ posterImg: ${item.posterImg}
📺 title: ${item.title}
⭐ rating: ${item.rating}
📅 year: ${item.year}
⏰ duration: ${item.duration}
🎥 genres: ${item.genres}
📜 overview: ${item.overview}
🔗 serverLinks: ${serverLinks}
`
                await conn.sendFile(m.chat, item.posterImg || logo, "", teks, m)

            } catch (e) {
                await m.reply(eror)
            }
        }

    }
}
handler.help = ["azmto"]
handler.tags = ["internet"]
handler.command = /^(azmto)$/i
export default handler

/* New Line */
async function searchAzm(query) {
    const url = 'https://azm.to/search/' + query; // Ganti dengan URL yang sesuai
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const posters = $('.col-3.col-tb-4.col-p-6.col-md-2.poster-col').map((index, element) => {
        const $element = $(element);
        return {
            posterLink: 'https://azm.to' + $element.find('.poster').attr('href'),
            posterImg: $element.find('.poster__img').attr('data-src'),
            posterTitle: $element.find('.poster__title').text().trim(),
            posterYear: $element.find('.poster__year .badge').text().trim(),
            posterDuration: $element.find('.poster__year .has-icon').text().trim()
        };
    }).get();

    return posters;
}

async function detailAzm(query) {
    const url = query; // Ganti dengan URL yang sesuai
    const response = await fetch(url);
    const html = await response.text();
    const $ = cheerio.load(html);

    const details = {};

    details.breadcrumbs = $('.container.row.details .col-12.breadcrumbs.has-icon a').map((_, el) => $(el).text().trim()).get();
    details.posterImg = $('.container.row.details .col-3.hide-on-tab-port.details__poster img').attr('src');
    details.title = $('.container.row.details .col-6.col-md-7.mb-2.col-tl-9.col-tb-12.details__info .details__heading').text().trim();
    details.rating = $('.container.row.details .col-6.col-md-7.mb-2.col-tl-9.col-tb-12.details__info .details__rating span').text().trim();
    details.year = $('.container.row.details .col-6.col-md-7.mb-2.col-tl-9.col-tb-12.details__info .details__metadata span:first-child').text().trim();
    details.duration = $('.container.row.details .col-6.col-md-7.mb-2.col-tl-9.col-tb-12.details__info .details__metadata span:last-child').text().trim();
    details.genres = $('.container.row.details .col-6.col-md-7.mb-2.col-tl-9.col-tb-12.details__info .details__genre a').map((_, el) => $(el).text().trim()).get();
    details.overview = $('.container.row.details .col-6.col-md-7.mb-2.col-tl-9.col-tb-12.details__info .details__overview').text().trim();
    details.serverLinks = $('.container.row.details .col-12.m-children-bottom-1.flex.flex-between.col-12.mt-1.player__server-wrapper .details__genre a').map((_, el) => ({
        link: $(el).attr('value'),
        label: $(el).find('span').text().trim()
    })).get();

    return details;
}