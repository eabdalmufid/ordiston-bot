import axios from 'axios'
import cheerio from 'cheerio'

function XPanas(search = 'indonesia') {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get('http://164.68.127.15/?id=' + search)
      const $ = cheerio.load(data)
      const ajg = []
      $('#content > .mozaique.thumbs-5 > center > .thumb-block > .thumb-inside > .thumb > a').each((i, u) => {
        ajg.push({
          nonton: 'https://164.68.127.15' + $(u).attr('href'),
          img: $(u).find('img').attr('data-src'),
          title: $(u).find('img').attr('title')
        })
      })
      if (ajg.every(x => x === undefined)) return resolve({ developer: '@xorizn', mess: 'no result found' })
      resolve(ajg)
    } catch (err) {
      console.error(err)
    }
  })
}
function WikiMedia(search) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(`https://commons.wikimedia.org/w/index.php?search=${search}&title=Special:MediaSearch&go=Go&type=image`)
      const $ = cheerio.load(data)
      const hasil = []
      $('.sdms-search-results__list-wrapper > div > a').each(function (a, b) {
        hasil.push({
          title: $(b).find('img').attr('alt'),
          source: $(b).attr('href'),
          image: $(b).find('img').attr('data-src') || $(b).find('img').attr('src')
        })
      })
      if (hasil.every(x => x === undefined)) return resolve({ developer: '@xorizn', mess: 'no result found' })
      resolve(hasil)
    } catch (err) {
      console.error(err)
    }
  })
}
function SoundCloudeS(search) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data, status } = await axios.get(`https://soundcloud.com/search?q=${search}`)
      const $ = cheerio.load(data)
      const ajg = []
      $('#app > noscript').each((u, i) => {
        ajg.push($(i).html())
      })
      const _$ = cheerio.load(ajg[1])
      const hasil = []
      _$('ul > li > h2 > a').each((i, u) => {
        if ($(u).attr('href').split('/').length === 3) {
          const linkk = $(u).attr('href')
          const judul = $(u).text()
          const link = linkk ? linkk : 'Tidak ditemukan'
          const jdi = `https://soundcloud.com${link}`
          const jadu = judul ? judul : 'Tidak ada judul'
          hasil.push({
            link: jdi,
            judul: jadu
          })
        }
      })
      if (hasil.every(x => x === undefined)) return { developer: '@xorizn', mess: 'no result found' }
      resolve(hasil)
    } catch (err) {
      console.error(err)
    }
  })
}
function RingTone(search) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get('https://meloboom.com/en/search/' + search)
      let $ = cheerio.load(data)
      let hasil = []
      $('#__next > main > section > div.jsx-2244708474.container > div > div > div > div:nth-child(4) > div > div > div > ul > li').each(function (a, b) {
        hasil.push({ title: $(b).find('h4').text(), source: 'https://meloboom.com/' + $(b).find('a').attr('href'), audio: $(b).find('audio').attr('src') })
      })
      resolve(hasil)
    } catch (err) {
      console.error(err)
    }
  })
}
function PlayStore(search) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data, status } = await axios.get(`https://play.google.com/store/search?q=${search}&c=apps`)
      const hasil = []
      const $ = cheerio.load(data)
      $('.ULeU3b > .VfPpkd-WsjYwc.VfPpkd-WsjYwc-OWXEXe-INsAgc.KC1dQ.Usd1Ac.AaN0Dd.Y8RQXd > .VfPpkd-aGsRMb > .VfPpkd-EScbFb-JIbuQc.TAQqTe > a').each((i, u) => {
        const linkk = $(u).attr('href')
        const nama = $(u).find('.j2FCNc > .cXFu1 > .ubGTjb > .DdYX5').text()
        const developer = $(u).find('.j2FCNc > .cXFu1 > .ubGTjb > .wMUdtb').text()
        const img = $(u).find('.j2FCNc > img').attr('src')
        const rate = $(u).find('.j2FCNc > .cXFu1 > .ubGTjb > div').attr('aria-label')
        const rate2 = $(u).find('.j2FCNc > .cXFu1 > .ubGTjb > div > span.w2kbF').text()
        const link = `https://play.google.com${linkk}`

        hasil.push({
          link: link,
          nama: nama ? nama : 'No name',
          developer: developer ? developer : 'No Developer',
          img: img ? img : 'https://i.ibb.co/G7CrCwN/404.png',
          rate: rate ? rate : 'No Rate',
          rate2: rate2 ? rate2 : 'No Rate',
          link_dev: `https://play.google.com/store/apps/developer?id=${developer.split(" ").join('+')}`
        })
      })
      if (hasil.every(x => x === undefined)) return resolve({ developer: '@xorizn', mess: 'no result found' })
      resolve(hasil)
    } catch (err) {
      console.error(err)
    }
  })
}

