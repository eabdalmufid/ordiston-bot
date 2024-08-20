/* Recode By Ordiston */
import fetch from "node-fetch"
import axios from "axios"

let handler = async (m, {
    conn,
    isOwner,
    usedPrefix,
    command,
    args,
    text
}) => {
if (!text) throw ".mg text1|text2|text3..dst"
try {
    let urut = text.split`|`
    let one = urut[0]
    let two = urut[1]
    let three = urut[2]
    let four = urut[3]
    let five = urut[4]
    
    if (one == "direction") {
    let res = await direction(two, three)
    throw res
    }
    if (one == "geocode") {
    let res = await geocode(two, three)
    throw res
    }
    if (one == "distancematrix") {
    let res = await distancematrix(two, three, four, five)
    throw res
    }
    if (one == "fpftext") {
    let res = await fpftext(two, three, four)
    throw res
    }
    if (one == "acomplete") {
    let res = await acomplete(two, three)
    throw res
    }
    if (one == "getimg") {
    let res = await getimg(two, three)
    throw res
    }
    } catch (e) {
    throw eror
    }

}
handler.help = ["mg"]
handler.tags = ["info"]
handler.command = ["mg"]
export default handler

async function direction(ori, des) {
    let result = await axios("https://maps.googleapis.com/maps/api/directions/json?origin=" + ori + "&destination=" + des + "&key=AIzaSyC53_pp_QYvLdHd-b8ZcfhaVNe5s6EprEU")
    return result.data
}

async function geocode(lat, lng) {
    let result = await axios("https://maps.googleapis.com/maps/api/geocode/json?latlng=" + lat + "," + lng + "&key=AIzaSyC53_pp_QYvLdHd-b8ZcfhaVNe5s6EprEU")
    return result.data
}

async function distancematrix(unit, oria, orib, des) {
    let result = await axios("https://maps.googleapis.com/maps/api/distancematrix/json?units=" + unit + "&origins=" + oria + "," + orib + "&destinations=" + des + "&key=AIzaSyC53_pp_QYvLdHd-b8ZcfhaVNe5s6EprEU")
    return result.data
}

async function fpftext(input, type, field) {
    let result = await axios("https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=" + input + "&inputtype=" + type + "&fields=" + field + "&key=AIzaSyC53_pp_QYvLdHd-b8ZcfhaVNe5s6EprEU")
    return result.data
}

async function acomplete(input, type) {
    let result = await axios("https://maps.googleapis.com/maps/api/place/autocomplete/json?input=" + input + "&types=" + type + "&key=AIzaSyC53_pp_QYvLdHd-b8ZcfhaVNe5s6EprEU")
    return result.data
}
async function getimg(lat, lng) {
    let result = "http://maps.google.com/maps/api/staticmap?zoom=16&size=600x600&maptype=hybrid&markers=" + lat + "," + lng + "&sensor=false&key=AIzaSyAZfRJ8mfbqAa7F0ShdL1b0mmraLwhZSCM"
    return result
}
