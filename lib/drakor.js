import axios from 'axios';
import cheerio from 'cheerio';

class Drakor {
  async search(query) {
    try {
      const html = await axios.get(
        `https://173.212.240.190/?s=${query.replace(/\s/g, '+')}&post_type=post`
      );
      const $ = cheerio.load(html.data);
      const data = [];
      $('div#post').each((i, e) => {
        const addr = $(e).text().split('Eps')[0].split(' ');
        data.push({
          title: $(e).find('h2').text().trim(),
          episode: addr[addr.length - 1].trim(),
          release: addr[addr.length - 3].trim(),
          genre: $(e).find('div.genrenya').text().trim().split(' '),
          url: $(e).find('a').attr('href'),
        });
      });
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
      console.log(e);
      return {
        creator: 'Ordiston',
        status: false,
      };
    }
  }

  async detail(url) {
    try {
      const html = await axios.get(url);
      const $ = cheerio.load(html.data);
      const P = $($('div.detail > p')[0]).text().split('/');
      const cast = [];
      $('p.text-xs')
        .find('a')
        .each((i, e) => cast.push($(e).text().trim()));
      const episode = [];
      $('table.mdl-data-table')
        .find('tr')
        .each((i, e) => {
          const urls = [];
          $($(e).find('td')[1])
            .find('a')
            .each((i, e) =>
              urls.push({
                provider: $(e).text().trim(),
                url: $(e).attr('href'),
              })
            );
          episode.push({
            episode: $($(e).find('td')[0]).text(),
            urls,
          });
        });
      episode.shift();
      const data = {
        thumbnail: $('div.thumbnail').find('img').attr('src'),
        title: $('div.detail')
          .find('h2')
          .text()
          .split('Episode')[0]
          .trim() + ' (' + P[0].trim() + ')',
        episode: P[2].trim(),
        release: P[1].trim(),
        genre: $('p.gens').text().trim().split(' '),
        duration: ($('div.durs').text().trim()).replace(/\D/g, '') + ' Minutes',
        channel: $('div.durs').find('a').text().trim(),
        cast,
        sinopsis: $('p.caps').text().trim(),
        episodes: episode,
      };
      return {
        creator: 'Ordiston',
        status: true,
        data,
      };
    } catch (e) {
      console.log(e);
      return {
        creator: 'Ordiston',
        status: false,
      };
    }
  }
}

export default Drakor;