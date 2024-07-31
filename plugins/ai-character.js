import fetch from 'node-fetch';

export async function before(m) {
  this.characterai = this.characterai || {};

  if (m.isBaileys || !global.db.data.chats[m.chat].characterai || !m.text) return false;

  const text = m.text.replace(/[^\x00-\x7F]/g, '').trim();
  if (!text) return false;

  const characterNames = [
    "Homer Simpson","The Rock","Joe Rogan","Darth Vader","Logan Paul",
    "Snoop Dogg","Howard Stern","Tony Stark","Peter Griffin","Elon Musk",
    "Eminem","Jerry Seinfeld","Spongebob Squarepants","Billie Eilish",
    "Sherlock Holmes","Batman","Jimmy Fallon","Socrates","Harry Potter",
    "Andrew Tate","Santa Claus"
  ];

  const words = text.split(' ');

  if (words.length === 3 && words[0].toLowerCase() === 'characterai' && !isNaN(words[2])) {
    const characterNumber = parseInt(words[2]) - 1;
    if (characterNumber >= 0 && characterNumber < characterNames.length) {
      this.characterai.name = characterNames[characterNumber];
      await this.reply(m.chat, `*Nama karakter diubah menjadi: ${this.characterai.name}*`, m);
    } else {
      await this.reply(m.chat, `*Nomor karakter tidak valid*`, m);
      await this.reply(m.chat, `*List nama karakter:*\n${characterNames.join(', ')}`, m);
      return true;
    }
  } else if (text.trim().toLowerCase() === 'characterai stop') {
    this.characterai.name = ''; // Set character name to empty string to stop
    await this.reply(m.chat, `*Characterai telah dihentikan*`, m);
    return true;
  }

  // Memeriksa apakah karakter telah diatur sebelum memanggil API
  if (this.characterai.name) {
    const name = this.characterai.name;
    const url = `https://api.yanzbotz.my.id/api/ai/characterai?text=${encodeURIComponent(text)}&name=${encodeURIComponent(name)}`;
    try {
      const api = await fetch(url);
      const res = await api.json();
  
      if (res.result) {
        await this.reply(m.chat, `*${name}:*\n${res.result || ''}`, m);
      }
    } catch {
      // Handle errors here
    }
  }

  return true;
}