
import axios from "axios"
import fetch from "node-fetch"

let handler = async (m, { conn, args, usedPrefix, text, command }) => {
let Token = [
"pk.eyJ1IjoiY3liZXIyMSIsImEiOiJjbDBtbm40MWoxMzNmM2JxdGNjZmtvOHRzIn0.OLPda8qpTVVm7sbqFvxbIQ",
"pk.eyJ1IjoidGhvbWFzcHJ1ZGVsNjQ5NCIsImEiOiJjbDA2dWpzYjMwMWlxM2tzN2c0Y2JoMGtnIn0.5tX0c-HsGG9qWniFxXIZEg",
"pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw",
"pk.eyJ1IjoiYXl1c2hqb3NoaTEzODAiLCJhIjoiY2xhajN2bjV0MDhuYTNzbGZ4eXY3aWV0YyJ9.-t8ccvCJhwwHcOdi435HrQ"
].getRandom()

let ke = await fetch("https://raw.githubusercontent.com/eesur/country-codes-lat-long/master/country-codes-lat-long-alpha3.json")
let v = await ke.json()

    let dapet = v.ref_country_codes
    let listSections = []
	Object.values(dapet).map((v, index) => {
	let lon = v.longitude
	let lat = v.latitude
	listSections.push([++index + " " + cmenub + "📍Location: " + v.country, [
          ["Style: A", usedPrefix + command + " nice https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/pin-l-embassy+f74e4e(" + lon + "," + lat + ")/" + lon + "," + lat + ",16/500x300?access_token=" + Token, v.alpha2],
["Style: B", usedPrefix + command + " nice https://api.mapbox.com/styles/v1/mapbox/light-v10/static/pin-s-l+000(" + lon + "," + lat + ")/" + lon + "," + lat + ",14/500x300?access_token=" + Token, v.alpha2],
["Style: C", usedPrefix + command + " nice https://api.mapbox.com/styles/v1/mapbox/light-v10/static/url-https%3A%2F%2Fdocs.mapbox.com%2Fapi%2Fimg%2Fcustom-marker.png(" + lon + "," + lat + ")/" + lon + "," + lat + ",15/500x300?access_token=" + Token, v.alpha2],
["Style: D", usedPrefix + command + " nice https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/" + lon + "," + lat + ",0,60/400x400?access_token=" + Token, v.alpha2],
["Style: E", usedPrefix + command + " nice https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/geojson(%7B%22type%22%3A%22FeatureCollection%22%2C%22features%22%3A%5B%7B%22type%22%3A%22Feature%22%2C%22properties%22%3A%7B%22marker-color%22%3A%22%23462eff%22%2C%22marker-size%22%3A%22medium%22%2C%22marker-symbol%22%3A%22bus%22%7D%2C%22geometry%22%3A%7B%22type%22%3A%22Point%22%2C%22coordinates%22%3A%5B" + lon + "," + lat + "%5D%7D%7D%2C%7B%22type%22%3A%22Feature%22%2C%22properties%22%3A%7B%22marker-color%22%3A%22%23e99401%22%2C%22marker-size%22%3A%22medium%22%2C%22marker-symbol%22%3A%22park%22%7D%2C%22geometry%22%3A%7B%22type%22%3A%22Point%22%2C%22coordinates%22%3A%5B-122.25916385650635,37.80629162635318%5D%7D%7D%2C%7B%22type%22%3A%22Feature%22%2C%22properties%22%3A%7B%22marker-color%22%3A%22%23d505ff%22%2C%22marker-size%22%3A%22medium%22%2C%22marker-symbol%22%3A%22music%22%7D%2C%22geometry%22%3A%7B%22type%22%3A%22Point%22%2C%22coordinates%22%3A%5B-122.25650310516359,37.8063933469406%5D%7D%7D%5D%7D)/-122.256654,37.804077,13/500x300?access_token=" + Token, v.alpha2],
["Style: F", usedPrefix + command + " nice https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/geojson(%7B%22type%22%3A%22Point%22%2C%22coordinates%22%3A%5B" + lon + "%2C" + lat + "%5D%7D)/" + lon + "," + lat + ",12/500x300?access_token=" + Token, v.alpha2],
["Style: G", usedPrefix + command + " nice https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s-a+9ed4bd(" + lon + "," + lat + "),pin-s-b+000(" + lon + "," + lat + "),path-5+f44-0.5(%7DrpeFxbnjVsFwdAvr@cHgFor@jEmAlFmEMwM_FuItCkOi@wc@bg@wBSgM)/auto/500x300?access_token=" + Token, v.alpha2]
        ]])
	})
	if (!args[0]) return conn.sendList(m.chat, htki + " 📺 MAPS Search 🔎 " + htka, `⚡ Silakan pilih MAPS Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, ` MAPS Search Disini `, listSections, m)
	
	if (args[0] == "nice") {
	let cap = "RESULT"
	let url = args[1]
if (args[1]) return conn.sendButton(m.chat, cap, author, url, [["M E N U", "/menu"]], m)
}

if (args[0] == "custom") {
	let listSections = []
	let cus = ["A"]
	let lon = args[1]
	let lat = args[2]
	Object.keys(cus).map((v, index) => {
	listSections.push([++index + " " + cmenub + "📍Location: " + cus[v], [
          ["Style: A", usedPrefix + command + " nice https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/pin-l-embassy+f74e4e(" + lon + "," + lat + ")/" + lon + "," + lat + ",16/500x300?access_token=" + Token, v.alpha2],
["Style: B", usedPrefix + command + " nice https://api.mapbox.com/styles/v1/mapbox/light-v10/static/pin-s-l+000(" + lon + "," + lat + ")/" + lon + "," + lat + ",14/500x300?access_token=" + Token, v.alpha2],
["Style: C", usedPrefix + command + " nice https://api.mapbox.com/styles/v1/mapbox/light-v10/static/url-https%3A%2F%2Fdocs.mapbox.com%2Fapi%2Fimg%2Fcustom-marker.png(" + lon + "," + lat + ")/" + lon + "," + lat + ",15/500x300?access_token=" + Token, v.alpha2],
["Style: D", usedPrefix + command + " nice https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/" + lon + "," + lat + ",0,60/400x400?access_token=" + Token, v.alpha2],
["Style: E", usedPrefix + command + " nice https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/geojson(%7B%22type%22%3A%22FeatureCollection%22%2C%22features%22%3A%5B%7B%22type%22%3A%22Feature%22%2C%22properties%22%3A%7B%22marker-color%22%3A%22%23462eff%22%2C%22marker-size%22%3A%22medium%22%2C%22marker-symbol%22%3A%22bus%22%7D%2C%22geometry%22%3A%7B%22type%22%3A%22Point%22%2C%22coordinates%22%3A%5B" + lon + "," + lat + "%5D%7D%7D%2C%7B%22type%22%3A%22Feature%22%2C%22properties%22%3A%7B%22marker-color%22%3A%22%23e99401%22%2C%22marker-size%22%3A%22medium%22%2C%22marker-symbol%22%3A%22park%22%7D%2C%22geometry%22%3A%7B%22type%22%3A%22Point%22%2C%22coordinates%22%3A%5B-122.25916385650635,37.80629162635318%5D%7D%7D%2C%7B%22type%22%3A%22Feature%22%2C%22properties%22%3A%7B%22marker-color%22%3A%22%23d505ff%22%2C%22marker-size%22%3A%22medium%22%2C%22marker-symbol%22%3A%22music%22%7D%2C%22geometry%22%3A%7B%22type%22%3A%22Point%22%2C%22coordinates%22%3A%5B-122.25650310516359,37.8063933469406%5D%7D%7D%5D%7D)/-122.256654,37.804077,13/500x300?access_token=" + Token, v.alpha2],
["Style: F", usedPrefix + command + " nice https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/geojson(%7B%22type%22%3A%22Point%22%2C%22coordinates%22%3A%5B" + lon + "%2C" + lat + "%5D%7D)/" + lon + "," + lat + ",12/500x300?access_token=" + Token, v.alpha2],
["Style: G", usedPrefix + command + " nice https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s-a+9ed4bd(" + lon + "," + lat + "),pin-s-b+000(" + lon + "," + lat + "),path-5+f44-0.5(%7DrpeFxbnjVsFwdAvr@cHgFor@jEmAlFmEMwM_FuItCkOi@wc@bg@wBSgM)/auto/500x300?access_token=" + Token, v.alpha2]
        ]])
	})
	if (lon||lat) return conn.sendList(m.chat, htki + " 📺 MAPS Search 🔎 " + htka, `⚡ Silakan pilih MAPS Search di tombol di bawah...\n*Teks yang anda kirim:* ${text}\n\nKetik ulang *${usedPrefix + command}* teks anda untuk mengubah teks lagi`, author, ` MAPS Search Disini `, listSections, m)
	else if (!lon||!lat) throw "Masukkan Longitude dan Latitude\nEx. .mapbox custom 16.000 16.000"
}

}
handler.command = ["mapbox"]

export default handler

/*
https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/pin-l-embassy+f74e4e(-74.0021,40.7338)/-74.0021,40.7338,16/500x300?access_token=" + Token + "
https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-96.561208,38.790325,3/800x400@2x?addlayer={%22id%22:%22better-boundary%22,%22type%22:%22line%22,%22source%22:%22composite%22,%22source-layer%22:%22admin%22,%22filter%22:[%22all%22,[%22==%22,[%22get%22,%22admin_level%22],1],[%22==%22,[%22get%22,%22maritime%22],%22false%22],[%22match%22,[%22get%22,%22worldview%22],[%22all%22,%22US%22],true,false],[%22==%22,[%22get%22,%22iso_3166_1%22],%22US%22]],%22layout%22:{%22line-join%22:%22bevel%22},%22paint%22:{%22line-color%22:%22%23DB6936%22,%22line-width%22:1.5,%22line-dasharray%22:[1.5,1]}}&before_layer=road-label&access_token=" + Token + "
https://api.mapbox.com/styles/v1/mapbox/light-v10/static/pin-s-l+000(-87.0186,32.4055)/-87.0186,32.4055,14/500x300?access_token=" + Token + "
https://api.mapbox.com/styles/v1/mapbox/light-v10/static/url-https%3A%2F%2Fdocs.mapbox.com%2Fapi%2Fimg%2Fcustom-marker.png(-76.9,38.9)/-76.9,38.9,15/500x300?access_token=" + Token + "
https://api.mapbox.com/styles/v1/mapbox/satellite-v9/static/0,0,2/600x600?access_token=" + Token + "
https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-122.4241,37.78,15.25,0,60/400x400?access_token=" + Token + "
https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/-96.8,47.3,1.8/800x400?access_token=" + Token + "&setfilter=[%22==%22,%22name_en%22,%22Canada%22]&layer_id=country-label
https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/0,0,2/600x600?access_token=" + Token + "
https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/0,10,3,20/600x600?access_token=" + Token + "
https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/[-77.043686,38.892035,-77.028923,38.904192]/400x400?access_token=" + Token + "
https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/[-77.043686,38.892035,-77.028923,38.904192]/400x400?padding=50,10,20&access_token=" + Token + "
https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/geojson(%7B%22type%22%3A%22FeatureCollection%22%2C%22features%22%3A%5B%7B%22type%22%3A%22Feature%22%2C%22properties%22%3A%7B%22marker-color%22%3A%22%23462eff%22%2C%22marker-size%22%3A%22medium%22%2C%22marker-symbol%22%3A%22bus%22%7D%2C%22geometry%22%3A%7B%22type%22%3A%22Point%22%2C%22coordinates%22%3A%5B-122.25993633270264,37.80988566878777%5D%7D%7D%2C%7B%22type%22%3A%22Feature%22%2C%22properties%22%3A%7B%22marker-color%22%3A%22%23e99401%22%2C%22marker-size%22%3A%22medium%22%2C%22marker-symbol%22%3A%22park%22%7D%2C%22geometry%22%3A%7B%22type%22%3A%22Point%22%2C%22coordinates%22%3A%5B-122.25916385650635,37.80629162635318%5D%7D%7D%2C%7B%22type%22%3A%22Feature%22%2C%22properties%22%3A%7B%22marker-color%22%3A%22%23d505ff%22%2C%22marker-size%22%3A%22medium%22%2C%22marker-symbol%22%3A%22music%22%7D%2C%22geometry%22%3A%7B%22type%22%3A%22Point%22%2C%22coordinates%22%3A%5B-122.25650310516359,37.8063933469406%5D%7D%7D%5D%7D)/-122.256654,37.804077,13/500x300?access_token=" + Token + "
https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/geojson(%7B%22type%22%3A%22Point%22%2C%22coordinates%22%3A%5B-73.99%2C40.7%5D%7D)/-73.99,40.70,12/500x300?access_token=" + Token + "
https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/pin-s-a+9ed4bd(-122.46589,37.77343),pin-s-b+000(-122.42816,37.75965),path-5+f44-0.5(%7DrpeFxbnjVsFwdAvr@cHgFor@jEmAlFmEMwM_FuItCkOi@wc@bg@wBSgM)/auto/500x300?access_token=" + Token + "
*/
