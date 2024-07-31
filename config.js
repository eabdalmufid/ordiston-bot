import { watchFile, unwatchFile } from "fs";
import chalk from "chalk";
import { fileURLToPath } from "url";
import fs from "fs";
import moment from "moment-timezone";

/*⫘⫘⫘⫘ WAKTU ⫘⫘⫘⫘⫘*/
let witah = moment.tz("Asia/Jakarta").format("HH");
let witam = moment.tz("Asia/Jakarta").format("mm");
let witas = moment.tz("Asia/Jakarta").format("ss");
let wib = moment.tz("Asia/Jakarta").format("HH:mm:ss");
let wktuwib = `${witah} H ${witam} M ${witas} S`;

let d = new Date(new Date() + 3600000);
let locale = "id";
// d.getTimeZoneOffset()
// Offset -420 is 18.00
// Offset    0 is  0.00
// Offset  420 is  7.00
let weton = ["Pahing", "Pon", "Wage", "Kliwon", "Legi"][
  Math.floor(d / 84600000) % 5
];
let week = d.toLocaleDateString(locale, { weekday: "long" });
let date = d.toLocaleDateString(locale, {
  day: "numeric",
  month: "long",
  year: "numeric",
});

/*⫘⫘⫘⫘ OWNER NUMBER ⫘⫘⫘⫘⫘*/
global.owner = [
  ["62895411954396"],
  ["62851769520030", "️ owner", true],
];
global.mods = ["62851769520030"];
global.prems = ["62851769520030"];

/*Website*/
global.APIs = {
  amel: "https://melcanz.com",
  bg: "api.botcahx.biz.id",
  dhnjing: "https://dhnjing.xyz",
  dzx: "https://api.dhamzxploit.my.id",
  fdci: "https://api.fdci.se",
  hardianto: "https://hardianto.xyz",
  lolhuman: "https://api.lolhuman.xyz",
  neoxr: "https://api.neoxr.my.id",
  pencarikode: "https://pencarikode.xyz",
  xcdr: "https://splendid-pantsuit-hare.cyclic.app",
  xteam: "https://api.xteam.xyz",
  xyro: "https://api.xyroinee.xyz",
  zeks: "https://api.zeks.xyz",
  zenz: "https://api.zahwazein.xyz",
  btchx: "https://api.botcahx.live",
};

/*⫘⫘⫘⫘ APIKEY ⫘⫘⫘⫘⫘*/
global.APIKeys = {
  "https://api.neoxr.my.id": pickRandom(["5VC9rvNx", "lucycat"]),
  "https://api.lolhuman.xyz": pickRandom(["BrunoSobrino_2", "GataDios", "IchanZX"]),
  "https://api.xteam.xyz": "HIRO",
  "https://api.xyroinee.xyz": "yqiBQF86F4",
  "https://api.zeks.xyz": "apivinz",
  "https://hardianto.xyz": "hardianto",
  "https://melcanz.com": "manHkmst",
  "https://pencarikode.xyz": "pais",
  "https://splendid-pantsuit-hare.cyclic.app": "Lann",
  "https://api.zahwazein.xyz": "zenzkey_90959f9119",
  "https://api.botcahx.live": "Admin",
};

/*Lolhuman*/
global.lolkey = pickRandom(["BrunoSobrino_2", "GataDios", "IchanZX"]); // , "043c5de3b7cd6b1b8f2a0f90", "e1a815979e6adfc071b7eafc", "ed78c137a46873c5b8e5fe3b", "SGWN"
/*OpenAi*/
global.openaikey = "";
/*AmeApi*/
global.ameapikey = "1f98ec7e4842d057d7551722f83e9ae5c59896856aa3f96d406ff8fc9185752062920fadf1df1ea71c332d3f6be2dd6fa62b7ac3d0140e40d86ba0e736135820";
/*XyroineeApi*/
global.xyro = "yqiBQF86F4"

/*
List Key
-Lolhuman-
327a6596e4c4baa20c756132
bukanitucuy14315195
85faf717d0545d14074659ad
ed78c137a46873c5b8e5fe3b
zulfikarbot
SGWN
SadTeams
BrunoSobrino
TheShadowBrokers133

-zahwazein-
LuOlangNgentot
zenzkey_1ec92f71d3bb
zenzkey_90959f9119

-XTEAM-
5bd33b276d41d6b4
NezukoTachibana281207
HIRO

-Neoxr-
5VC9rvNx
*/

/*⫘⫘⫘⫘ NUMBER ⫘⫘⫘⫘⫘*/
global.nomorbot = "6285176952003";
global.nomorown = "62851769520030";
global.namebot = "Ordiston Bot";
global.nameown = "нυмвℓє∂єν";

/*⫘⫘⫘⫘ RANDOM ⫘⫘⫘⫘⫘*/
global.pmenus = pickRandom(["乂", "◈", "⭔", "⳻⳻", "•", "↬", "⭑", "◉", "»", "〆", "々", "✗", "⚜", "⚚", "♪"]);
global.htjava = pickRandom(["乂", "⚜", "⚚", "♛", "⎔", "✦", "⭔", "❅", "✾", "⬟"]);

/*⫘⫘⫘⫘ WATERMARK ⫘⫘⫘⫘⫘*/
global.wm = "Ordiston Bot";
global.wm2 = "꒷︶꒷꒥꒷ ‧₊˚ ꒰ฅ˘օառɛʀ˘ฅ꒱ ‧₊˚꒷︶꒷꒥꒷";
global.wm3 = "⭔ ORDISTON";
global.botdate = `Date :  ${moment.tz("Asia/Jakarta").format("DD/MM/YY")}`;
global.bottime = `𝗧 𝗜 𝗠 𝗘 : ${moment.tz("Asia/Jakarta").format("HH:mm:ss")}`;
global.titlebot = `Time Sever : ${moment.tz("Asia/Jakarta").format("HH:mm:ss")}\nDate Server :  ${moment.tz("Asia/Jakarta").format("DD/MM/YY")}`;

/*⫘⫘⫘⫘ THUMBNAIL ⫘⫘⫘⫘⫘*/
global.giflogo = VideoGalau();
global.fla = pickRandom(ImgLogoDynamic())
global.flaaa = pickRandom(ImgLogoFlam())

/*⫘⫘⫘⫘ LINK ⫘⫘⫘⫘⫘*/
global.sig = "https://www.instagram.com/eabdlmufid";
global.sgh = "https://www.github.com/eabdalmufid";
global.sgc = "https://chat.whatsapp.com/EoHiPCHLvN3JVF0In9jA8N";
global.sdc = "https://www.discord.com/";
global.snh = "https://www.tiktok.com/ordistonofficial";
global.sfb = "https://www.facebook.com/";
global.syt = "https://www.youtube.com/";

/*⫘⫘⫘⫘ NSFW ⫘⫘⫘⫘⫘*/
global.premnsfw = true;

/*⫘⫘⫘⫘ TYPE ⫘⫘⫘⫘⫘*/
global.dpptx = "application/vnd.openxmlformats-officedocument.presentationml.presentation";
global.ddocx = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
global.dxlsx = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
global.dpdf = "application/pdf";
global.drtf = "text/rtf";

/*⫘⫘⫘⫘ FAKE ⫘⫘⫘⫘⫘*/
global.fsizedoc = "99999999999999"; // 10TB
global.fpagedoc = "999"; //Gausah di ganti.

/*⫘⫘⫘⫘ HIASAN ⫘⫘⫘⫘⫘*/
global.dmenut = "ଓ═┅═━–〈"; //top
global.dmenub = "┊•"; //body
global.dmenub2 = "┊"; //body for info cmd on Default menu
global.dmenuf = "┗––––––––––✦"; //footer
global.dashmenu = "┅━━━═┅═❏ *𝘿𝘼𝙎𝙃𝘽𝙊𝘼𝙍𝘿* ❏═┅═━━━┅";
global.htki = "━━━━━▢"; // Hiasan Titile (KIRI)
global.htka = "▢━━━━━"; // Hiasan Title  (KANAN)

/*⫘⫘⫘⫘ THUMBNAIL ⫘⫘⫘⫘⫘*/
global.hwaifu = ImgWaifu();
global.hbeach = ImgCosplay();
global.thumbnailUrl = ImgBoneka();
global.hoppai = ImgCosplay();
global.hloli = ImgCosplay();
global.hyuri = ImgCosplay();
global.hneko = ImgCosplay();
global.hLokun = ImgCosplay();
global.hbunny = ImgCosplay();
global.thumbs = ImgBoneka();
global.thumb = pickRandom(["https://minimalistic-wallpaper.demolab.com/?random", "https://picsum.photos/2560/1600", ImgEstetik()])
global.imagebot = pickRandom(["https://minimalistic-wallpaper.demolab.com/?random", "https://picsum.photos/2560/1600", ImgMountain()])
global.thumbdoc = pickRandom(["https://minimalistic-wallpaper.demolab.com/?random", "https://picsum.photos/2560/1600", ImgEstetik()])
global.logo = pickRandom(["https://minimalistic-wallpaper.demolab.com/?random", "https://picsum.photos/2560/1600", ImgMountain()])

/*⫘⫘⫘⫘ BEGIN ⫘⫘⫘⫘⫘*/
global.ucapan = Pagi();
//global.ephemeral = null;

/*⫘⫘⫘⫘ GLOBAL RANDOM ⫘⫘⫘⫘⫘*/
global.doc = pickRandom([
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/msword",
  "application/pdf",
  "text/rtf",
]);
//global.fakes = Fakes()
global.knimg = pickRandom(["https://minimalistic-wallpaper.demolab.com/?random", "https://picsum.photos/2560/1600", ImgMountain()])

/*⫘⫘⫘⫘ WATERMARK ⫘⫘⫘⫘⫘*/
global.lopr = "🅟"; //LOGO PREMIUM ON MENU.JS
global.lolm = "🅛"; //LOGO FREE ON MENU.JS
global.dashmenu = "┅━━━═┅═❏ *𝘿𝘼𝙎𝙃𝘽𝙊𝘼𝙍𝘿* ❏═┅═━━━┅";
global.cmenut = "❏––––––『"; //top
global.cmenuh = "』––––––"; //header
global.cmenub = "┊⭔"; //body
global.cmenuf = "┗━═┅═━––––––๑\n"; //footer
global.cmenua = "\n⌕ ❙❘❙❙❘❙❚❙❘❙❙❚❙❘❙❘❙❚❙❘❙❙❚❙❘❙❙❘❙❚❙❘ ⌕\n     "; //after
global.emojis = pickRandom(["👑", "🎗", "️🗿", "🕹", "️💡", "🪄", "🎈", "🎊", "🔖", "📍", "❤", "‍🔥", "💤", "💭", "🕚", "💬", "🚩", "🎐", "🍃", "🌿", "🥀", "✨", "⚡"]);
global.packname = `Buat stikermu sendiri disini !\nwww.ordiston.xyz\n\nStiker ini dibuat pada :\n${week}, ${date}\n\nOleh :\nOrdiston Bot`;
global.stickpack = packname;
global.author = "By Afidev";
global.stickauth = author + "\nwa.me/" + nomorbot;
global.multiplier = 69;

/*⫘⫘⫘⫘ PESAN ⫘⫘⫘⫘⫘*/
global.eror = "_💤 Ada yang eror nih!_";
global.wait = "_🕚 Mohon tunggu, dalam proses!_";
global.render = "_📍 Rendering!_";
global.webs = "https://ordiston.xyz";
global.gcwangsaf = "https://chat.whatsapp.com/EoHiPCHLvN3JVF0In9jA8N";

/*⫘⫘⫘⫘ DONASI ⫘⫘⫘⫘⫘*/
global.saweria = "https://saweria.com/eabdalmufid";
global.dana = "089509952003";
global.pulsa = "089509952003";
global.qris = "https://bit.ly/QRISPAY";
global.trakteer = "https://trakteer.id/";
global.paypal = "-";
global.gopay = "-";
global.pdana = "089509952003";
global.povo = "-";
global.pgopay = "-";
global.ppulsa = "089509952003";
global.ppulsa2 = "089509952003";
global.psaweria = "https://saweria.com/eabdalmufid";

