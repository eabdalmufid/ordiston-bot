import WikiquoteApi from '../lib/wikiquote-api.js';

async function displaySearchList(query) {
  try {
    return await WikiquoteApi.openSearch(query);
  } catch (error) {
    console.error('Error fetching search results:', error.message);
    return [];
  }
}

async function displayQuotes(pageId, sectionIndexes) {
  try {
    const sections = await WikiquoteApi.getSectionsForPage(pageId);
    return await WikiquoteApi.getQuotesForSection(pageId, sectionIndexes);
  } catch (error) {
    console.error('Error fetching quotes:', error.message);
    return null;
  }
}

let handler = async (m, { text }) => {
  let [query, number] = text.split("|");
  const searchResults = await displaySearchList(query);

  if (number === undefined) {
    if (searchResults.length === 0) {
      return m.reply(`Tidak ditemukan hasil pencarian untuk "${query}".`);
    } else {
      return m.reply(`Hasil pencarian:\n${searchResults.join('\n')}`);
    }
  }

  const pageId = await WikiquoteApi.queryTitles(searchResults[0]);
  const sections = await WikiquoteApi.getSectionsForPage(pageId);

  const validNumber = parseInt(number);
  if (isNaN(validNumber) || validNumber <= 0 || validNumber > sections.sections.length) {
    const availableNumbers = Array.from({ length: sections.sections.length }, (_, i) => i + 1);
    return m.reply(`Nomor tidak valid untuk "${searchResults[0]}". Pilihan nomor yang tersedia: ${availableNumbers.join(', ')}.`);
  }

  const quotes = await displayQuotes(pageId, [sections.sections[validNumber - 1]]);
  if (!quotes) {
    return m.reply(`Gagal mengambil kutipan untuk "${searchResults[0]}".`);
  }

  const formattedQuotes = quotes.quotes.map(quote => quote.replace(/<\/?[^>]+(>|$)/g, ""));
  const formattedQuoteText = formattedQuotes.join('\n\n');
  m.reply(`Kutipan dari "${quotes.titles}":\n\n${formattedQuoteText}`);
};

handler.help = ["wikiquote"];
handler.tags = ["internet"];
handler.command = /^(wikiquote)$/i;
export default handler;