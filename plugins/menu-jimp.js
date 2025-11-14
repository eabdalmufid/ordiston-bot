
import uploadFile from '../lib/uploadFile.js'
import uploadImage from '../lib/uploadImage.js'
import { webp2png } from '../lib/webp2mp4.js'
import { Sticker, StickerTypes } from 'wa-sticker-formatter'
import fetch from 'node-fetch'
import pkg from 'jimp';
const { Jimp } = pkg;
import TinyColor from 'tinycolor2'

let handler = async (m, { conn, args, text }) => {
if (!m.quoted) throw "Reply media gambar"
let a_ = m.quoted ? m.quoted : m
  let b_ = (a_.msg || a_).mimetype || ''
  let c_ = await a_.download()
  let e_ = new Sticker(c_, { pack: packname, author: author, type: StickerTypes.FULL })
  let link
  try {
  if (/webp/g.test(b_)) link = await webp2png(c_)
        else if (m.mentionedJid?.[0]) link = await conn.profilePictureUrl(m.mentionedJid[0], 'image')
        else if (/image/g.test(b_)) link = await uploadImage(c_)
        else if (/video/g.test(b_)) link = await uploadFile(c_)
        else if (/viewOnce/g.test(b_)) link = await uploadFile(c_)
        if (typeof link !== 'string') link = await uploadImage(c_)
        else if (/gif/g.test(b_)) link = e_
        } catch (e) {
        throw eror
        }
        if (!args[0]) throw `List Efek

• autocrop
• background
• blur
• brightness
• color
• contrast
• crop
• dither565
• fade
• flip
• gaussian
• greyscale
• hasAlpha
• invert
• mask
• mirror
• normalize
• opacity
• opaque
• posterize
• sepia`

if (!b_) throw 'No media found'
let hoih
  if (args[0] == 'blur') {
  	hoih = await blur(link, args[1])
  }
if (args[0] == 'color') {
  	hoih = await color(link, args[1])
  }
if (args[0] == 'flip') {
  	hoih = await flip(link)
  }
if (args[0] == 'flip2') {
  	hoih = await flip2(link)
  }
if (args[0] == 'gaussian') {
  	hoih = await gaussian(link, args[1])
  }
if (args[0] == 'invert') {
  	hoih = await invert(link, args[1])
  }
if (args[0] == 'mask') {
  	hoih = await mask(link, args[1])
  }
if (args[0] == 'normalize') {
  	hoih = await normalize(link)
  }
if (args[0] == 'autocrop') {
  	hoih = await autocrop(link, args[1])
  }
if (args[0] == 'background') {
  	hoih = await background(link, args[1])
  }
if (args[0] == 'brightness') {
  	hoih = await brightness(link, args[1])
  }
if (args[0] == 'contrast') {
  	hoih = await contrast(link, args[1])
  }
if (args[0] == 'crop') {
  	hoih = await crop(link, args[1])
  }
if (args[0] == 'dither565') {
  	hoih = await dither565(link)
  }
if (args[0] == 'fade') {
  	hoih = await fade(link, args[1])
  }
if (args[0] == 'greyscale') {
  	hoih = await greyscale(link)
  }
if (args[0] == 'hasAlpha') {
  	hoih = await hasAlpha(link, args[1])
  }
if (args[0] == 'mirror') {
  	hoih = await mirror(link)
  }
if (args[0] == 'mirror2') {
  	hoih = await mirror2(link)
  }
if (args[0] == 'opacity') {
  	hoih = await opacity(link, args[1])
  }
if (args[0] == 'opaque') {
  	hoih = await opaque(link)
  }
if (args[0] == 'posterize') {
  	hoih = await posterize(link, args[1])
  }
if (args[0] == 'sepia') {
  	hoih = await sepia(link)
  }
  
  if (args[0]) await conn.sendFile(m.chat, hoih, 'thumbnail.jpg', `
*RESULT*
`, m)

}
handler.help = ['hooh']
handler.tags = ['fun']
handler.command = /^(hooh)$/i

export default handler
function arbitraryColorToInt (val) {
    val = val || 0; // 0, null, undefined, NaN
    if (typeof val === 'number') 
        return Number(val);
    var color = new TinyColor(val);
    return parseInt(color.toHex8(), 16);
}

async function flip(img) {
  let imagea = await Jimp.read(img);
 let aa = await imagea.flip(false, true).getBufferAsync(Jimp.MIME_JPEG)
return aa
}