/*⫘⫘⫘⫘ Fake adReplyS ⫘⫘⫘⫘⫘*/
global.adReplyS = {
  fileLength: SizeDoc(),
  seconds: SizeDoc(),
  contextInfo: {
    forwardingScore: SizeDoc(),
    externalAdReply: {
      //showAdAttribution: true,
      title: Sapa() + Pagi(),
      body: author,
      mediaUrl: sgc,
      description: "ᴏʀᴅɪꜱᴛᴏɴ",
      previewType: "PHOTO",
      thumbnail: await fs.readFileSync("./thumbnail.jpg"),
      sourceUrl: "https://github.com/eabdalmufid",
    },
  },
};
/*⫘⫘⫘⫘ Fake adReply ⫘⫘⫘⫘⫘*/
global.adReply = {
  fileLength: SizeDoc(),
  seconds: SizeDoc(),
  contextInfo: {
    forwardingScore: SizeDoc(),
    externalAdReply: {
      body: author,
      containsAutoReply: true,
      mediaType: 1,
      mediaUrl: sgc,
      renderLargerThumbnail: true,
      //showAdAttribution: true,
      sourceId: "ᴏʀᴅɪꜱᴛᴏɴ",
      sourceType: "PDF",
      previewType: "PDF",
      sourceUrl: sgc,
      thumbnail: await fs.readFileSync("./thumbnail.jpg"),
      thumbnailUrl: logo,
      title: Sapa() + Pagi(),
    },
  },
};
/*⫘⫘⫘⫘ Fake IG ⫘⫘⫘⫘⫘*/
global.fakeig = {
  contextInfo: {
    externalAdReply: {
      //showAdAttribution: true,
      mediaUrl: sig,
      mediaType: "VIDEO",
      description: "Follow: " + sig,
      title: Sapa() + Pagi(),
      body: author,
      thumbnailUrl: logo,
      sourceUrl: sgc,
    },
  },
};
/*⫘⫘⫘⫘ Fake FB ⫘⫘⫘⫘⫘*/
global.fakefb = {
  contextInfo: {
    externalAdReply: {
      //showAdAttribution: true,
      mediaUrl: sfb,
      mediaType: "VIDEO",
      description: "Follow: " + sig,
      title: Sapa() + Pagi(),
      body: author,
      thumbnailUrl: logo,
      sourceUrl: sgc,
    },
  },
};
/*⫘⫘⫘⫘ Fake TT ⫘⫘⫘⫘⫘*/
global.faketik = {
  contextInfo: {
    externalAdReply: {
      //showAdAttribution: true,
      mediaUrl: snh,
      mediaType: "VIDEO",
      description: "Follow: " + sig,
      title: Sapa() + Pagi(),
      body: author,
      thumbnailUrl: logo,
      sourceUrl: snh,
    },
  },
};
/*⫘⫘⫘⫘ Fake YT ⫘⫘⫘⫘⫘*/
global.fakeyt = {
  contextInfo: {
    externalAdReply: {
      //showAdAttribution: true,
      mediaUrl: syt,
      mediaType: "VIDEO",
      description: "Follow: " + sig,
      title: Sapa() + Pagi(),
      body: author,
      thumbnailUrl: logo,
      sourceUrl: syt,
    },
  },
};

/*⫘⫘⫘⫘ EMOJI ⫘⫘⫘⫘⫘*/
global.rpg = {
  emoticon(string) {
    string = string.toLowerCase();
    let emot = {
      Fox: "🦊",
      agility: "🤸‍♂️",
      anggur: "🍇",
      apel: "🍎",
      aqua: "🥤",
      arc: "🏹",
      armor: "🥼",
      bank: "🏦",
      batu: "🧱",
      berlian: "💎",
      bibitanggur: "🍇",
      bibitapel: "🍎",
      bibitjeruk: "🍊",
      bibitmangga: "🥭",
      bibitpisang: "🍌",
      botol: "🍾",
      bow: "🏹",
      bull: "🐃",
      cat: "🐈",
      centaur: "🎠",
      chicken: "🐓",
      coal: "⚱️",
      common: "📦",
      cow: "🐄",
      crystal: "🔮",
      darkcrystal: "♠️",
      diamond: "💎",
      dog: "🐕",
      dragon: "🐉",
      eleksirb: "🧪",
      elephant: "🐘",
      emasbatang: "🪙",
      emasbiasa: "🥇",
      emerald: "💚",
      exp: "✉️",
      fishingrod: "🎣",
      foodpet: "🍱",
      fox: "🦊",
      gardenboc: "🗳️",
      gardenboxs: "📦",
      gems: "🍀",
      giraffe: "🦒",
      gold: "👑",
      griffin: "🦒",
      health: "❤️",
      healtmonster: "❤‍🔥",
      horse: "🐎",
      intelligence: "🧠",
      iron: "⛓️",
      jeruk: "🍊",
      kaleng: "🥫",
      kardus: "📦",
      kayu: "🪵",
      ketake: "💿",
      keygold: "🔑",
      keyiron: "🗝️",
      knife: "🔪",
      koinexpg: "👛",
      kucing: "🐈",
      kuda: "🐎",
      kyubi: "🦊",
      legendary: "🗃️",
      level: "🧬",
      limit: "🌌",
      lion: "🦁",
      magicwand: "⚕️",
      makanancentaur: "🥗",
      makanangriffin: "🥙",
      makanankyubi: "🍗",
      makanannaga: "🍖",
      makananpet: "🥩",
      makananphonix: "🧀",
      mana: "🪄",
      mangga: "🥭",
      money: "💵",
      mythic: "🗳️",
      mythic: "🪄",
      naga: "🐉",
      pancingan: "🎣",
      pet: "🎁",
      petFood: "🍖",
      phonix: "🦅",
      pickaxe: "⛏️",
      pisang: "🍌",
      pointxp: "📧",
      potion: "🥤",
      rock: "🪨",
      rubah: "🦊",
      sampah: "🗑️",
      serigala: "🐺",
      snake: "🐍",
      stamina: "⚡",
      strength: "🦹‍♀️",
      string: "🕸️",
      superior: "💼",
      sword: "⚔️",
      tiger: "🐅",
      tiketcoin: "🎟️",
      trash: "🗑",
      umpan: "🪱",
      uncommon: "🎁",
      upgrader: "🧰",
      wood: "🪵",
    };
    let results = Object.keys(emot).map((v) => [v, new RegExp(v, "gi")]).filter((v) => v[1].test(string));
    if (!results.length) return "";
    else return emot[results[0][0]];
  },
};

let file = fileURLToPath(import.meta.url);
watchFile(file, () => {
  unwatchFile(file);
  console.log(chalk.redBright("Update config.js"));
  import(`${file}?update=${Date.now()}`);
});

/*⫘⫘⫘⫘ SELAMAT PAGI ⫘⫘⫘⫘⫘*/
function Pagi() {
  let waktunya = moment.tz("Asia/Jakarta").format("HH");
  let ucapin = "Selamat malam 🌌";
  if (waktunya >= 1) {
    ucapin = "Selamat Dini hari 🌌";
  }
  if (waktunya >= 4) {
    ucapin = "Selamat pagi ⛅";
  }
  if (waktunya > 10) {
    ucapin = "Selamat siang 🌅";
  }
  if (waktunya >= 15) {
    ucapin = "Selamat sore 🌇";
  }
  if (waktunya >= 18) {
    ucapin = "Selamat malam 🌃";
  }
  if (waktunya >= 24) {
    ucapin = "Selamat Begadang 🗿";
  }
  return ucapin;
}

/*⫘⫘⫘⫘ RANDOMIZER ⫘⫘⫘⫘⫘*/
function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)];
}

