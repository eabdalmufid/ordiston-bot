import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

let handler = async (m, {
    command,
    usedPrefix,
    conn,
    args
}) => {

let text
    if (args.length >= 1) {
        text = args.slice(0).join(" ")
    } else if (m.quoted && m.quoted.text) {
        text = m.quoted.text
    } else throw "Input Teks"
            await m.reply(wait)
            if (command == "digicollget") {
            let outs = await getData(text)
            let output = Object.entries(outs).map(([key, value]) => `  ○ *${key.toUpperCase()}:* ${value}`).join('\n');
        await m.reply(output);
            } else {
            let outs = await searchData(text)
                const teks = outs.map((v, index) => {
                    return `*[ ${index + 1} ]*
*title:* ${v.title}
*shelfmark:* ${v.shelfmark}
*published:* ${v.published}
*href:* ${v.href}
*thumbnailUrl:* ${v.thumbnailUrl}
   `.trim()
                }).filter(v => v).join("\n\n________________________\n\n")
                
                await conn.sendFile(m.chat, outs[0].thumbnailUrl, "", teks, m)
                }
}
handler.help = ["digicoll query"]
handler.tags = ["internet"]
handler.command = /^(digicoll|digicollget)$/i
export default handler

  async function searchData(query) {
  const url = 'https://digitalcollections.universiteitleiden.nl';

  try {
    const response = await fetch(`${url}/search/${query}?type=edismax`);
    const html = await response.text();

    const $ = cheerio.load(html);
    const results = [];

    $('tr.islandora-solr-search-result').each((index, element) => {
      const $element = $(element);

      const thumbnailUrl = $element.find('img').attr('data-src');
      const title = $element.find('dd.solr-value a').text().trim();
      const href = `${url}${$element.find('dd.solr-value a').attr('href')}`;
      const shelfmark = $element.find('dd.mods-relateditem-otherformat-identifier-ms').text().trim();
      const published = $element.find('dd.mods-relateditem-otherformat-origininfo-publisher-ms').text().trim();

      const item = {
        thumbnailUrl,
        title,
        href,
        shelfmark,
        published
      };

      results.push(item);
    });

    return results;
  } catch (error) {
    console.error('Error:', error);
  }
}

async function getData(query) {
const url = 'https://digitalcollections.universiteitleiden.nl';
  try {
    const response = await fetch(query);
    const data = await response.text();
    const $ = cheerio.load(data);

    const downloadElement = $('.dc-sidebox-right .item-list ul.dc-detail-tools li');
    const downloadLinks = downloadElement.map((index, element) => {
      const linkElement = $(element).find('a');
      const linkText = linkElement.attr('href');
      const linkTitle = linkElement.attr('title');
      return {
        title: linkTitle,
        link: linkText
      };
    }).get();

    const persistentUrl = $('.dc-metadata .mods_identifier_hdl_ms a').attr('href');

    const title = $('.dc-metadata .mods_titleInfo_title_custom_ms td').text().trim();
    const persistentUrlMetadata = $('.islandora-metadata .mods_identifier_hdl_ms p a').attr('href');
    const extent = $('.islandora-metadata .mods_physicalDescription_extent_ms td').text().trim();
    const subtitle = $('.islandora-metadata .mods_titleInfo_subTitle_ms td').text().trim();
    const creator = $('.islandora-metadata .mods_name_namePart_custom_ms td').text().trim();
    const shelfmark = $('.islandora-metadata .mods_relatedItem_otherFormat_identifier_ms td').text().trim();
    const geographicSubject = $('.islandora-metadata .mods_subject_geographic_ms td').text().trim();
    const note = $('.islandora-metadata .mods_note_ms td').text().trim();
    const language = $('.islandora-metadata .mods_language_languageTerm_text_authority_iso639-2b_ms td').text().trim();
    const country = $('.islandora-metadata .mods_originInfo_place_placeTerm_text_authority_marccountry_ms td').text().trim();
    const published = $('.islandora-metadata .mods_relatedItem_otherFormat_originInfo_publisher_ms td').text().trim();
    const digitalPublished = $('.islandora-metadata .mods_originInfo_publisher_ms td').text().trim();

    const result = {
      downloadLinks: url + downloadLinks[0].link,
      persistentUrl,
        title,
        persistentUrl: persistentUrlMetadata,
        extent,
        subtitle,
        creator,
        shelfmark,
        geographicSubject,
        note,
        language,
        country,
        published,
        digitalPublished
    };

    return result;
  } catch (error) {
    console.error('Error:', error);
  }
}