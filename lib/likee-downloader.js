import axios from 'axios';
import * as cheerio from 'cheerio';
import FormData from 'form-data';

export default async (url) => {
  try {
    const form = new FormData();
    form.append('id', url);
    form.append('locale', 'en');
    const json = await (await axios.post('https://likeedownloader.com/process', form)).data;
    console.log(json);
    const urls = [];
    const $ = cheerio.load(json.template);
    $('a').each((i, e) => urls.push($(e).attr('href')));
    const res = {
      'watermark': urls[0],
      'no watermark': urls[1],
    };
    return { 
      creator: 'Ordiston', 
      status: true,
      caption: $('p.infotext').text().replace(/\r?\n|\r/g, '').trim(),
      data: res,
    };
  } catch (error) {
    console.error(error);
    return {
      creator: 'Ordiston',
      status: false,
    };
  }
};