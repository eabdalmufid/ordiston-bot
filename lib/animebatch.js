import axios from 'axios';
import * as cheerio from 'cheerio';

class AnimeBatch {
  baseUrl = 'https://www.animebatch.id';
  header = {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Linux; Android 6.0.1; SM-J500G) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Mobile Safari/537.36',
    },
  };

  async search(q) {
    try {
      const html = await axios.get(`${this.baseUrl}/?s=${q}`, this.header);
      const $ = cheerio.load(html.data);
      const data = $('div.animepost').map((i, e) => ({
        title: $(e).find('div.title').text().trim(),
        score: $(e).find('div.score').text().trim(),
        type: $(e).find('div.type').text().trim() || '–',
        url: $(e).find('a').attr('href'),
      })).get();
      
      if (data.length === 0) {
        return {
          creator: 'Ordiston',
          status: false,
        };
      }

      return {
        creator: 'Ordiston',
        status: true,
        data,
      };
    } catch (e) {
      return {
        creator: 'Ordiston',
        status: false,
        msg: e.message,
      };
    }
  }

  async detail(url) {
    try {
      const html = await axios.get(url, this.header);
      const $ = cheerio.load(html.data);
      const genre = $($('div.spe').find('span')[9])
        .find('a')
        .map((i, e) => $(e).text().trim())
        .get();

      const h1 = $('div.download-content').find('h1').map((i, e) => $(e).text()).get();
      const h4 = $('div.download-content').find('h4').map((i, e) => $(e).text()).get();

      const link = $('div.download-content ul').map((i, e) => {
        const url = $(e).find('li a').map((b, c) => ({
          server: $(c).text().trim(),
          url: $(c).attr('href'),
        })).get();

        return {
          index: i,
          quality: $(e).text().split(' ')[0].trim(),
          url,
        };
      }).get();

      const epsTitle = h1.concat(h4).filter(v => v !== 'Episode' && v !== 'MP4');

      const episode = episode.map((e, i) => ({
        episode: epsTitle[i],
        link: link.filter(v => v.index === i).filter(v => v.url.length !== 0),
      }));

      if (episode.length === 0) {
        $('div.dlx')
          .find('h4')
          .each((i, e) => h4.push($(e).text()));
        
        $('div.dlx')
          .find('ul')
          .each((i, e) => {
            const url = $(e)
              .find('li a')
              .map((b, c) => ({
                server: $(c).text().trim(),
                url: $(c).attr('href'),
              })).get();
            
            link.push({
              index: i,
              quality: $(e).text().split(' ')[0].trim(),
              url,
            });
          });

        const epsTitle = h4;

        episode.push({
          episode: epsTitle[i],
          link: link.filter(v => v.index === i).filter(v => v.url.length !== 0),
        });
      }

      return {
        creator: 'Ordiston',
        status: true,
        data: {
          thumbnail: $('img.attachment-post-thumbnail').attr('src'),
          title: $('h1.entry-title').text().trim(),
          status: $($('div.spe').find('span')[3]).text().replace('Status Anime', '').trim(),
          type: $($('div.spe').find('span')[2]).text().replace('Tipe Anime', '').trim(),
          release: $($('div.spe').find('span')[6]).text().replace('Tanggal Rilis', '').trim(),
          studio: $($('div.spe').find('span')[7]).text().replace('Studio', '').trim(),
          duration: $($('div.spe').find('span')[8]).text().replace('Durasi per Episode', '').trim(),
          genre: genre.join(', ').trim(),
          score: $($('div.spe').find('span')[10]).text().replace('Skor', '').trim(),
          views: $($('div.spe').find('span')[11]).text().replace(new RegExp('Dilihat', 'g'), '').trim(),
          description: $('div.downman').text().trim(),
          episode,
        },
      };
    } catch (e) {
      return {
        creator: 'Ordiston',
        status: false,
        msg: e.message,
      };
    }
  }
}

export default AnimeBatch;