/* Img Array */
function ImgCosplay() {
  let ArrImg = [
    "https://i.pinimg.com/originals/13/8f/a9/138fa9fab411166bb8c5523bf710ff42.jpg",
    "https://i.pinimg.com/564x/c3/11/9a/c3119aef29726b78b9f0509aa40ccb3b.jpg",
    "https://i.pinimg.com/originals/18/05/40/18054035c2adc989580043b4391e20af.jpg",
    "https://i.pinimg.com/736x/7c/0a/4b/7c0a4bd43596226b6311b8aae2b02408.jpg",
    "https://i.pinimg.com/originals/3d/fe/1d/3dfe1d00cff5b517d4eb56e5297abae9.jpg",
    "https://i.pinimg.com/originals/77/dd/ef/77ddefdd397d0730db97d848781e4df7.jpg",
    "https://i.pinimg.com/736x/43/d9/7d/43d97d69e6552e80da086cd91557c826.jpg",
    "https://i.pinimg.com/originals/e5/f2/86/e5f286ded660f38e8f4db73c8dfafba8.jpg",
    "https://i.pinimg.com/474x/9f/6f/71/9f6f7189691c533cd88ef656ce23bcbb.jpg",
    "https://i.pinimg.com/736x/0d/b8/44/0db844fa29b995dd699bfb9172fad779.jpg",
    "https://i.pinimg.com/736x/41/c3/49/41c349749124411f4b4c0b928eb46207.jpg",
    "https://i.pinimg.com/originals/c6/f7/bf/c6f7bfb44f0c964104ca36c8ee388f71.jpg",
    "https://i.pinimg.com/736x/1e/c5/c3/1ec5c36b3dfa5f1bef5847def89f8df6.jpg",
    "https://i.pinimg.com/originals/76/b6/1a/76b61aebdbc05551c9d8714014d7a30d.jpg",
    "https://i.pinimg.com/originals/3a/3e/fc/3a3efc8f03eb6122b0e04841f4177c2c.jpg",
    "https://i.pinimg.com/originals/77/ae/d7/77aed75e4e9f6bf317f8ca9e872d172a.jpg",
    "https://i.pinimg.com/originals/0d/d5/02/0dd5028b7f3e2e660b78aadb5ee1ecee.jpg",
    "https://i.pinimg.com/474x/9b/b2/d7/9bb2d7e9ca23a61c49c3a9428d6ccb3e.jpg",
    "https://i.pinimg.com/236x/c8/23/40/c82340db05d9ef61411a9d5837eeb2a3.jpg",
    "https://i.pinimg.com/736x/3c/2a/6b/3c2a6b131b6d1377ca31b1cee9eb5e5d.jpg",
    "https://i.pinimg.com/originals/cf/3c/2b/cf3c2bf2ce5ae2555dda6cadf11a67a7.jpg",
    "https://i.pinimg.com/236x/c3/16/e5/c316e5eb1367be33993d2266cc839062.jpg",
    "https://i.pinimg.com/originals/2c/8f/4b/2c8f4bf86a5b05df761cfd0244d37b4d.jpg",
    "https://i.pinimg.com/736x/b4/83/04/b48304a92e85c4eba37b82fdd5d08434.jpg",
    "https://i.pinimg.com/originals/75/b3/99/75b399a50c4ac54e49261dd6e0f81a5b.jpg",
    "https://i.pinimg.com/originals/dd/02/c5/dd02c512af2a70a9840ffab06eb74f4e.jpg",
    "https://i.pinimg.com/originals/53/0a/6d/530a6d47fa85f639587e0c7b54c4457d.jpg",
    "https://i.pinimg.com/originals/1c/eb/aa/1cebaa84d93f590f15933e78efc94f4b.jpg",
    "https://i.pinimg.com/736x/de/e9/68/dee968195b668d1bfd021cedc79cd5ab.jpg",
    "https://i.pinimg.com/originals/20/d9/57/20d957c9ad8d0691768a8968152a311d.jpg",
    "https://i.pinimg.com/originals/7a/f7/7e/7af77ef00a5057a98aedbf86450317f9.jpg",
    "https://i.pinimg.com/originals/25/41/a9/2541a9472e1378998cf5ac0dfcdc82f5.jpg",
    "https://i.pinimg.com/236x/9a/0c/fb/9a0cfbdd161d09e8c200ee5cebbcaac1--male-cosplay-anime-cosplay.jpg",
    "https://i.pinimg.com/564x/79/56/be/7956be00b52b5484c161a50a2ed0e566.jpg",
    "https://i.pinimg.com/236x/21/63/f9/2163f9e0d59f7d10ba237131bc1e6162--cool-cosplay-anime-cosplay.jpg",
    "https://i.pinimg.com/originals/ea/d1/0d/ead10da121a27b4d1801def2505295a5.png",
    "https://i.pinimg.com/564x/6e/15/2b/6e152b90f638d955371cffe615f685fc.jpg",
    "https://i.pinimg.com/originals/25/ef/0d/25ef0d8b101b555d34fc654d3bc8453d.jpg",
    "https://i.pinimg.com/originals/37/5c/55/375c55403d41d13316e6479f7ccbcc8c.jpg",
    "https://i.pinimg.com/474x/7c/1a/0c/7c1a0cf9af72ee41c408e40f36eafd33.jpg",
    "https://i.pinimg.com/originals/cc/b5/a8/ccb5a867547d92b7c9e399e4d71ae2c8.png",
    "https://i.pinimg.com/474x/b4/20/e5/b420e54c70e5ce1f112d400e686a0a0f.jpg",
    "https://i.pinimg.com/originals/a0/6f/c5/a06fc51bffd216199727461115ca6dd0.png",
    "https://i.pinimg.com/originals/47/10/41/471041b7a2d7110f826b4fffda87846a.jpg",
    "https://i.pinimg.com/originals/a4/18/92/a418925f40047be5f00a0c0d3c5dfcb9.jpg",
    "https://i.pinimg.com/474x/6c/a5/d8/6ca5d8d601f19d6f21d6d649e8914489--male-cosplay-cosplay-anime.jpg",
    "https://i.pinimg.com/originals/79/bf/02/79bf0236aaff04bdf052673bfa4d4581.jpg",
    "https://i.pinimg.com/originals/c9/ae/4d/c9ae4d450bbbf2c116d40fcb6644c113.jpg",
    "https://i.pinimg.com/564x/b5/12/46/b5124604bd0cb22c7c384972cb6703af.jpg",
    "https://i.pinimg.com/originals/4f/a4/e5/4fa4e565931db75327a69bd40d399bce.jpg",
    "https://i.pinimg.com/originals/b7/fc/69/b7fc69457cb0bf3fa13b2eb6f66acdc7.jpg",
    "https://i.pinimg.com/originals/98/25/96/98259611cf99d8d94e10477210bfe168.jpg",
    "https://i.pinimg.com/originals/b9/c9/dd/b9c9dd7caa5b471540cde0cab95f0282.jpg",
    "https://i.pinimg.com/736x/82/c9/bd/82c9bd503fbbd8ed8b9b4f385b2ff0c2.jpg",
    "https://i.pinimg.com/originals/f0/36/64/f0366478ffda51f117c87d70cc2611f7.jpg",
    "https://i.pinimg.com/originals/84/d9/71/84d9715428eefcd3224a2d43d0a55328.jpg",
    "https://i.pinimg.com/736x/90/aa/7c/90aa7c57a6ce841f63df0bc25717b6ca.jpg",
    "https://i.pinimg.com/736x/1d/73/b3/1d73b3a0fd9771d5a06e0b1c082b517b.jpg",
    "http://fc02.deviantart.net/fs71/f/2012/053/4/b/4b876ef7cfbeb11f7d8209c2a9764df2-d4qnbzr.jpg",
    "https://i.pinimg.com/236x/69/d7/b8/69d7b8a549b4aa250a63a70301c336b9.jpg",
    "https://i.pinimg.com/originals/80/e5/3b/80e53b084bee9286046c039a32f6dbcd.jpg",
    "https://i.pinimg.com/originals/47/6d/e3/476de320a1b37f67e13d890def8c63fa.jpg",
    "https://i.pinimg.com/originals/1b/2c/21/1b2c216600ddb39eeec825b690bd9d63.jpg",
    "https://i.pinimg.com/originals/ce/aa/52/ceaa528f7bb686b532fa04489ba324bf.jpg",
    "https://i.pinimg.com/736x/79/d8/09/79d8090c156b9bafdedf53da7a5b39d1.jpg",
    "https://i.pinimg.com/originals/1b/90/74/1b90744f3331c8e1b84383319ce2ff8d.jpg",
    "https://i.pinimg.com/736x/81/2a/3f/812a3f8095fccc3a2984a1c91b648a36.jpg",
    "https://i.pinimg.com/originals/b0/d4/65/b0d46575c705adf77d698e33730396c4.jpg",
    "https://i.pinimg.com/736x/99/2c/d3/992cd30f0161b3f158267074a3dd96de.jpg",
    "https://i.pinimg.com/originals/90/41/60/904160fdf5387835c654d61bde2d5812.png",
    "https://i.pinimg.com/564x/56/ab/81/56ab81fd3db3fca26c83df394de4d7ed.jpg",
    "https://i.pinimg.com/originals/74/b6/7b/74b67bae3b11329e471b5b859fc9453e.jpg",
    "https://i.pinimg.com/736x/4e/5c/1a/4e5c1a025aca01393cd6203081620cbe.jpg",
    "https://i.pinimg.com/originals/8a/0f/d0/8a0fd013c39621aa2d7214d79ad112f7.jpg",
    "https://i.pinimg.com/564x/9b/b6/a8/9bb6a81dcc6347e98fcef0da01a93172.jpg",
    "https://i.pinimg.com/736x/19/ae/b2/19aeb2ac7500ded0cf50b7f83f60fb86.jpg",
    "https://i.pinimg.com/736x/78/65/92/7865925fa1addd6679a9ea4b2810591c.jpg",
    "https://i.pinimg.com/550x/5a/5c/f3/5a5cf3e562322f01725cc7c2a07cd69b.jpg",
    "https://i.pinimg.com/originals/9c/af/a7/9cafa7fc58286d10e14b73141ff8f5f3.jpg",
    "https://i.pinimg.com/236x/6d/82/07/6d8207caebd7ff644d5835eb22c5bfd2--gintoki-cosplay-cosplay-anime.jpg",
    "https://i.pinimg.com/originals/57/53/00/575300de7503a03fc8191f4b5bbc3d4b.jpg",
    "https://i.pinimg.com/originals/b0/ed/af/b0edafadc4adee5f16cc8bf30b11aebc.jpg",
    "https://i.pinimg.com/originals/8b/ea/61/8bea6183a2fe0cd494175b46965b36da.jpg",
    "https://i.pinimg.com/originals/ff/22/d1/ff22d1d94308bfbeed29bbb1a3972fd2.jpg",
    "https://i.pinimg.com/736x/d0/51/54/d0515487efb61dda9ec3a47239b9e41d.jpg",
    "https://i.pinimg.com/736x/23/78/2a/23782abd62d91b86b83dfdfbac837249.jpg",
    "https://i.pinimg.com/originals/6f/ab/53/6fab53f990a4044d2c9a548eb0754812.jpg",
    "https://i.pinimg.com/originals/dc/8d/11/dc8d1169aab1b6869ccba38502b6b1e7.jpg",
    "https://i.pinimg.com/originals/6c/92/00/6c92009dec098e54f7eb7c1b3e64e5b4.jpg",
    "https://i.pinimg.com/originals/41/7c/02/417c02f44d480e803362142d40e6772b.jpg",
    "https://i.pinimg.com/474x/04/50/10/0450104aa0731202db113fc5cd8c0d12.jpg",
    "https://i.pinimg.com/736x/46/2d/e3/462de328cf3cc69f5b10556ef30579e7.jpg",
    "https://i.pinimg.com/originals/47/3e/b5/473eb575b2f95ce5906bdad0e5b593b7.jpg",
    "https://i.pinimg.com/originals/26/8d/5e/268d5e20a747afea743b9a0cb96cc6de.jpg",
    "https://i.pinimg.com/736x/bc/a3/80/bca380011a5a682a9e7766c1d7c2db82.jpg",
    "https://i.pinimg.com/originals/71/2e/ac/712eacb25c094afd579c04d85ca7f9e0.jpg",
    "https://i.pinimg.com/originals/fc/c5/10/fcc5101e54e559952181e0bab0b1420e.jpg",
    "https://i.pinimg.com/originals/89/55/3d/89553d3b75d8d9484ffc29aba67c1fed.jpg",
    "https://i.pinimg.com/564x/c0/55/11/c05511492dcb02d6caa10e79df009d36.jpg",
    "https://i.pinimg.com/736x/cb/7e/e9/cb7ee99c3cdf99a0451da682ea4ac8fe.jpg",
  ];
  return ArrImg;
}

