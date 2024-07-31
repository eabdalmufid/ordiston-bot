import fetch from "node-fetch"

export class Weather {
  #BASE_URL = 'https://api.openweathermap.org/data/2.5/';
  #API = 'e1868383596238a03a9fcf1a7f12bf30';

  fetchCityWeather(cityName, unit) {
    return fetch(
      `${this.#BASE_URL}weather?q=${cityName}&appid=${this.#API}&units=${unit}`
    ).then(res => {
      if (!res.ok) {
        throw new Error(res.status);
      }

      return res.json();
    });
  }
}

export class Ip {
  #BASE_URL = 'https://ipinfo.io';
  #API = '8851da7fd8c9f0';

  fetchIp() {
    return fetch(`${this.#BASE_URL}/json?token=${this.#API}`).then(res => {
      if (!res.ok) {
        throw new Error(res.status);
      }
      return res.json();
    });
  }
}
export class BackgroundImage {
  #BASE_URL = 'https://api.unsplash.com/photos';
  #API = 'Gr-Tp-fAy1z5zJ7f1u7dTi3-i6PHLzfDrEZ4tA-e_EY';

  fetchImage(city) {
    return fetch(
      `${
        this.#BASE_URL
      }/random?query=${city}&count=1&orientation=landscape&client_id=${
        this.#API
      }`
    ).then(res => {
      if (!res.ok) {
        throw new Error(res.arrayBuffer.status);
      }
      return res.json();
    });
  }
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