function TixID() {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get('https://www.tix.id/tix-now/')
      const $ = cheerio.load(data)
      const hasil = []
      $('div.gt-blog-list > .gt-item').each((i, u) => {
        hasil.push({
          link: $(u).find('.gt-image > a').attr('href'),
          image: $(u).find('.gt-image > a > img').attr('data-src'),
          judul: $(u).find('.gt-title > a').text(),
          tanggal: $(u).find('.gt-details > ul > .gt-date > span').text(),
          deskripsi: $(u).find('.gt-excerpt > p').text(),
        })
      })
      resolve(hasil)
    } catch (err) {
      console.error(err)
    }
  })
}
function BukaLapak(search) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get(`https://www.bukalapak.com/products?from=omnisearch&from_keyword_history=false&search[keywords]=${search}&search_source=omnisearch_keyword&source=navbar`, {
        headers: {
          "user-agent": 'Mozilla/ 5.0(Windows NT 10.0; Win64; x64; rv: 108.0) Gecko / 20100101 Firefox / 108.0'
        }
      })
      const $ = cheerio.load(data);
      const dat = [];
      const b = $('a.slide > img').attr('src');
      $('div.bl-flex-item.mb-8').each((i, u) => {
        const a = $(u).find('observer-tracker > div > div');
        const img = $(a).find('div > a > img').attr('src');
        if (typeof img === 'undefined') return

        const link = $(a).find('.bl-thumbnail--slider > div > a').attr('href');
        const title = $(a).find('.bl-product-card__description-name > p > a').text().trim();
        const harga = $(a).find('div.bl-product-card__description-price > p').text().trim();
        const rating = $(a).find('div.bl-product-card__description-rating > p').text().trim();
        const terjual = $(a).find('div.bl-product-card__description-rating-and-sold > p').text().trim();

        const dari = $(a).find('div.bl-product-card__description-store > span:nth-child(1)').text().trim();
        const seller = $(a).find('div.bl-product-card__description-store > span > a').text().trim();
        const link_sel = $(a).find('div.bl-product-card__description-store > span > a').attr('href');

        const res_ = {
          title: title,
          rating: rating ? rating : 'No rating yet',
          terjual: terjual ? terjual : 'Not yet bought',
          harga: harga,
          image: img,
          link: link,
          store: {
            lokasi: dari,
            nama: seller,
            link: link_sel
          }
        };

        dat.push(res_);
      })
      if (dat.every(x => x === undefined)) return resolve({ developer: '@xorizn', mess: 'no result found' })
      resolve(dat)
    } catch (err) {
      console.error(err)
    }
  })
}
function AcaraNow() {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get('https://www.jadwaltv.net/channel/acara-tv-nasional-saat-ini');
      const $ = cheerio.load(data)
      let tv = []
      $('table.table.table-bordered > tbody > tr').each((u, i) => {
        let an = $(i).text().split('WIB')
        if (an[0] === 'JamAcara') return
        if (typeof an[1] === 'undefined') return tv.push('\n' + '*' + an[0] + '*')
        tv.push(`${an[0]} - ${an[1]}`)
      })
      if (tv.every(x => x === undefined)) return resolve({ developer: '@xorizn', mess: 'no result found' })
      resolve(tv)
    } catch (err) {
      console.error(err)
    }
  })
}
function Jadwal_Sepakbola() {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get('https://www.jadwaltv.net/jadwal-sepakbola');
      const $ = cheerio.load(data)
      let tv = []
      $('table.table.table-bordered > tbody > tr.jklIv').each((u, i) => {
        let an = $(i).html().replace(/<td>/g, '').replace(/<\/td>/g, ' - ')
        tv.push(`${an.substring(0, an.length - 3)}`)
      })
      if (tv.every(x => x === undefined)) return resolve({ developer: '@xorizn', mess: 'no result found' })
      resolve(tv)
    } catch (err) {
      console.error(err)
    }
  })
}
function JadwalTV(query) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get('https://www.jadwaltv.net/channel/' + query);
      const $ = cheerio.load(data);
      const tv = []
      $('table.table.table-bordered > tbody > tr.jklIv').each((u, i) => {
        let an = $(i).text().split('WIB')
        tv.push(`${an[0]} - ${an[1]}`)
      })
      if (tv.every(x => x === undefined)) return resolve({ developer: '@xorizn', mess: 'no result found' })
      resolve(tv.join('\n'))
    } catch (err) {
      console.error(err)
    }
  })
}
function Steam(search) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data, status } = await axios.get('https://store.steampowered.com/search/?term=' + search)
      const $ = cheerio.load(data)
      const hasil = []
      $('#search_resultsRows > a').each((a, b) => {
        const link = $(b).attr('href')
        const judul = $(b).find(`div.responsive_search_name_combined > div.col.search_name.ellipsis > span`).text()
        const harga = $(b).find(`div.responsive_search_name_combined > div.col.search_price_discount_combined.responsive_secondrow > div.col.search_price.responsive_secondrow `).text().replace(/ /g, '').replace(/\n/g, '')
        var rating = $(b).find(`div.responsive_search_name_combined > div.col.search_reviewscore.responsive_secondrow > span`).attr('data-tooltip-html')
        const img = $(b).find(`div.col.search_capsule > img`).attr('src')
        const rilis = $(b).find(`div.responsive_search_name_combined > div.col.search_released.responsive_secondrow`).text()

        if (typeof rating === 'undefined') {
          var rating = 'no ratings'
        }
        if (rating.split('<br>')) {
          let hhh = rating.split('<br>')
          var rating = `${hhh[0]} ${hhh[1]}`
        }
        hasil.push({
          judul: judul,
          img: img,
          link: link,
          rilis: rilis,
          harga: harga ? harga : 'no price',
          rating: rating
        })
      })
      if (hasil.every(x => x === undefined)) return resolve({ developer: '@xorizn', mess: 'no result found' })
      resolve(hasil)
    } catch (err) {
      console.error(err)
    }
  })
}
function Steam_Detail(url) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data, status } = await axios.get(url)
      const $ = cheerio.load(data)
      const xorizn = []
      const img = $('#gameHeaderImageCtn > img').attr('src')
      $('div.game_area_sys_req.sysreq_content.active > div > ul > ul > li').each((u, i) => { xorizn.push($(i).text()) })
      const hasil = $('#genresAndManufacturer').html().replace(/\n/g, '').replace(/<br>/g, '\n').replace(/\t/g, '').replace(/<b>/g, '').replace(/<\/div>/g, '\n').replace(/ /g, '').replace(/<\/b>/g, ' ').replace(/<[^>]*>/g, '')
      const desc = $('div.game_description_snippet').text().replace(/\t/g, '').replace(/\n/g, '')
      const hasill = {
        desc: desc ? desc : 'Error',
        img: img ? img : 'https://i.ibb.co/G7CrCwN/404.png',
        system: xorizn.join('\n') ? xorizn.join('\n') : 'Error',
        info: hasil
      }
      resolve(hasill)
    } catch (err) {
      console.error(err)
    }
  })
}
function WattPad(judul) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get('https://www.wattpad.com/search/' + judul, {
        headers: {
          cookie: 'wp_id=d92aecaa-7822-4f56-b189-f8c4cc32825c; sn__time=j%3Anull; fs__exp=1; adMetrics=0; _pbkvid05_=0; _pbeb_=0; _nrta50_=0; lang=20; locale=id_ID; ff=1; dpr=1; tz=-8; te_session_id=1681636962513; _ga_FNDTZ0MZDQ=GS1.1.1681636962.1.1.1681637905.0.0.0; _ga=GA1.1.1642362362.1681636963; signupFrom=search; g_state={"i_p":1681644176441,"i_l":1}; RT=r=https%3A%2F%2Fwww.wattpad.com%2Fsearch%2Fanime&ul=1681637915624',
          'suer-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/111.0'
        }
      }),
        $ = cheerio.load(data),
        limk = 'https://www.wattpad.com',
        _data = [];
      $('.story-card-container > ul.list-group.new-list-group > li.list-group-item').each(function (i, u) {
        let link = limk + $(u).find('a').attr('href')
        let judul = $(u).find('a > div > div.story-info > div.title').text().trim()
        let img = $(u).find('a > div > div.cover > img').attr('src')
        let desc = $(u).find('a > div > div.story-info > .description').text().replace(/\s+/g, ' ')
        let _doto = []
        $(u).find('a > div > div.story-info > .new-story-stats > .stats-item').each((u, i) => {
          _doto.push($(i).find('.icon-container > .tool-tip > .sr-only').text())
        })
        _data.push({
          title: judul,
          thumb: img,
          desc: desc,
          reads: _doto[0],
          vote: _doto[1],
          chapter: _doto[2],
          link: link,
        })
      })

      resolve(_data)
    } catch (err) {
      console.error(err)
    }
  })
}
function LinkWa(query) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get('http://ngarang.com/link-grup-wa/daftar-link-grup-wa.php?search=' + query + '&searchby=name')
      const $ = cheerio.load(data),
        _title = [],
        _link = [],
        result = [];
      $('.wa-chat-title > .wa-chat-title-text').each((u, i) => {
        $('span[style="display:none;"]').remove();
        _title.push($(i).html().replace(/<\/?[^>]+(>|$)/g, ''))
      })
      $('.wa-chat-message > a').each((u, i) => {
        _link.push($(i).text().trim())
      })
      for (let i = 0; i < _link.length; i++) {
        result.push({
          title: _title[i],
          link: _link[i]
        })
      }
      resolve(result)
    } catch (err) {
      console.error(err)
    }
  })
}
function Lirik2(judul) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get('https://www.musixmatch.com/search/' + judul),
        $ = cheerio.load(data),
        hasil = {},
        limk = 'https://www.musixmatch.com',
        link = limk + $('div.media-card-body > div > h2').find('a').attr('href');
      await axios.get(link).then(({ data }) => {
        const $$ = cheerio.load(data)
        hasil.thumb = 'https:' + $$('div.col-sm-1.col-md-2.col-ml-3.col-lg-3.static-position > div > div > div').find('img').attr('src')
        $$('div.col-sm-10.col-md-8.col-ml-6.col-lg-6 > div.mxm-lyrics').each(function (a, b) {
          hasil.lirik = $$(b).find('span > p > span').text() + '\n' + $$(b).find('span > div > p > span').text()
        })
      })
      resolve(hasil)
    } catch (err) {
      console.error(err)
    }
  })
}
function KBBI(query) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get('https://kbbi.kemdikbud.go.id/entri/' + query);
      const $ = cheerio.load(data);
      let _kata = []
      let _arti = []
      let _ol = []
      $('h2[style="margin-bottom:3px"]').each((i, u) => {
        _kata.push($(u).text().trim())
      })
      $('div.container.body-content').find('li').each((i, u) => {
        let hasil = $(u).html().replace(/<[^>]+>/g, ' ').replace(/ {2,}/g, ' ').trim()
        _arti.push(hasil)
      })
      $('ol > li').each(function (i, u) {
        _ol.push($(u).html().replace(/<[^>]+>/g, ' ').replace(/ {2,}/g, ' ').trim())
      })
      _arti.splice(_arti.length - 3, 3);
      if (!(_ol.length === 0)) {
        resolve({
          lema: _kata[0],
          arti: _ol
        })
      } else {
        resolve({
          lema: _kata[0],
          arti: _arti
        })
      }
    } catch (err) {
      console.error(err)
    }
  })
}
function Nomina(query) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get('https://tesaurus.kemdikbud.go.id/tematis/lema/' + query + '/nomina');
      const $ = cheerio.load(data);
      let _arti = []
      $('.search-result-area > .result-par > .contain > .result-set').each((i, u) => {
        _arti.push($(u).text().trim())
      })
      resolve({
        lema: query,
        nomina: _arti,
        length: _arti.length
      })
    } catch (err) {
      console.error(err)
    }
  })
}
function KodePos(query) {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get('https://nomorkodepos.com/?s=' + query);
      const $ = cheerio.load(data);
      let _data = []

      $('table.pure-table.pure-table-horizontal > tbody > tr').each((i, u) => {
        let _doto = [];
        $(u).find('td').each((l, p) => {
          _doto.push($(p).text().trim())
        })
        _data.push({
          province: _doto[0],
          city: _doto[1],
          subdistrict: _doto[2],
          village: _doto[3],
          postalcode: _doto[4]
        })
      })
      resolve(_data)
    } catch (err) {
      console.error(err)
    }
  })
}
function ListHero() {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = await axios.get('https://mobile-legends.fandom.com/wiki/List_of_heroes');
      const $ = cheerio.load(data);
      let _data = []

      $('table.wikitable.sortable > tbody > tr').each((i, u) => {
        let hero_icon = $(u).find('td:nth-child(1) > center > a > img').attr('data-src')
        if (typeof hero_icon === 'undefined') return
        let name = $(u).find('td:nth-child(2)').text().trim()
        let hero_code = $(u).find('td:nth-child(3)').text().trim()
        let role = $(u).find('td:nth-child(4)').text().trim()
        let specialties = $(u).find('td:nth-child(5)').text().trim()
        let laning = $(u).find('td:nth-child(6)').text().trim()
        let release = $(u).find('td:nth-child(7)').text().trim()
        let price = $(u).find('td:nth-child(8)').text().trim()
        _data.push({
          hero_icon: hero_icon,
          name: name,
          hero_code: hero_code,
          role: role,
          specialties: specialties,
          laning: laning,
          release: release,
          price: price,
        })
      })
      resolve(_data)
    } catch (err) {
      console.error(err)
    }
  })
}
function Hero(querry) {
  return new Promise(async (resolve, reject) => {
    try {
      let upper = querry.charAt(0).toUpperCase() + querry.slice(1).toLowerCase()
      const { data, status } = await axios.get('https://mobile-legends.fandom.com/wiki/' + upper);
      if (status === 200) {
        const $ = cheerio.load(data);
        let atributes = []
        let rill = []
        let rull = []
        let rell = []
        let hero_img = $('figure.pi-item.pi-image > a > img').attr('src')
        let desc = $('div.mw-parser-output > p:nth-child(6)').text()
        $('.mw-parser-output > table:nth-child(9) > tbody > tr').each((u, i) => {
          let _doto = []
          $(i).find('td').each((o, p) => { _doto.push($(p).text().trim()) })
          if (_doto.length === 0) return
          atributes.push({
            attribute: _doto[0],
            level_1: _doto[1],
            level_15: _doto[2],
            growth: _doto.pop()
          })
        })
        $('div.pi-item.pi-data.pi-item-spacing.pi-border-color > div.pi-data-value.pi-font').each((i, u) => { rill.push($(u).text().trim()) })
        $('aside.portable-infobox.pi-background.pi-border-color.pi-theme-wikia.pi-layout-default').each((i, u) => { rull.push($(u).html()) })
        const _$ = cheerio.load(rull[1])
        _$('.pi-item.pi-data.pi-item-spacing.pi-border-color').each((l, m) => {
          rell.push(_$(m).text().trim().replace(/\n/g, ':').replace(/\t/g, ''))
        })
        const result = rell.reduce((acc, curr) => {
          const [key, value] = curr.split('::');
          acc[key] = value;
          return acc;
        }, {});
        let anu = {
          hero_img: hero_img,
          desc: desc,
          release: rill[0],
          role: rill[1],
          specialty: rill[2],
          lane: rill[3],
          price: rill[4],
          gameplay_info: {
            durability: rill[5],
            offense: rill[6],
            control_effect: rill[7],
            difficulty: rill[8],
          },
          story_info_list: result,
          story_info_array: rell,
          attributes: atributes
        }
        resolve(anu)
      } else if (status === 400) {
        resolve({ mess: 'hh'})
      }
      console.log(status)
    } catch (err) {
      resolve({ mess: 'asu'})
    }
  })
}

export {
  XPanas,
  WikiMedia,
  SoundCloudeS,
  RingTone,
  PlayStore,
  BukaLapak,
  TixID,
  AcaraNow,
  Jadwal_Sepakbola,
  JadwalTV,
  Steam,
  Steam_Detail,
  WattPad,
  LinkWa,
  Lirik2,
  KBBI,
  Nomina,
  KodePos,
  ListHero,
  Hero
}

import {
    fileURLToPath,
    URL
} from 'url'
import chalk from 'chalk'
import fs from 'fs'
const __filename = new URL('', import.meta.url).pathname
const __dirname = new URL('.', import.meta.url).pathname
let file = fileURLToPath(import.meta.url)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.bgGreen(chalk.black("[  UPDATE ]")), chalk.white(`${__filename}`))
    import(`${file}?update=${Date.now()}`)
})