/* Img Array */
function ImgMountain() {
  let ResNo = pickRandom([
    "https://i.pinimg.com/736x/aa/5d/6b/aa5d6b2c0cb3e132256d0a34590e235e.jpg",
    "https://i.pinimg.com/originals/ec/11/7a/ec117a2614aad453a8b8f1a7d00cb7ce.jpg",
    "https://i.pinimg.com/564x/f3/34/2d/f3342d4cb66034549bb7d0562cbc3633.jpg",
    "https://i.pinimg.com/736x/a6/60/53/a66053fe7a3b721ba8f7c93b879c5862.jpg",
    "https://i.pinimg.com/originals/3b/f9/3d/3bf93d7b3307825f4f0dfd8e2ec5e575.jpg",
    "https://i.pinimg.com/564x/ee/ba/21/eeba217aa08f2468a88c905a90c97383.jpg",
    "https://i.pinimg.com/originals/ec/cf/02/eccf02eea6ade8eafcb526707ff1ddd7.jpg",
    "https://i.pinimg.com/originals/99/c1/e2/99c1e280602e10f3ed910201d9f99f15.jpg",
    "https://i.pinimg.com/564x/21/a7/0f/21a70f9a75224b8c0d9559dd85a4246a.jpg",
    "https://i.pinimg.com/originals/96/98/4a/96984acecb058f36eeaaac938f4ddb92.jpg",
    "https://i.pinimg.com/564x/61/e0/3e/61e03e5563fdb013713a6b7e4a0c6299.jpg",
    "https://i.pinimg.com/564x/de/ae/68/deae68529e294c158ef6b98a9a6fb4e8.jpg",
    "https://i.pinimg.com/originals/c2/47/e9/c247e913a0214313045a8a5c39f8522b.jpg",
    "https://i.pinimg.com/736x/9c/f0/5b/9cf05b78ccba55bcbd2a16c5eef98a9a.jpg",
    "https://i.pinimg.com/originals/1e/78/b3/1e78b322fbac6b0eb21568ae0df14899.jpg",
    "https://i.pinimg.com/564x/cc/53/b9/cc53b9978f0683f1fb2d3436d1e04cd9.jpg",
    "https://i.pinimg.com/736x/8f/4b/e7/8f4be75d7795909bb8d4165530ad104e.jpg",
    "https://i.pinimg.com/564x/35/66/1a/35661a62490f0f974f334bfe3fbefd08.jpg",
    "https://i.pinimg.com/736x/3b/b9/25/3bb9254eb8cd02a856a3f2e87941f3bc.jpg",
    "https://i.pinimg.com/736x/b5/86/84/b58684e8cbedd5599be8a35cfbef88c4.jpg",
    "https://i.pinimg.com/originals/3f/22/11/3f221120c10a57db349a2b5804954ecc.jpg",
    "https://i.pinimg.com/originals/66/f3/d5/66f3d5260cbb00a862ce6c3b6c88e0f3.jpg",
    "https://i.pinimg.com/originals/7d/b4/43/7db443580f995faaae6c570cd6292c0e.jpg",
    "https://i.pinimg.com/originals/c3/8a/c8/c38ac8e163d09254f86afa331da35693.jpg",
    "https://i.pinimg.com/originals/1d/3f/43/1d3f4336e6d4d0b3bf9b1d42948db42c.jpg",
    "https://i.pinimg.com/originals/f2/5b/99/f25b991ddcb29cb1618a90d9a3f6e195.jpg",
    "https://i.pinimg.com/474x/48/fe/d2/48fed2d57c5cc400e8b08624057e5962.jpg",
    "https://i.pinimg.com/originals/b8/77/e3/b877e31fddd858cfb93a4665ea85f2b2.jpg",
    "https://i.pinimg.com/originals/9c/f2/22/9cf222c76b02487c040b2ed7e67772e6.jpg",
    "https://i.pinimg.com/originals/7d/e4/28/7de428e023d0885d569085e4038366a4.jpg",
    "https://i.pinimg.com/originals/54/98/6f/54986f0c8be26b1e9d267eca83e6464e.jpg",
    "https://i.pinimg.com/564x/80/71/fc/8071fc8df3486bd590031c377991d326.jpg",
    "https://i.pinimg.com/564x/e2/09/ec/e209ec33eca8f41b5efb997c2c10d789.jpg",
    "https://i.pinimg.com/originals/eb/c2/8e/ebc28e2de0281a39564ce13785427bba.jpg",
    "https://i.pinimg.com/736x/0a/ef/89/0aef89e26c85955d1920cc7cb49f741d.jpg",
    "https://i.pinimg.com/564x/87/23/0b/87230b5d1d976da44ad807a24c907e4d.jpg",
    "https://i.pinimg.com/originals/93/e5/92/93e592d3f3c7dbe2116ad2aff3ea60ac.jpg",
    "https://i.pinimg.com/originals/21/d3/51/21d3519583bc875eab677721609cebda.jpg",
    "https://i.pinimg.com/originals/f3/9c/f9/f39cf9e62b0d1e8466c19da3df177187.jpg",
    "https://i.pinimg.com/originals/ce/b3/b1/ceb3b1a3cc3dc8196b552954ced99120.jpg",
    "https://i.pinimg.com/originals/7b/f7/e9/7bf7e9f97183da57b8484377b425d836.jpg",
    "https://i.pinimg.com/originals/49/da/42/49da42d7674723cadb5cb53d891b786f.jpg",
    "https://i.pinimg.com/originals/b0/62/ca/b062ca884ee47ace132438f3c59e528c.jpg",
    "https://i.pinimg.com/originals/2e/cb/b9/2ecbb9815dcb949394e275f3f2344f21.jpg",
    "https://i.pinimg.com/originals/1b/e7/3d/1be73d6e2f0a04b9ab2a17be1b4ca3db.jpg",
    "https://i.pinimg.com/474x/88/5a/63/885a63d92ca0e0bb7e6a1a6468eeec34.jpg",
    "https://i.pinimg.com/474x/2d/53/31/2d53311f6daf9b34da29bf1b5cbd94dc.jpg",
    "https://i.pinimg.com/originals/55/c3/00/55c30083a1ab2a4eb6d6a8eefb70d378.jpg",
    "https://i.pinimg.com/originals/62/ab/ff/62abffe77a2a3d761c413715163f1def.jpg",
    "http://images8.alphacoders.com/465/465337.jpg",
    "https://i.pinimg.com/736x/cf/6d/3c/cf6d3c9d4b5a4619cc9e811538cffa1f.jpg",
    "https://i.pinimg.com/originals/b9/a2/f5/b9a2f5008086737dfd83acd224384921.jpg",
    "https://i.pinimg.com/originals/da/fd/ac/dafdaca428707259bfb53f8231e20128.jpg",
    "https://i.pinimg.com/736x/d5/44/35/d54435546190f59cbce81e2de4fcdce2.jpg",
    "https://i.pinimg.com/236x/19/6d/18/196d18bcde7d5edb043b3f42193b1b7e.jpg",
    "https://i.pinimg.com/originals/a6/5d/71/a65d715e2ea90674a3da47b18ea3f76d.jpg",
    "https://i.pinimg.com/originals/cb/7c/06/cb7c0603ecca2769ea084fe1d54f0efb.jpg",
    "https://i.pinimg.com/originals/cb/e7/75/cbe77587ced910e685b103dbe9cee22d.jpg",
    "https://i.pinimg.com/736x/97/48/c8/9748c89901310c7303325daacaf221b7.jpg",
    "https://i.pinimg.com/originals/65/85/9d/65859d99b5ea7773b03ba439e264758e.jpg",
    "https://i.pinimg.com/736x/e5/39/b2/e539b2428bc825f0cf34ce940abe4b32.jpg",
    "https://i.pinimg.com/736x/e6/41/60/e641608ddb553ab101a3c0f876b5327b.jpg",
    "https://i.pinimg.com/564x/3d/74/63/3d74639d40ae75295fd25719ce35b886.jpg",
    "https://i.pinimg.com/736x/6d/3d/62/6d3d626e924965f0c981c1e13506fb95.jpg",
    "https://i.pinimg.com/736x/e8/1e/69/e81e691422e1d329d2d226da9e2c0081.jpg",
    "https://i.pinimg.com/originals/1c/63/69/1c6369449ac5f6dafa874f2ba764e1a9.jpg",
    "https://i.pinimg.com/originals/84/66/b4/8466b4910a07e734508bcc52c8d357c4.jpg",
    "https://i.pinimg.com/originals/02/2d/69/022d69fbcb99520637556272fdde241d.jpg",
    "https://i.pinimg.com/736x/4a/51/cc/4a51ccad1c975fce7d18d8cb24aa5954.jpg",
    "https://i.pinimg.com/736x/03/ca/74/03ca743d22fab4d1c7d6732d0e2b15a5.jpg",
    "https://i.pinimg.com/736x/5f/cb/19/5fcb190ecc4fdb0ecb7e54060924e453.jpg",
    "https://i.pinimg.com/originals/8c/6a/67/8c6a67b9a1e4db6b5a6a82000104633f.jpg",
    "https://i.pinimg.com/originals/2e/62/68/2e626897112f2cc1d2b0835d8909afa8.jpg",
    "https://i.pinimg.com/originals/df/b4/67/dfb467128bb4644031104dac0608621c.jpg",
    "https://i.pinimg.com/736x/04/e1/7f/04e17f990ebfd79b42eb12c361d8a575--scenery-wallpaper-mountain-wallpaper.jpg",
    "https://i.pinimg.com/originals/22/fc/e8/22fce8c13e9a69263f3cd99c4b6b4e1e.jpg",
    "https://i.pinimg.com/originals/61/3e/53/613e53cc12574047390b3092424c19bb.jpg",
    "https://i.pinimg.com/originals/58/73/9a/58739ac63a86a89c81d5ae3f091ae3db.png",
    "https://i.pinimg.com/736x/e3/13/a0/e313a08e5b0455b1d2b5f345b2cdb97f.jpg",
    "https://i.pinimg.com/736x/32/2f/58/322f58c9ddd595ebfb7b2c2a3c587917.jpg",
    "https://i.pinimg.com/736x/82/4c/75/824c75d5d8baddac1e3ab99a48b77f36.jpg",
    "https://i.pinimg.com/736x/46/ad/cd/46adcdf3759f47ba7a68870d7194a88f--iphone--wallpaper-inline.jpg",
    "https://i.pinimg.com/originals/3f/93/0d/3f930d8a3dbe2c35ba74ee5a9331e4be.jpg",
    "https://i.pinimg.com/originals/e4/43/80/e4438039732d455a68f9b5e4250d6fb6.jpg",
    "https://i.pinimg.com/564x/dd/92/e9/dd92e943701fadf503fec70e00442783.jpg",
    "https://i.pinimg.com/736x/7e/3b/b7/7e3bb74bae008f000776788a05572180.jpg",
    "https://i.pinimg.com/736x/f9/f7/71/f9f7715648cecfe9ed11ec45be79f468.jpg",
    "https://i.pinimg.com/originals/f3/f6/c7/f3f6c704fc6acb2bd9e284de51e713c4.jpg",
    "https://i.pinimg.com/originals/eb/2a/ec/eb2aec5af95be9dcf884b4872c6f4a95.jpg",
    "https://i.pinimg.com/originals/1d/16/fd/1d16fd2a0323fa59fc71bf3247a86e4f.jpg",
    "https://i.pinimg.com/originals/fd/78/6e/fd786ecc8e2636581af7b5c3fa913179.jpg",
    "https://i.pinimg.com/474x/03/ed/a6/03eda666f4d6fe3fead56b4fb5eeac27.jpg",
    "https://i.pinimg.com/736x/be/52/3f/be523fd1853576e6aeb97d9aa5b6f6da--nature-wallpaper-hd-wallpaper.jpg",
    "https://i.pinimg.com/736x/42/2c/92/422c92ec50721fd5dd7d399085595be3.jpg",
    "https://i.pinimg.com/originals/b7/79/46/b7794614b3cbd9379957c32d681eb98d.jpg",
    "https://i.pinimg.com/originals/70/e8/c0/70e8c0e5576bcb7f6cad93df41e77fc2.jpg",
    "https://i.pinimg.com/originals/9a/c1/9d/9ac19dd1d82ce23fa7839251bab7d7d5.jpg",
    "https://i.pinimg.com/originals/ae/db/4c/aedb4c77e9946e9e7127ab330cc7efb4.jpg",
    "https://i.pinimg.com/originals/5c/bf/ca/5cbfca02940248e6617eea9b31911cbf.jpg",
  ]);
  return ResNo;
}

/* Img Dynamic */
function ImgLogoDynamic() {
  let Dynamic = [
    "https://dynamic.brandcrowd.com/asset/logo/04ca85c5-a4c1-4582-8296-7fb8cbdf7df1/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/063a3d53-d7bb-4abb-8b20-3e45ae7c61ac/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/065b4535-d123-4261-accb-2f21e3eac3cf/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/09699c93-f687-4c58-b6dc-cb8010de7df9/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/097b9969-5019-433a-9a3f-d2e097b50e99/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/0c963355-e735-4cdd-bec8-1373ba2a222e/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/0cd45dda-e1e6-46bc-9f0d-b49a5d3c3667/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/10cd8160-2b8d-41c5-87cc-f683a853d5d9/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/163db786-9e2a-494a-a996-de565ae52f83/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/1e47fc81-0c56-45d5-aa5e-07006260dfbc/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/1fd728fb-fdb3-4407-a7da-fe55bfcb5fb0/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/236a12ee-2b79-4b58-b9e4-5536f5e93db7/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/2648d66c-fec5-488f-9626-06991ca917e0/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/362270db-6933-4ccc-8c11-25b2fe97f023/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/4a0312ef-6f47-421d-9d10-354c27de8e0f/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/50dd554f-ffed-4496-b770-870fef2aefe5/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/5ed1f95d-736f-4fe3-9aec-d0a8875dee17/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/6458e177-55ec-4b2d-8be7-4094431378ad/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/672fc6e7-e445-47e3-9391-2e1d1452960a/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/7229c0d6-cc4f-4e47-87b2-3b01285f502d/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/73113e56-8ac2-484e-9272-06759b7d51e2/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/7429f9b9-562f-439b-86cd-81f04d76d883/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/746604d3-8da9-4488-8fa9-bf301d62ea0e/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/867bea51-793c-4b09-b13f-44c9053b6754/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/882f41c2-98ee-43f2-bf07-f033cf1c3320/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/8a2d089b-7b87-4979-906e-7731b594bd4b/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/8bb23d1a-7fb2-4f5d-ba6c-2a9bd13cc673/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/8dcc7e92-c12c-40df-8c8b-9f9db93b11a0/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/8f825f13-dadf-442c-b9e5-a1daa03611c4/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/8ffdc28c-ea27-4b0c-89c3-3f9a9b40e5fd/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/912b6462-49d3-435a-959e-5c5f3254d6c4/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/924d12da-4a2b-46b3-82cd-bc9b38a519d0/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/9459965a-f378-430a-8cb9-62778fec5713/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/9608708e-7907-4bae-892c-87964aee0454/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/963fcb8b-1ba3-46f1-82bd-8e92a5a024d1/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/99c6feef-cee4-47b3-afc7-1f192e7f48f4/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/a075034f-0363-4af4-877f-aba47a7c059d/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/a428ed89-5ed1-4b1d-b095-2ee98ae54b40/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/afa0be93-d4ae-46d5-b741-64bd3b4b6148/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/b0fb81f5-59a4-4197-947f-26037441ea2f/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/b1826077-0a6f-403d-939e-b445c334c470/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/b3581ffd-a127-465b-b880-bd3770b85aad/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/b5be66f6-a6a6-42dc-ab67-de8f80e96291/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/b5e150af-101d-4e96-9518-dff66548dc31/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/b8b4fc21-d1b6-4ee1-a6f3-4410a49e123a/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/b95516e4-645d-4249-b81b-b9ca65bd2087/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/b97103b8-3b7c-4f1d-8c91-451c11e8cde3/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/bbf8e7fe-13c2-420c-bb2c-9c059744d599/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/bd9069cc-408d-4f00-90b4-9d6c96bc0b3d/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/be638691-3065-45cb-b90c-263945cd0177/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/c054d202-df4b-466d-8477-2b8690030ce5/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/c1e008df-5207-463e-a6a7-a823174d0bda/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/cc9a22ce-f65c-40ff-9eac-43c26817f44a/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/d588330f-b11c-4482-baff-49323323a8c0/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/e32a0e7e-df48-4b33-bccf-1f74d395d322/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/ee1930f1-09a8-4d5e-bbe9-e43547bb7f64/logo?v=4&text=",
    "https://dynamic.brandcrowd.com/asset/logo/fde5293a-c69b-4d77-9ec8-f3d6797d2b15/logo?v=4&text="
  ]
  return Dynamic
}

/* Img Flamming */
function ImgLogoFlam() {
  let Flam = [
    "https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=amped-logo&doScale=true&scaleWidth=800&scaleHeight=500&text=",
    "https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=crafts-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&text=",
    "https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&fillColor1Color=%23f2aa4c&fillColor2Color=%23f2aa4c&fillColor3Color=%23f2aa4c&fillColor4Color=%23f2aa4c&fillColor5Color=%23f2aa4c&fillColor6Color=%23f2aa4c&fillColor7Color=%23f2aa4c&fillColor8Color=%23f2aa4c&fillColor9Color=%23f2aa4c&fillColor10Color=%23f2aa4c&fillOutlineColor=%23f2aa4c&fillOutline2Color=%23f2aa4c&backgroundColor=%23101820&text=",
    "https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text=",
    "https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&script=water-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=",
    //"https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=arcade-logo&text=",
    //"https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=dance-logo&text=",
    //"https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=matrix-logo&text=",
    //"https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=spaceships-logo&text=",
    //"https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=spider-men-logo&text=",
    "https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=emperor-logo&text=",
    "https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=flame-logo&text=",
    "https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=robot-logo&text=",
    "https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=skate-logo&text=",
    "https://flamingtext.com/net-fu/proxy_form.cgi?imageoutput=true&script=wrestler-logo&text="
  ];
  return Flam;
}

