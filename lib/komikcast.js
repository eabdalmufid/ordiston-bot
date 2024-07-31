import axios from 'axios';
import cheerio from 'cheerio';

export default class KomikCast {
   baseUrl = 'https://komikcast.io';
   header = {
      headers: {
         'Accept': '*/*',
         'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
         'Referer': this.baseUrl,
         'Referrer-Policy': 'strict-origin-when-cross-origin',
         'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0.1; SM-J500G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Mobile Safari/537.36',
      },
   };

   search = async (query) => {
      try {
         const html = await axios.get(`${this.baseUrl}/?s=${query}`, this.header);
         const $ = cheerio.load(html.data);
         const data = [];
         $('.list-update_item').each((i, e) => data.push({
            title: $(e).find('h3').text(),
            type: $(e).find('.type').text(),
            chapter: $(e).find('.chapter').text().trim(),
            score: $(e).find('.numscore').text(),
            url: $(e).find('a').attr('href'),
         }));
         if (data.length < 1) return {
            creator: 'Ordiston',
            status: false,
            msg: 'Content not found!',
         };
         return {
            creator: 'Ordiston',
            status: true,
            data,
         };
      } catch (e) {
         console.error(e);
         return {
            creator: 'Ordiston',
            status: false,
         };
      }
   };

   replacer = (str) => {
      return str
         .replace(new RegExp('total chapter', 'g'), 'chapter');
   };

   fetch = async (url) => {
      try {
         const html = await axios.get(url, this.header);
         const $ = cheerio.load(html.data);
         const span = [];
         const chapters = [];
         const genre = [];
         const sinopsis = [];
         const data = {};
         $('div.komik_info-content-meta').find('span.komik_info-content-info').each((i, e) => span.push($(e).text()));
         span.map((v) => data[this.replacer(v.split(':')[0].toLowerCase().trim())] = this.replacer(v.split(':')[1].trim()));
         $('a.genre-item').each((i, e) => genre.push($(e).text()));
         $('div.summary__content').find('div').each((i, e) => $(e).text() ? sinopsis.push($(e).text()) : '');
         $('li.komik_info-chapters-item').each((i, e) => chapters.push({
            title: $(e).find('a').text().trim(),
            release: $(e).find('.chapter-link-time').text().trim(),
            url: $(e).find('a').attr('href'),
         }));
         return {
            creator: 'Ordiston',
            status: true,
            data: {
               thumbnail: $('div.komik_info-content-thumbnail').find('img').attr('src'),
               title: $('h1.komik_info-content-body-title').text(),
               ...data,
               score: $('.data-rating').text().trim().split` `[1].trim(),
               genre: genre.join(', '),
               updated: $('.komik_info-content-update').find('time[itemprop="dateModified"]').text().trim(),
               sinopsis: sinopsis.join('\n'),
               chapters,
            },
         };
      } catch (e) {
         console.error(e);
         return {
            creator: 'Ordiston',
            status: false,
         };
      }
   };

   render = async (url) => {
      try {
         const html = await axios.get(url, this.header);
         const $ = cheerio.load(html.data);
         const data = [];
         $('div.main-reading-area').find('img').each((i, e) => data.push($(e).attr('src')));
         if (data.length < 1) return {
            creator: 'Ordiston',
            status: false,
            msg: 'Can\'t render content!',
         };
         return {
            creator: 'Ordiston',
            status: true,
            data,
         };
      } catch (e) {
         console.error(e);
         return {
            creator: 'Ordiston',
            status: false,
         };
      }
   };
}