async function flip2(img) {
  let imagea2 = await Jimp.read(img);
 let aa2 = await imagea2.flip(true, false).getBufferAsync(Jimp.MIME_JPEG)
return aa2
}

async function blur(img, num) {
  let imageb = await Jimp.read(img);
 let bb = await imageb.blur(Number(num)).getBufferAsync(Jimp.MIME_JPEG)
return bb
}

async function color(img, num) {
  let imagec = await Jimp.read(img);
 let cc = await imagec.color([{ apply: String(num), params: [100] }]).getBufferAsync(Jimp.MIME_JPEG)
return cc
}

async function mask(imga, imgb) {
  let imaged = await Jimp.read(imga);
  let imgbc = await Jimp.read(imgb);
 let dd = await imaged.mask(imgbc).getBufferAsync(Jimp.MIME_JPEG)
return dd
}

async function gaussian(img, num) {
  let imagee = await Jimp.read(img);
 let ee = await imagee.gaussian(Number(num)).getBufferAsync(Jimp.MIME_JPEG)
return ee
}

async function invert(img) {
  let imagef = await Jimp.read(img);
 let ff = await imagef.invert().getBufferAsync(Jimp.MIME_JPEG)
return ff
}

async function normalize(img) {
  let imageg = await Jimp.read(img);
 let gg = await imageg.normalize().getBufferAsync(Jimp.MIME_JPEG)
return gg
}

async function autocrop(img, op) {
  let imageh = await Jimp.read(img);
 let hh = await imageh.autocrop(op).getBufferAsync(Jimp.MIME_JPEG)
return hh
}

async function background(img, hx) {
  let imagei = await Jimp.read(img);
 let ii = await imagei.background(arbitraryColorToInt(hx)).getBufferAsync(Jimp.MIME_JPEG)
return ii
}

async function brightness(img, hx) {
  let imagej = await Jimp.read(img);
 let jj = await imagej.brightness(Number(hx)).getBufferAsync(Jimp.MIME_JPEG)
return jj
}

async function contrast(img, hx) {
  let imagek = await Jimp.read(img);
 let kk = await imagek.contrast(Number(hx)).getBufferAsync(Jimp.MIME_JPEG)
return kk
}

async function crop(img, hx) {
  let imagel = await Jimp.read(img);
 let ll = await imagel.crop(Number(hx), Number(hx), Number(hx), Number(hx)).getBufferAsync(Jimp.MIME_JPEG)
return ll
}

async function dither565(img) {
  let imagem = await Jimp.read(img);
 let mm = await imagem.dither565().getBufferAsync(Jimp.MIME_JPEG)
return mm
}

async function fade(img, hx) {
  let imagen = await Jimp.read(img);
 let nn = await imagen.fade(Number(hx)).getBufferAsync(Jimp.MIME_JPEG)
return nn
}

async function greyscale(img) {
  let imageo = await Jimp.read(img);
 let oo = await imageo.greyscale().getBufferAsync(Jimp.MIME_JPEG)
return oo
}

async function hasAlpha(img) {
  let imagep = await Jimp.read(img);
 let pp = await imagep.hasAlpha().getBufferAsync(Jimp.MIME_JPEG)
return pp
}

async function mirror(img) {
  let imageq = await Jimp.read(img);
 let qq = await imageq.mirror(true, false).getBufferAsync(Jimp.MIME_JPEG)
return qq
}

async function mirror2(img) {
  let imageq2 = await Jimp.read(img);
 let qq2 = await imageq2.mirror(false, true).getBufferAsync(Jimp.MIME_JPEG)
return qq2
}

async function opacity(img, hx) {
  let imager = await Jimp.read(img);
 let rr = await imager.opacity(Number(hx)).getBufferAsync(Jimp.MIME_JPEG)
return rr
}

async function opaque(img) {
  let images = await Jimp.read(img);
 let ss = await images.opaque().getBufferAsync(Jimp.MIME_JPEG)
return ss
}

async function posterize(img, hx) {
  let imaget = await Jimp.read(img);
 let tt = await imaget.posterize(Number(hx)).getBufferAsync(Jimp.MIME_JPEG)
return tt
}

async function sepia(img) {
  let imageu = await Jimp.read(img);
 let uu = await imageu.sepia().getBufferAsync(Jimp.MIME_JPEG)
return uu
}