/* Img Array */
function VideoGalau() {
  let Galau = pickRandom([
    "https://telegra.ph/file/c83205eeeecceb9e4db87.mp4",
    "https://telegra.ph/file/a001c30cafa587a3bef2c.mp4",
    "https://telegra.ph/file/09cf5ac786cbfda551617.mp4",
    "https://telegra.ph/file/e696afd2cfe29a199be11.mp4",
    "https://telegra.ph/file/5be5e3696c03edff2772b.mp4",
    "https://telegra.ph/file/b9b3dece43e557b4addc1.mp4",
    "https://telegra.ph/file/a33e23d6736f8cb40b4fb.mp4",
    "https://telegra.ph/file/3426da3a67bdc0238bd46.mp4",
    "https://telegra.ph/file/394386e5dff94ccff2323.mp4",
    "https://telegra.ph/file/1a1cf22235249f0a459e5.mp4",
    "https://telegra.ph/file/a5578746d1abf176894ed.mp4",
    "https://telegra.ph/file/99dcebf89c97f13f4f657.mp4",
    "https://telegra.ph/file/6a808e89640f23ecfc936.mp4",
    "https://telegra.ph/file/2e35480077a5eae3b2a1e.mp4",
    "https://telegra.ph/file/6c5ba9ed473f188a963b2.mp4",
  ]);
  return Galau;
}

/* Img Array */
function ImgEstetik() {
  let DocImg = pickRandom([
    "https://i.pinimg.com/originals/b4/2c/9c/b42c9c0244e1d940f40006f528274fcb.png",
    "https://i.pinimg.com/originals/61/f1/bf/61f1bf6bb91dd1dc445cdf6815b916fc.png",
    "https://i.pinimg.com/originals/ab/f8/8c/abf88c2f5f5e5d16875cefb354eac264.jpg",
    "https://i.pinimg.com/564x/74/64/61/746461deb35bfc0e902302a0f48de4d4.jpg",
    "https://i.pinimg.com/736x/b8/ca/b5/b8cab5d9b26ab27e227c1e9332a88ef4.jpg",
    "https://i.pinimg.com/originals/63/57/66/635766e0012b1043b417569045677466.png",
    "https://i.pinimg.com/564x/59/42/cf/5942cfd3ee4c1e2e69d1a5c6a21932de.jpg",
    "https://i.pinimg.com/736x/1a/d0/0c/1ad00c60485c3775da0653b5bdf25789.jpg",
    "https://i.pinimg.com/736x/65/31/f2/6531f220db24f3f5cf5f2e2e1207b862.jpg",
    "https://i.pinimg.com/564x/36/db/eb/36dbeb4e00922f31283562034c3077c2.jpg",
    "https://i.pinimg.com/474x/cf/ec/e5/cfece519673571566c22298a0320f99f.jpg",
    "https://i.pinimg.com/originals/12/ee/98/12ee982b710e5a73b26fc4952927c20c.jpg",
    "https://i.pinimg.com/originals/bd/6c/3b/bd6c3b4e7166172bc1f27c59bd9c7e76.jpg",
    "https://i.pinimg.com/736x/6c/d1/51/6cd151fb83df27d4e06f81d8633d3d94.jpg",
    "https://i.pinimg.com/236x/16/1c/22/161c221d96dcc1123f5fe191e0142727.jpg",
    "https://i.pinimg.com/originals/97/30/8c/97308ce90040f1605538bb01bd4fa7cf.jpg",
    "https://i.pinimg.com/474x/98/75/97/98759738d93608af57956545f5840daa.jpg",
    "https://i.pinimg.com/originals/41/f5/22/41f522c5a932ff7645d5941de3eaadda.jpg",
    "https://i.pinimg.com/736x/6c/1c/36/6c1c369cd3e3f3e5cc766a3d003e5ecb.jpg",
    "https://i.pinimg.com/originals/ce/00/24/ce002453879ef6c5eda3db249946d372.jpg",
    "https://i.pinimg.com/564x/aa/fd/23/aafd2371e249bbbcc6d84a981c45e6bb.jpg",
    "https://i.pinimg.com/originals/11/5a/69/115a6980e8008379f65f4e34f92bda72.png",
    "https://i.pinimg.com/736x/8b/70/11/8b701118b341c8f3f160089dd9b8a310.jpg",
    "https://i.pinimg.com/736x/29/7a/da/297ada3515d92c5155ca04aa494782cb.jpg",
    "https://i.pinimg.com/236x/d6/d3/df/d6d3dfecf10a7d9746666c38be44d925.jpg",
    "https://i.pinimg.com/474x/78/e2/bd/78e2bdcb305f788ec67e7cb324d531fe.jpg",
    "https://i.pinimg.com/474x/77/2f/20/772f209b453a0a5a6ae1b7d3cf70a908.jpg",
    "https://i.pinimg.com/564x/ff/36/a7/ff36a77caf23babe715cfe97bbc181da.jpg",
    "https://i.pinimg.com/736x/f5/5e/c1/f55ec1a2f4f7070efde70df5a37def1e.jpg",
    "https://i.pinimg.com/736x/c5/eb/81/c5eb8140be713edb9d6afd5094a53bca.jpg",
    "https://i.pinimg.com/564x/bf/9c/7f/bf9c7f37bc6e385406ed8fc59b9d600b.jpg",
    "https://i.pinimg.com/736x/a7/b1/c2/a7b1c21bbcaf286fe028c4f602ff67b2.jpg",
    "https://i.pinimg.com/originals/37/f5/01/37f501efe423c2b006bd96efd0ddce45.jpg",
    "https://i.pinimg.com/originals/88/26/55/88265549afbaeaaf11f27a03136b45d4.jpg",
    "https://i.pinimg.com/originals/ae/9e/8b/ae9e8baabd4a5e8ce236760824bfc996.png",
    "https://i.pinimg.com/564x/95/26/83/9526835e2f8a122a7c9b02301d0e1c3d.jpg",
    "https://i.pinimg.com/736x/2d/7b/5b/2d7b5b2f57ea965fd5e89581bb53f07e.jpg",
    "https://i.pinimg.com/originals/d4/2f/db/d42fdbf73868af1f844b88a30617f9d7.jpg",
    "https://i.pinimg.com/736x/1a/c9/a0/1ac9a0bec6c2c1e586d50b5374c1e4ca.jpg",
    "https://i.pinimg.com/originals/9a/70/65/9a7065bd0d0df7a84773ce2dfa150dcf.jpg",
    "https://i.pinimg.com/736x/bc/39/7a/bc397aad9b28519643729f36c6d334fa.jpg",
    "https://i.pinimg.com/564x/ac/c5/2c/acc52ca4eb1d0ab7e0ba2970344ee50e.jpg",
    "https://i.pinimg.com/236x/95/3b/9c/953b9cebee45c063573beef9586e742e.jpg",
    "https://i.pinimg.com/736x/8f/9b/0c/8f9b0cc4aa5175b3ce7f5f6f8ebf7f23.jpg",
    "https://i.pinimg.com/originals/03/dc/e5/03dce5c7e6aaa7143871f225698d89c6.png",
    "https://i.pinimg.com/564x/b2/13/ea/b213ea1876a17df3eadfcc1f1f80971c.jpg",
    "https://i.pinimg.com/736x/52/d3/ca/52d3cac214995290d41547ebd4b753eb.jpg",
    "https://i.pinimg.com/originals/0b/ab/f6/0babf697809c528116557d060d7c95f5.jpg",
    "https://i.pinimg.com/originals/7f/b2/d2/7fb2d2f65bfbb19881b0b0d4c2f33ca1.jpg",
    "https://i.pinimg.com/originals/df/11/46/df114607f50aa300edd5cd7d404000f5.jpg",
    "https://i.pinimg.com/originals/88/e8/1c/88e81c0463870b4750ba7ec74fecae0e.jpg",
    "https://i.pinimg.com/originals/89/09/86/890986ea900da0b40826607ec261f676.png",
    "https://i.pinimg.com/originals/1d/6a/4b/1d6a4bbf4dad8db5aa5d44851be9ef78.jpg",
    "https://i.pinimg.com/736x/01/72/67/017267a53c9e9693d20520608690e8e7.jpg",
    "https://i.pinimg.com/564x/58/aa/79/58aa799cd9edefe88d7e97dc76f63799.jpg",
    "https://i.pinimg.com/736x/be/07/1c/be071c20203ee0c03f4cf2cd5356c063.jpg",
    "https://i.pinimg.com/originals/46/4b/16/464b16e19604dc08be77a8f03ebdb742.jpg",
    "https://i.pinimg.com/originals/32/a0/97/32a0978d7d1d73e237a39f90ea5af978.jpg",
    "https://i.pinimg.com/originals/a6/1a/bc/a61abc36e144e2d3557255a645f5c400.jpg",
    "https://i.pinimg.com/236x/33/02/a4/3302a4186c602c8f5b4a2f69ffe7de32.jpg",
    "https://i.pinimg.com/originals/77/a8/f5/77a8f566c318e738067ee65434b69feb.jpg",
    "https://i.pinimg.com/564x/18/89/01/188901b38e9b0905bbbd8adb889a03a9.jpg",
    "https://i.ytimg.com/vi/JQzFR1UicoE/maxresdefault.jpg",
    "https://i.pinimg.com/736x/13/62/09/136209df5e48abadc9b376a1fa9a1aef.jpg",
    "https://i.pinimg.com/originals/4e/7e/91/4e7e912a0772b29e0070a23e413813cb.jpg",
    "https://i.pinimg.com/originals/fc/e0/f6/fce0f6027d2fcbbd232fddcd71873f03.jpg",
    "https://i.pinimg.com/736x/9f/cc/9e/9fcc9eedadd9b840692e1b2cc3bd2625.jpg",
    "https://i.pinimg.com/564x/be/5b/d1/be5bd16d6cfda3aa06925d8eb8860392.jpg",
    "https://i.pinimg.com/originals/eb/79/54/eb79544a0e10df58d40133c429bc518c.jpg",
    "https://i.pinimg.com/originals/23/58/cb/2358cbf776160115076d14abefe1eec5.jpg",
    "https://i.pinimg.com/originals/26/46/c6/2646c6ddb3cfcee91e0e4bc29dcf6c7c.jpg",
    "https://i.pinimg.com/originals/46/f4/d6/46f4d67909a573b109fc3e0a60de3e06.jpg",
    "https://i.pinimg.com/236x/e7/52/b5/e752b54516024ed00255332b3766599e.jpg",
    "https://i.pinimg.com/originals/20/c8/63/20c863c5656cf1f925b478525f597956.jpg",
    "https://i.pinimg.com/736x/e6/f9/41/e6f941881ca71fd20335d7c8b6a98cfc.jpg",
    "https://i.pinimg.com/564x/28/16/73/281673cb50ae9a8d19b00d6244ea965a.jpg",
    "https://i.ytimg.com/vi/5JwKzi-SYHc/maxresdefault.jpg",
    "https://i.pinimg.com/236x/b7/57/91/b75791bf212506b883770b3f9768aabe--night-quotes-book-quotes.jpg",
    "https://i.pinimg.com/236x/0e/e8/b5/0ee8b58e1be009e6139bd76d6db169c1.jpg",
    "https://i.pinimg.com/236x/81/fd/10/81fd109472314c6a8c2e3dba4535857d.jpg",
    "https://i.pinimg.com/236x/a7/fd/5f/a7fd5fe72a0094172cb1bf6386fbd8eb.jpg",
    "https://i.pinimg.com/videos/thumbnails/originals/2a/a2/95/2aa295b0fa86e91e7fd73a36fc825fe9.0000001.jpg",
    "https://i.pinimg.com/236x/0c/5f/af/0c5faf951d787aedfc877a5f0a34cf21.jpg",
    "https://i.pinimg.com/474x/d2/43/12/d243124a31b9a7640744c62e4d0348ad.jpg",
    "https://i.pinimg.com/736x/8b/ee/4b/8bee4b745cbc80ab18441bba51256b16.jpg",
    "https://i.pinimg.com/736x/cd/6c/30/cd6c309030864871fda4ac57f285bc8d.jpg",
    "https://i.pinimg.com/736x/fc/65/d1/fc65d165e9ab2a277675f5cf2482a22c.jpg",
    "https://i.pinimg.com/originals/11/b5/46/11b54649fd9552e9e38bb01927a1c792.jpg",
    "https://i.pinimg.com/originals/15/cb/c6/15cbc6e5bb539063b4fe2973a821deff.jpg",
    "https://i.pinimg.com/736x/58/3f/99/583f99990d7efde7ecebfb91b05966e2.jpg",
    "https://i.pinimg.com/736x/cd/29/14/cd29147b7dce91ca1089cddf0c066e8e--instagram-white-feed-white-aesthetic-instagram.jpg",
    "https://i.pinimg.com/474x/81/11/96/8111963fc49348f368b75cce97d63aac.jpg",
    "https://i.pinimg.com/736x/93/25/ee/9325eebbc15afb24def63dacab4f606e.jpg",
    "https://i.pinimg.com/736x/db/25/f1/db25f119383fa0bcb12cb07519f8c6ae.jpg",
    "https://i.pinimg.com/736x/35/ff/92/35ff9221f136285da7ca62ec2ea1c695.jpg",
    "https://i.pinimg.com/736x/d9/79/a4/d979a46728585c9bc8db8d38717908f8.jpg",
    "https://i.pinimg.com/736x/b6/1b/7d/b61b7d4ea4c3170c969a28d501081ec1.jpg",
    "https://i.pinimg.com/236x/51/7e/a1/517ea1599477e67d67a6793f8c4decf1.jpg",
    "https://i.pinimg.com/originals/df/65/2a/df652af3f2ba4ecde1124189586eb8ac.jpg",
    "https://i.pinimg.com/236x/37/7c/8b/377c8b4d1428ad52fc32bb1b4b759c56.jpg",
  ]);
  return DocImg;
}

