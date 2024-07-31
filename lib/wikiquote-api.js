import fetch from 'node-fetch';
import cheerio from 'cheerio';

const WikiquoteApi = (() => {
  const wqa = {};

  const API_URL = "https://id.wikiquote.org/w/api.php";

  const makeRequest = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  };

  wqa.queryTitles = async (titles) => {
    try {
      const data = await makeRequest(`${API_URL}?format=json&action=query&titles=${titles}&redirects=''`);
      const pages = data.query.pages;
      let pageId = -1;
      for (const p in pages) {
        const page = pages[p];
        if (!("missing" in page)) {
          pageId = page.pageid;
          break;
        }
      }
      if (pageId > 0) {
        return pageId;
      } else {
        throw new Error(`No results for: ${titles}`);
      }
    } catch (error) {
      throw error;
    }
  };

  wqa.getSectionsForPage = async (pageId) => {
    try {
      const data = await makeRequest(`${API_URL}?format=json&action=parse&prop=sections&pageid=${pageId}`);
      const sections = data.parse.sections;
      const sectionArray = sections
        .filter(s => s.number.split('.')[0] === "1")
        .map(s => s.index);
      if (sectionArray.length === 0) {
        sectionArray.push("1");
      }
      return { titles: data.parse.title, sections: sectionArray };
    } catch (error) {
      throw error;
    }
  };

  wqa.getQuotesForSection = async (pageId, sectionIndex) => {
    try {
      const data = await makeRequest(`${API_URL}?format=json&action=parse&noimages=''&pageid=${pageId}&section=${sectionIndex}`);
      const quotes = data.parse.text["*"];
      const $ = cheerio.load(quotes);
      const quoteArray = [];
      $('li:not(li li)').each(function () {
        $(this).find('sup').remove();
        $(this).find('a').each(function () {
          $(this).attr('href', 'http://it.wikipedia.org' + $(this).attr('href'));
        });
        quoteArray.push($(this).html());
      });
      return { titles: data.parse.title, quotes: quoteArray };
    } catch (error) {
      throw error;
    }
  };
  
  wqa.openSearch = async (titles) => {
    try {
      const response = await fetch(`${API_URL}?format=json&action=opensearch&namespace=0&suggest=&search=${titles}`);
      const data = await response.json();
      return data[1];
    } catch (error) {
      throw error;
    }
  };

  wqa.getRandomQuote = async (titles) => {
    try {
      const errorFunction = (msg) => { throw new Error(msg); };

      const chooseQuote = (quotes) => {
        const randomNum = Math.floor(Math.random() * quotes.quotes.length);
        return { titles: quotes.titles, quote: quotes.quotes[randomNum] };
      };

      const getQuotes = async (pageId, sections) => {
        const randomNum = Math.floor(Math.random() * sections.sections.length);
        return await wqa.getQuotesForSection(pageId, sections.sections[randomNum]);
      };

      const getSections = async (pageId) => {
        const sections = await wqa.getSectionsForPage(pageId);
        return await getQuotes(pageId, sections);
      };

      const pageId = await wqa.queryTitles(titles);
      return await getSections(pageId);
    } catch (error) {
      throw error;
    }
  };

  wqa.capitalizeString = (input) => {
    const inputArray = input.split(' ');
    const output = inputArray.map(s => s.charAt(0).toUpperCase() + s.slice(1));
    return output.join(' ');
  };

  return wqa;
})();

export default WikiquoteApi;