/* Img Array */
function ImgWaifu() {
  let Waif = [
    "https://i.pinimg.com/736x/8e/b2/06/8eb206322336c1e107c187fe338c42f5.jpg",
    "https://i.pinimg.com/474x/8a/eb/f8/8aebf8c8cd83c4a5a7cd9b893a97614f.jpg",
    "https://i.pinimg.com/originals/cc/fe/31/ccfe31df09fbeb8438ffb1268a672b03.png",
    "https://i.pinimg.com/originals/39/d1/df/39d1df920c01a788c858c333232e11d4.png",
    "https://i.pinimg.com/originals/1d/d4/63/1dd463f45c2d4680543253f32818b56f.jpg",
    "https://i.pinimg.com/736x/42/88/f1/4288f17ee25b909430fb7e707d961d0b.jpg",
    "https://i.pinimg.com/474x/be/4a/83/be4a83aa8f4459c65ac57fd536f71baa.jpg",
    "https://i.pinimg.com/originals/1f/04/33/1f04330c19ca1beb531235ac299189c8.png",
    "https://i.pinimg.com/originals/9f/d4/74/9fd4744644230aa520a9dfe2ea24d38d.jpg",
    "https://i.pinimg.com/474x/0b/cb/0b/0bcb0b81d2d5a914b4baae02ce89fef9.jpg",
    "https://i.pinimg.com/originals/90/b3/fb/90b3fb0525ea88bf2214bcd31624e093.png",
    "https://i.pinimg.com/originals/a9/b7/5f/a9b75f3fdd6b08d1113f6910dc1bedb7.jpg",
    "https://i.pinimg.com/originals/f1/ea/fd/f1eafdb8526cf1d73f1156849b2ebef7.jpg",
    "https://i.pinimg.com/originals/50/38/98/503898e84962573df440773b224a9d04.jpg",
    "https://i.pinimg.com/originals/d6/51/a8/d651a8546d44aa0f2ca16e7ec610ee25.jpg",
    "https://i.pinimg.com/564x/51/64/35/51643592f8ef433690a6d4f6756ed30f.jpg",
    "https://i.pinimg.com/originals/46/c7/4d/46c74db33dc44bf5e0b37110cb268d27.jpg",
    "https://i.pinimg.com/originals/1c/73/3b/1c733b10bfc31b42e4b805cffa89def7.jpg",
    "https://i.pinimg.com/originals/0a/7c/f4/0a7cf44f2252b098b210d67fe8f94d9d.jpg",
    "https://i.pinimg.com/474x/41/64/60/4164604df227416f5622db5ba1c175ba.jpg",
    "https://i.pinimg.com/originals/80/a9/2d/80a92d9bf7123b4906158c5a63d94ff0.jpg",
    "https://i.pinimg.com/originals/c1/cf/d6/c1cfd6446624ab90eb95e9e21ee6870f.png",
    "https://i.pinimg.com/736x/44/62/a3/4462a3cf3792a8cf12587fd7875d75bc.jpg",
    "https://i.pinimg.com/originals/de/96/a4/de96a4ee3ad09df91a60aaf580b2a481.jpg",
    "https://i.pinimg.com/originals/22/44/23/224423878ca22cee25ed97fe9859e0f5.png",
    "https://i.pinimg.com/originals/61/16/db/6116dbfdf899dd1f3551bf4c533e43c2.jpg",
    "https://i.pinimg.com/originals/ea/45/cb/ea45cbbbc0b4d78d5446dc4946944ba7.jpg",
    "https://i.pinimg.com/originals/c2/c1/9f/c2c19f5b8c573a3493589add1087a0af.jpg",
    "https://i.pinimg.com/originals/b5/62/df/b562df9c721a3898b72eaaf0a9b3abca.png",
    "https://i.pinimg.com/736x/f1/ce/db/f1cedb200dfab458da7ae8077c873b52.jpg",
    "https://i.pinimg.com/474x/e8/f7/a3/e8f7a39d3f74c3514355850e4b9dc24b.jpg",
    "https://i.pinimg.com/736x/54/e2/18/54e21838e0fc0f0f933d87354a4e244d.jpg",
    "https://i.pinimg.com/originals/0e/ba/1a/0eba1a593d883c50cca095848cfb8722.jpg",
    "https://i.pinimg.com/originals/1e/a4/a6/1ea4a60fd6543b2f78f7d070f44f45e9.jpg",
    "https://i.pinimg.com/564x/89/81/89/8981895db9e17b81cd58d0c467c71cf4.jpg",
    "https://i.pinimg.com/280x280_RS/21/85/cd/2185cdb9d25d38ea544eb4ac8159cf1f.jpg",
    "https://i.pinimg.com/474x/9e/c1/54/9ec154489de01ba05a25a1072ed7882d.jpg",
    "https://i.pinimg.com/originals/31/5c/bd/315cbd1ac25c4d4cdddc3638e466eb25.jpg",
    "https://i.pinimg.com/564x/55/f4/00/55f4004efced0fff60e51bd8dd680953.jpg",
    "https://i.pinimg.com/originals/a4/c0/3a/a4c03ab8447c56f400b9b951fbae3b1d.jpg",
    "https://i.pinimg.com/originals/53/d4/94/53d4949d971e143cdef3fb66746b11b8.jpg",
    "https://i.pinimg.com/originals/01/8b/a1/018ba1ad7093f1171e2aded2e3a4a699.jpg",
    "https://i.pinimg.com/736x/88/81/f7/8881f70ea7baf030120559b04ad1146e.jpg",
    "https://i.pinimg.com/originals/b9/50/83/b9508355aed683ece54ee4f4d703aa08.jpg",
    "https://i.pinimg.com/originals/39/13/11/3913117585b2ffe4102619766822182b.jpg",
    "https://i.pinimg.com/originals/ae/9f/4f/ae9f4f0232cde20d846c114591a371d9.jpg",
    "https://i.pinimg.com/originals/df/56/7e/df567e0a14ee48f9445eab94c2804c24.jpg",
    "https://i.pinimg.com/736x/3a/1e/f1/3a1ef1b776cbf4def64890eaf6c0aa53.jpg",
    "https://i.pinimg.com/originals/8d/fe/54/8dfe546c883aae6099670e8a7a9f3521.jpg",
    "https://i.pinimg.com/736x/9a/52/24/9a52246d7114dad728cd9903b26328d6.jpg",
    "https://i.pinimg.com/564x/75/aa/74/75aa7438dc2756d1b4fe6e8d41ddb2c0.jpg",
    "https://i.pinimg.com/736x/e1/f5/d5/e1f5d591f6c39dc23d02e33b4956a269.jpg",
    "https://i.pinimg.com/564x/63/24/fb/6324fbf1f2d090fa33d2fc2554a0da32.jpg",
    "https://i.pinimg.com/736x/24/8a/41/248a415c9ba2870d9d70fa983269e7e9.jpg",
    "https://i.pinimg.com/736x/6a/1d/2b/6a1d2b33590b57cee2a2cf863b79895e.jpg",
    "https://i.pinimg.com/736x/2f/fa/92/2ffa923ad047567126f374861a338523.jpg",
    "https://i.pinimg.com/736x/ee/87/43/ee874395bf14a8d3d4df5925efcfdb05.jpg",
    "https://i.pinimg.com/originals/92/94/60/929460a690114f65cead93ea5ec57535.jpg",
    "https://i.pinimg.com/originals/cd/31/8c/cd318cf0ac622d1281b7616c9c87e42a.png",
    "https://i.pinimg.com/originals/e8/8e/ed/e88eedaaf2c903c922121c39faf49d6a.png",
    "https://i.pinimg.com/564x/99/43/a2/9943a261d188f048b89db41965b9715e.jpg",
    "https://i.pinimg.com/736x/c1/0c/f2/c10cf211537491a3c1383a7bbd539d38.jpg",
    "https://i.pinimg.com/originals/1d/a6/1a/1da61a5df4a31dd394758b035b17320e.jpg",
    "https://i.pinimg.com/736x/fb/63/d3/fb63d39b4b4aef75f32e4e7d3b67aac3.jpg",
    "https://i.pinimg.com/originals/c4/4b/5f/c44b5fa12edf9ea977f34f0f70414430.jpg",
    "https://i.pinimg.com/736x/03/f2/66/03f26670d5e3040d5ee5cd4f2b032fef.jpg",
    "https://i.pinimg.com/originals/10/d2/24/10d224ab1afae97e058fc9044d5a7e49.jpg",
    "https://i.pinimg.com/originals/93/c6/fb/93c6fbaf62f8b797eea55f7ae79e356d.jpg",
    "https://i.pinimg.com/originals/4d/f6/5b/4df65bb4809890faab894e8e8dff40c1.jpg",
    "https://i.pinimg.com/originals/f0/fe/31/f0fe31397de8e5865b7930d081f1bc1d.jpg",
    "https://i.pinimg.com/originals/8d/cd/e8/8dcde89be14c3810729dbf565f7ccb53.png",
    "https://i.pinimg.com/736x/c3/93/08/c39308900e619b45c4c9f449709c9e95.jpg",
    "https://i.pinimg.com/originals/cb/c6/42/cbc64270e6e5f387f85a3177e1c167ff.jpg",
    "https://i.pinimg.com/originals/07/0d/5c/070d5c4a6ca69d819f37b8ef112eafd6.jpg",
    "https://i.pinimg.com/474x/96/0a/b8/960ab83f5299f79064adb16a2e361189.jpg",
    "https://i.pinimg.com/originals/ea/7c/7c/ea7c7cafb58cef706d0949f1ca6d7149.png",
    "https://i.pinimg.com/originals/3f/fa/9a/3ffa9ad68d5e691b1669b11844483ef0.jpg",
    "https://i.pinimg.com/736x/ef/6f/21/ef6f217ed5d203eb3907ea6b8ef24de7.jpg",
    "https://i.pinimg.com/736x/28/a8/af/28a8afefe43210d14cdd541700a65491.jpg",
    "https://i.pinimg.com/474x/fd/7d/cc/fd7dccdac18b43774c1e42f05f50afa0.jpg",
    "https://i.pinimg.com/originals/00/47/9a/00479aac1d7af8b996018d89f85e7f0b.jpg",
    "https://i.pinimg.com/originals/15/ba/c0/15bac04a0012fe79ca8959eea5138f4e.jpg",
    "https://i.pinimg.com/originals/81/2e/53/812e53850439a2793a36323dd963257c.jpg",
    "https://i.pinimg.com/736x/7c/42/8e/7c428e95cced74b3747d28bb503a2723.jpg",
    "https://i.pinimg.com/originals/ec/e1/05/ece105e7dc8627be78acf85787838edb.png",
    "https://i.pinimg.com/originals/33/42/16/3342165641bb4bcdd8d86a3960572e47.jpg",
    "https://i.pinimg.com/originals/9e/29/d5/9e29d5bf3a4ca9e4b9c11084cf8bd8ab.jpg",
    "https://i.pinimg.com/originals/0d/00/aa/0d00aacaba14ce204a223a941be1ffd2.jpg",
    "https://i.pinimg.com/originals/cf/f1/ed/cff1edc018314b7696d62389738737cd.jpg",
    "https://i.pinimg.com/originals/f9/cb/3c/f9cb3cc2d9630a06d82f48fbaf2daa11.jpg",
    "https://i.pinimg.com/originals/7e/83/d5/7e83d5acca7261cb2feacdc6df8ad3ff.jpg",
    "https://i.pinimg.com/originals/a4/07/c1/a407c1c94fe7b4cab1f205fad5910286.jpg",
    "https://i.pinimg.com/736x/06/3c/ba/063cbaecd700e9151a9787c945283286.jpg",
    "https://i.pinimg.com/736x/44/fc/7a/44fc7a984e56513f6b736d5825e9bf2a.jpg",
    "https://i.pinimg.com/736x/58/c0/8d/58c08d72caaa4c37f3da9ec6ce01b647.jpg",
    "https://i.pinimg.com/originals/75/c5/ee/75c5eef08118c2108b1ed670b2ed5aac.jpg",
    "https://i.pinimg.com/originals/d1/94/e1/d194e11e1736f38d447d29d87911e094.png",
    "https://i.pinimg.com/736x/98/60/66/9860667c468c7306789755dae55b0447.jpg",
    "https://i.pinimg.com/originals/ab/ae/f3/abaef3b76f0c0e9295d88af4214376ec.jpg",
    "https://i.pinimg.com/236x/13/5f/c0/135fc027dde72db0fce7b060c721fc40.jpg",
  ];
  return Waif;
}

/* Img Array */
function ImgBoneka() {
  let Boneka = [
    "https://i.pinimg.com/originals/da/a5/6a/daa56a7378ccf4914a1fdc1441515b9a.jpg",
    "https://i.pinimg.com/736x/dc/2f/6d/dc2f6db2c02b7bbe14b0993d448b26c9--movies--scary-things.jpg",
    "https://i.pinimg.com/474x/13/e1/45/13e1453d2acea4f8618ea4be38f080eb.jpg",
    "https://i.pinimg.com/736x/36/cc/64/36cc646530e1f9f205423e677ef799b9.jpg",
    "https://i.pinimg.com/originals/75/d2/b1/75d2b1965924a5407511cfe7b1cd0a4f.jpg",
    "https://i.pinimg.com/736x/4b/4b/ec/4b4bec7d363627c25c8a078bcebf652d--angel.jpg",
    "https://i.pinimg.com/originals/5e/63/11/5e631163455c432174ebf318b80aad77.jpg",
    "https://i.pinimg.com/originals/94/70/fe/9470feeab7a213dbfbf8a5afd5fed311.jpg",
    "https://i.pinimg.com/236x/f3/01/45/f301457899d9bc809c12bd567130780c.jpg",
    "https://i.pinimg.com/236x/ec/4a/12/ec4a1237983f56218d206c7b974d7923.jpg",
    "https://i.pinimg.com/originals/de/cf/70/decf707acfab673e99fdb399dee6d055.jpg",
    "https://i.pinimg.com/236x/f5/a9/5d/f5a95de9e27fb3895dd2e9371c21bae9.jpg",
    "https://i.pinimg.com/474x/39/b5/1a/39b51ab902cbebd16ccec13e516cc7cb.jpg",
    "https://i.pinimg.com/736x/ff/00/ef/ff00ef21eb5db40f16cdb925357102da--halloween-movies-halloween-horror.jpg",
    "https://i.pinimg.com/originals/d7/78/b9/d778b992d61f1aa23caa4bf6da259111.jpg",
    "https://i.pinimg.com/474x/f6/5d/2d/f65d2de40c6f5d5847937f26e8fa7fc4.jpg",
    "https://i.pinimg.com/originals/74/06/ac/7406acc80a1df8eca7c717a333257298.jpg",
    "https://i.pinimg.com/originals/5e/1d/03/5e1d030dd01d39d9d871947dea321556.jpg",
    "https://i.pinimg.com/564x/c2/e0/c5/c2e0c579627c3b564095fd0a6a06f5c3--chucky-tattoo-film-posters.jpg",
    "https://i.pinimg.com/originals/fd/b3/b4/fdb3b4142cd1e310535763cc6474c3e9.jpg",
    "https://i.pinimg.com/originals/a0/90/2c/a0902c74c017398b48f3ceb9387fa5f1.jpg",
    "https://i.pinimg.com/736x/e1/e6/8e/e1e68e24f5a8257637544327f3a688bd.jpg",
    "https://i.pinimg.com/originals/02/bf/70/02bf707471187c7ed7cc63562d00579a.jpg",
    "https://i.pinimg.com/236x/6b/04/fa/6b04fa7c540f709a0797cd568c8478d3--doll-tattoo-tattoo-ink.jpg",
    "https://i.pinimg.com/736x/7a/33/6d/7a336da5a3c4a75ecccfd38f11197ba8.jpg",
    "https://i.pinimg.com/originals/1c/4e/4f/1c4e4fdf8b674f51aa3ed48b43f3e8fc.jpg",
    "https://i.pinimg.com/originals/23/36/40/233640d85c91822053c9623359afc934.jpg",
    "https://i.pinimg.com/736x/a9/91/9c/a9919cf65c720d6f80d76af747ae73a8.jpg",
    "https://i.pinimg.com/736x/71/aa/1f/71aa1f6add3504506c6673b9f69846b6.jpg",
    "https://i.pinimg.com/236x/59/71/06/5971068264d50e40a3e51873dbf6589f--chucky-tattoo-best-tattoos.jpg",
    "https://i.pinimg.com/736x/bd/ba/08/bdba0836264bd5a1a38e39533a348bc4.jpg",
    "https://i.pinimg.com/474x/0f/dc/cc/0fdcccfd21398831a58f2567c64794d6.jpg",
    "https://i.pinimg.com/originals/ae/02/b8/ae02b860a0fd2c0b40e84d446c08ef1f.jpg",
    "https://i.pinimg.com/originals/51/9c/c3/519cc3226f09cd008c579d90fd6b7341.png",
    "https://i.pinimg.com/736x/92/ed/93/92ed9306edffa27aef9e54355d611225--tattoo-ideas-horror.jpg",
    "https://i.pinimg.com/736x/08/f3/ba/08f3badfcafd6b1a8a5d993bd67d447d--horror-movies.jpg",
    "https://i.pinimg.com/236x/45/15/30/451530a276a420e16007558957f59e67.jpg",
    "https://i.pinimg.com/originals/1f/ac/c2/1facc23accabb26ecf6e07055aa9416e.jpg",
    "https://i.pinimg.com/originals/7e/b6/b7/7eb6b73b0c12f81077cf80523b0ce4eb.jpg",
    "https://i.pinimg.com/originals/ff/f6/1d/fff61d0c6ff6c32aa6b319c3dfc2acf4.jpg",
    "https://i.pinimg.com/736x/46/5e/33/465e335565a7237dba90ad28148acfd7--children-play-horror.jpg",
    "https://i.pinimg.com/474x/8c/51/60/8c516010ec633f7a5842e28ff3c72f8a--scary-movies-horror-movies.jpg",
    "https://i.pinimg.com/550x/c3/db/b1/c3dbb1885ee38cca7b3897c39d678ceb.jpg",
    "https://i.pinimg.com/736x/69/cf/5f/69cf5f65b7b039833aca75ec928b8ac5.jpg",
    "https://i.pinimg.com/474x/6e/05/3e/6e053eec0d4f579cc62e8bdc26aa50f2.jpg",
    "https://i.pinimg.com/736x/7c/1f/6b/7c1f6bee3842029d7419e81ea79634d8.jpg",
    "https://i.pinimg.com/originals/fd/3b/a2/fd3ba25cff538c3ab4a75e66cbf3eb9d.jpg",
    "https://i.pinimg.com/236x/ff/42/76/ff42769c6be69bf306865673b2f22d2b.jpg",
    "https://i.pinimg.com/474x/4a/cc/e0/4acce00f6402f017959aa096a48aa1b0.jpg",
    "https://i.pinimg.com/originals/48/fc/6d/48fc6d8c5014df95bd38cea11045dc47.jpg",
    "https://i.pinimg.com/originals/34/80/49/348049373d69e1729805f23d3496bf4b.jpg",
    "https://i.pinimg.com/originals/b5/fc/d0/b5fcd0c955b7eba6e9b4be06e831d867.png",
    "https://i.pinimg.com/originals/9a/ed/ba/9aedba682a9a23d6573b5280a81f78af.jpg",
    "https://i.pinimg.com/originals/93/57/07/935707702f9a698400c007a5c5f3fa9d.jpg",
    "https://i.pinimg.com/originals/80/7b/32/807b328ed4919abf042a8adc831b9937.jpg",
    "https://i.pinimg.com/originals/ed/6d/a3/ed6da36ce051f2d3f64d5938cf58bfe8.jpg",
    "https://i.pinimg.com/originals/5a/78/85/5a7885d91eec77facb616cee3f11b86c.jpg",
    "https://i.pinimg.com/736x/7a/27/9b/7a279b4a01dc5fa2733061527897f76b--cosplay-costumes-cosplay-ideas.jpg",
    "https://i.pinimg.com/736x/cd/0c/82/cd0c82ec6ca455a5e3f0ad8670052074.jpg",
    "https://i.pinimg.com/736x/b0/06/27/b006270aba04231d1ae9a5c8d0cb8c29.jpg",
    "http://31.media.tumblr.com/f493b7352fa22fc56c34ff57ca6934ff/tumblr_n990rwxO1D1qav174o1_500.jpg",
    "https://i.pinimg.com/564x/a1/b1/70/a1b170000888f4de372b83426fd220e9.jpg",
    "https://i.pinimg.com/474x/30/d6/f6/30d6f6d2a80d9f8d65aee227c43dc63c.jpg",
    "https://i.pinimg.com/originals/aa/24/79/aa24796a4d06b7330c96fd7b95b21b0c.jpg",
    "https://i.pinimg.com/originals/d1/1a/df/d11adfc381ae123a0f47f6eacf39933d.jpg",
    "https://i.pinimg.com/474x/aa/f5/92/aaf592dd18880eba58e0e4104e78624f--horrorfilms-scary-movies.jpg",
    "https://i.pinimg.com/originals/85/fa/c7/85fac72e845b00b68913b384165d27b0.png",
    "https://i.pinimg.com/236x/f8/83/a5/f883a56d75ddeb248b2bedf52b1704d6--chucky-tattoo-ink.jpg",
    "https://i.pinimg.com/736x/b0/05/90/b00590f4b445bd524ac0457496d9baa0.jpg",
    "https://i.pinimg.com/originals/6a/53/01/6a530143c5b50d1c244f6d2df8b75421.jpg",
    "https://i.pinimg.com/474x/55/fb/32/55fb32f0bd2e08f6335c4dc42880d47a--horror-movies-finger.jpg",
    "https://i.pinimg.com/originals/3c/35/19/3c3519eea5e8fd2c2cde38885253e774.png",
    "https://i.pinimg.com/236x/9c/3f/5c/9c3f5c110b65b321a831d300c810c3ad--scary-movies-horror-movies.jpg",
    "https://i.pinimg.com/736x/15/9f/06/159f06ed8878bf33fbbca0a9a1669a64.jpg",
    "https://i.pinimg.com/474x/db/59/23/db5923b2c79cfe40727a04c7fbacb29e.jpg",
    "https://i.pinimg.com/originals/27/34/0d/27340db43f4c1e7eac8a5dbd54be081d.jpg",
    "https://i.pinimg.com/originals/47/97/cc/4797cc6ba786cd0c807c14e7ebca58e3.jpg",
    "https://i.pinimg.com/564x/6c/c8/22/6cc822f3c6daca76274b9cb0c17ac0b0.jpg",
    "https://i.pinimg.com/550x/17/1c/93/171c932d8dfa54ffc3504a8cc3ae0dfa.jpg",
    "https://i.pinimg.com/originals/fe/8f/b5/fe8fb55e48ebc4ce47fdf9cc00b5cd3b.jpg",
    "https://i.pinimg.com/474x/da/56/2f/da562f9d1ff093086dd8df6581654d26.jpg",
    "https://i.pinimg.com/originals/5e/92/66/5e92669595aacb2f81447cd3de1a9247.jpg",
    "https://i.pinimg.com/236x/eb/ac/e0/ebace02477f6e6b4db570f21900be21c.jpg",
    "https://i.pinimg.com/736x/3d/a3/8a/3da38ab7bf82b0499a92f8987205011e.jpg",
    "https://i.pinimg.com/474x/fa/f1/58/faf158267ded3c5718bc10b86aa2ce9a--chucky-costume-creepy-dolls.jpg",
    "https://i.pinimg.com/236x/30/88/54/3088548ae4aee955a511e25089436c47--bride-of-chucky-doll-horror-icons.jpg",
    "https://i.pinimg.com/474x/07/22/53/0722534aa8b6e5c1a7507c0547a37368.jpg",
    "https://i.pinimg.com/236x/d7/bb/92/d7bb92292040770aeeeef936a9cd1693.jpg",
    "https://i.pinimg.com/1200x/a3/d5/a3/a3d5a3347a6430f6f9c0ead4913d262f.jpg",
    "https://i.pinimg.com/originals/48/d0/74/48d0747af44312d92dda462736976e75.jpg",
    "https://i.pinimg.com/236x/b7/b2/57/b7b257e4350fa5812e8fc34fe7d630b8--chucky-tattoo-footprint-tattoo.jpg",
    "https://i.pinimg.com/736x/af/a5/b6/afa5b6d7ea44883bf361046089fe3644.jpg",
    "https://i.pinimg.com/236x/10/e0/a1/10e0a12c5a1f030085fa681c42b4f0d8.jpg",
    "https://i.pinimg.com/736x/94/32/80/9432808631598b503b766e46d8e718b0.jpg",
    "https://i.pinimg.com/236x/9e/51/ec/9e51ec1d379686c67e5753a67b6c3098--creepy-tattoos--tattoos.jpg",
    "https://i.pinimg.com/550x/24/f8/10/24f81040d55fb5bc02b21d619c8acf96.jpg",
    "https://i.pinimg.com/736x/e3/08/89/e3088973237dbb1b44aaccc5799e3688.jpg",
    "https://i.pinimg.com/originals/82/c2/69/82c269380232260047fbc028a34d890b.jpg",
    "https://i.pinimg.com/originals/14/f7/4c/14f74ce49d9cc56002dae86fc0ad4882.jpg",
    "https://i.pinimg.com/736x/f0/a3/7b/f0a37b0ffa16839e0373364c0d97278e.jpg",
  ];
  return Boneka;
}

/*⫘⫘⫘⫘ APA KABAR ⫘⫘⫘⫘⫘*/
function Sapa() {
  let Apa = pickRandom(["Apa kabar ", "Halo ", "Hai "]);
  return Apa;
}

/*⫘⫘⫘⫘ APA KABAR ⫘⫘⫘⫘⫘*/
function ThumbUrl() {
  let Turl = pickRandom([
    "/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAcACADASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAABAUGAQP/xAAoEAACAQQCAQMDBQAAAAAAAAABAgMABBEhBRIxBkFRInGxE1JhwdH/xAAWAQEBAQAAAAAAAAAAAAAAAAAAAQL/xAAZEQACAwEAAAAAAAAAAAAAAAAAAQIRITH/2gAMAwEAAhEDEQA/ANNFd9Uml65ZBkDIGdZxWcmbkORVpooCIzvWvzXlytxKbRew6r1zkeCc/wCCn+mL2C44oqBmeMYdTv7H7VqTrhuOkMXtzYylGPVZNOMDYqpeSme6tDFvvhCc6bBoXqSaKa5PUALEMN1+TXLxWt4lWMMYCRJGzbZcgaNFwSxljnYJoePgT9JXnRSA37c+Sfk/FA4xIuMsZJr1Y42VAqiPTOffPyabzlzK98kRb6c7xUq4UXk1qJfDq2QP4OP6qR1B5wJb2V1zLMsKiNCS2/FXOUiVOCIByUEa5A0SNHBp0kCWVkVt8oCuz77pfIW8UvFvCy/QIyBj2wNfiq3QUb0//9k=",
    "/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAgACADASIAAhEBAxEB/8QAGAABAQEBAQAAAAAAAAAAAAAABAUDAQL/xAAmEAACAQMDAwQDAAAAAAAAAAABAgMAESEEEjEFEyIVQVFhcZHw/8QAFwEAAwEAAAAAAAAAAAAAAAAAAAEDAv/EABwRAAICAwEBAAAAAAAAAAAAAAECAAMREiExIv/aAAwDAQACEQMRAD8AlGEA5kU/NYSad4nQqwcMcW9q1k6TOG8ZBb7JFO0iDRIVSXa5A3EnP9mk2o8hWNjJUpMepQtcC3Nc1B3OBGcng/FI1SrtJGVB9/ipyxnvMl88/mmnRmFyatzwxPrUpGWcj7ApMbNIO67XZheof6qhoeojSL5xdy3AJxas2AkfIlKWVDkxuCDf3NT9Rui1IEZN+QDXqPqC+ZkG3N1AHP1QJXeZy7tuJpICDKXOrqMT/9k=",
    "/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAgACADASIAAhEBAxEB/8QAGgABAAEFAAAAAAAAAAAAAAAABQMBAgQGB//EACoQAAICAgEDAQcFAAAAAAAAAAECAwQAERIFITETBhQiMkFx8DOBkaHR/8QAGAEAAgMAAAAAAAAAAAAAAAAAAwQAAQX/xAAcEQACAgMBAQAAAAAAAAAAAAABAgADERIhQRP/2gAMAwEAAhEDEQA/AD/Q5UqyjjGHChpCu9AjCZoeF5Y6jCU7HEjR+L6j+cWCSTdOhhA/UVR3OJ9K6BFVf3u07MiKWTQ1vX52yO2OewVQ4ZiCFhD6npKzD5kCg6+2TVZKrwFxGvPRABT64hYNazWrz0lKq7MC2yD2HjIb1FVhMqluI7kb/vEvu1baOYU0qRssIroRVhZQ3IKpHjHLUs12WGSFzBGi6Kkggn9s5+bD8eDSMdAAfF4xb2YtrHbljlccHjJHI9tg4xeWxssqtAOGbeCFiVSSdaViT4B/3LeoziKFVKgpJtW+2shS1XJLNPHsnfzL+DKW7FWxWZGmjGhsEMO2ZDDLA9Mb8n//2Q==",
    "/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wAARCAAgACADASIAAhEBAxEB/8QAGAAAAwEBAAAAAAAAAAAAAAAABAUGBwP/xAApEAACAgEDAwMDBQAAAAAAAAABAgMRBAAFIRJBUQYTMRQicUJhgaHx/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAGBEAAwEBAAAAAAAAAAAAAAAAAAERAkH/2gAMAwEAAhEDEQA/AJjFEXu9U5+xf0jvov6+NUZUhoMeaoceNDYUH1OVHDz9x7CyaF8DzxqmwvTuLOjCVclAaZS1Ke+qnBKJTnY8pT3oj8ENwDoXJjh6Fkgax8MPB043PYFgLmETlUFCk6gTXFkaQEEGiKN1WraJDvt8og3HHkLlAsi2wNEdr/vWhRxyQAjr6rPHA1J5nptMbbZ8lsos0QqglAtY/mtOfT24vPtimVSVVii2bNCqsn51hm8vgflCZA05kCpGpfgX8DWeAqVXi5C1k+B/uq/1PmONqZVJjV2Cmu/5/bUg0LwZPtyCmBH4I8jRE0f/2Q==",
  ]);
  return Turl;
}

/*⫘⫘⫘⫘ Fake Reply ⫘⫘⫘⫘⫘*/
/*function Fakes() {
  let Org = pickRandom(["0", "6285176952003", "62895411954396", "97430313636", "6287782830020", "79814212373", "6285878241359"])
  let Parti = pickRandom([Org + "@s.whatsapp.net", Org + "@c.us"])
  let Remot = pickRandom(["status@broadcast", "120363027913991843@g.us"])
  let Hai = pickRandom(["Apa kabar, ", "Halo, ", "Hai, "])
  let Sarapan = Hai + Pagi()
  let Thum = ThumbUrl()
  let fpayment = {
      key: {
          participant: Parti,
          remoteJid: Remot
      },
      message: {
          requestPaymentMessage: {
              currencyCodeIso4217: "USD",
              amount1000: SizeDoc(),
              requestFrom: Parti,
              noteMessage: {
                  extendedTextMessage: {
                      text: Sarapan
                  }
              },
              expiryTimestamp: SizeDoc(),
              amount: {
                  value: SizeDoc(),
                  offset: SizeDoc(),
                  currencyCode: "USD"
              }
          }
      }
  }
  let fpoll = {
      key: {
          participant: Parti,
          remoteJid: Remot
      },
      message: {
          pollCreationMessage: {
              name: Sarapan
          }
      }
  }
  let ftroli = {
      key: {
          participant: Parti,
          remoteJid: Remot
      },
      message: {
          orderMessage: {
              itemCount: SizeDoc(),
              status: 1,
              surface: 1,
              message: `𝗧 𝗜 𝗠 𝗘 : ${moment.tz("Asia/Jakarta").format("HH:mm:ss")}`,
              orderTitle: Sarapan,
              sellerJid: Parti
          }
      }
  }
  let fkontak = {
      key: {
          participant: Parti,
          remoteJid: Remot
      },
      message: {
          contactMessage: {
              displayName: Sarapan,
              vcard: `BEGIN:VCARD\nVERSION:3.0\nN:XL;${Sarapan},;;;\nFN:${Sarapan},\nitem1.TEL;waid=${nomorown.split("@")[0]}:${nomorown.split("@")[0]}\nitem1.X-ABLabell:Ponsel\nEND:VCARD`,
              jpegThumbnail: Thum,
              thumbnail: Thum,
              sendEphemeral: true
          }
      }
  }
  let fvn = {
      key: {
          participant: Parti,
          remoteJid: Remot
      },
      message: {
          audioMessage: {
              mimetype: "audio/ogg; codecs=opus",
              seconds: SizeDoc(),
              ptt: true
          }
      }
  }
  let fvid = {
      key: {
          participant: Parti,
          remoteJid: Remot
      },
      message: {
          videoMessage: {
              title: Sarapan,
              h: Sarapan,
              seconds: SizeDoc(),
              caption: Sarapan,
              jpegThumbnail: Thum
          }
      }
  }
  let ftextt = {
      key: {
          participant: Parti,
          remoteJid: Remot
      },
      message: {
          extendedTextMessage: {
              text: Sarapan,
              title: `𝗧 𝗜 𝗠 𝗘 : ${moment.tz("Asia/Jakarta").format("HH:mm:ss")}`,
              jpegThumbnail: Thum
          }
      }
  }
  let fliveLoc = {
      key: {
          participant: Parti,
          remoteJid: Remot
      },
      message: {
          liveLocationMessage: {
              caption: Sarapan,
              h: `𝗧 𝗜 𝗠 𝗘 : ${moment.tz("Asia/Jakarta").format("HH:mm:ss")}`,
              jpegThumbnail: Thum
          }
      }
  }
  let ftoko = {
      key: {
          participant: Parti,
          remoteJid: Remot
      },
      message: {
          productMessage: {
              product: {
                  productImage: {
                      mimetype: "image/jpeg",
                      jpegThumbnail: Thum
                  },
                  title: Sarapan,
                  description: `𝗧 𝗜 𝗠 𝗘 : ${moment.tz("Asia/Jakarta").format("HH:mm:ss")}`,
                  currencyCode: "USD",
                  priceAmount1000: SizeDoc(),
                  retailerId: "Ghost",
                  productImageCount: 1
              },
              businessOwnerJid: Parti
          }
      }
  }
  let fdocs = {
      key: {
          participant: Parti,
          remoteJid: Remot
      },
      message: {
          documentMessage: {
              title: Sarapan,
              jpegThumbnail: Thum
          }
      }
  }
  let fgif = {
      key: {
          participant: Parti,
          remoteJid: Remot
      },
      message: {
          videoMessage: {
              title: Sarapan,
              h: Sarapan,
              seconds: SizeDoc(),
              gifPlayback: true,
              caption: `𝗧 𝗜 𝗠 𝗘 : ${moment.tz("Asia/Jakarta").format("HH:mm:ss")}`,
              jpegThumbnail: Thum
          }
      }
  }
  return pickRandom([fdocs, fgif, fkontak, fliveLoc, fpayment, fpoll, ftextt, ftoko, ftroli, fvid, fvn])
}*/

function SizeDoc() {
  return Math.pow(10, 15);
}
function PageDoc() {
  return Math.pow(10, 10);
}
