const sentences = {
    noob: [
      "aku suka",
      "dia senang",
      "ayam enak",
      "rumah kota",
      "sungai tenang",
      "burung riang",
    ],
    easy: [
      "pagi semuanya",
      "terima kasih bantuanmu",
      "saya suka dirimu",
      "pohon memberikan teduh",
      "buah segar lezat",
      "warna bunga taman",
      "lautan biru tenang",
    ],
    normal: [
      "hujan turun langit",
      "burung terbang indah",
      "rumah sangat kecil",
      "laut warna biru indah",
      "pohon tinggi berdiri kokoh",
      "mobil besar warna merah",
      "pisang kuning rasanya manis",
      "sungai mengalir deras",
      "ayam bakar harum selera",
      "kapal layar laut luas",
    ],
    hard: [
      "bunga di kebun cantik",
      "pohon tinggi tepi sungai",
      "mobil sport melaju cepat",
      "pulau indah dikelilingi laut biru",
      "sungai mengalir hutan belantara",
      "matahari terbenam ufuk barat",
      "gunung tinggi menantang pendaki",
      "pantai eksotis berada selatan",
      "perpustakaan sangat besar lengkap",
      "taman dipenuhi bunga indah",
    ],
    extreme: [
      "pemandangan alam mengesankan hati",
      "gajah besar berjalan perlahan savana",
      "suasana malam gelap sepi",
      "burung hantu terbang malam hari",
      "rumah adat tradisional berdiri megah desa",
      "pulau terpencil tengah lautan luas",
      "gunung berapi meletus dahsyat",
      "air terjun tinggi jatuh gemuruh",
      "taman bermain tempat anak-anak riang",
      "kuda poni berlari padang rumput luas",
      "hutan tropis menyimpan flora fauna unik",
      "sungai jernih mengalir tengah lembah hijau",
    ],
  };
  
  const handler = async (m, { conn }) => {
    conn.susunKalimat = conn.susunKalimat || {};
    if (conn.susunKalimat[m.sender]) {
      return m.reply('Kamu sedang bermain Susun Kalimat!');
    }
  
    const levels = Object.keys(sentences);
    const randomLevel = levels[Math.floor(Math.random() * levels.length)];
    const randomSentences = sentences[randomLevel];
    const randomIndex = Math.floor(Math.random() * randomSentences.length);
  
    const originalSentence = randomSentences[randomIndex];
    const shuffledSentence = shuffleSentence(originalSentence);
  
    let { key } = await conn.reply(
      m.chat,
      `🧩 *Level*: ${randomLevel.toUpperCase()}\nSusun kalimat berikut ini menjadi benar:\n\n*${shuffledSentence.toLowerCase()}*\n\nKamu memiliki waktu *60 detik* untuk menjawab.`,
      m
    );
  
    conn.susunKalimat[m.sender] = {
      sender: m.sender,
      originalSentence,
      shuffledSentence,
      level: randomLevel,
      key: key,
      timeout: setTimeout(() => {
        if (conn.susunKalimat[m.sender]) {
          conn.sendMessage(m.chat, { delete: key });
          m.reply(`⌛ Waktu habis! Kamu gagal menyusun kalimat.\n*${originalSentence.toLowerCase()}*`);
          delete conn.susunKalimat[m.sender];
        }
      }, 60000 * 2),
    };
  };
  
  handler.before = async (m, { conn }) => {
    conn.susunKalimat = conn.susunKalimat || {};
    if (m.isBaileys || !(m.sender in conn.susunKalimat) || !m.text) return;
  
    const { originalSentence, sender, shuffledSentence, key, timeout } = conn.susunKalimat[m.sender];
  
    const isAnswerCorrect = m.text.toLowerCase() === originalSentence.toLowerCase();
    const similarityIndex = jaccardSimilarity(m.text.toLowerCase(), originalSentence.toLowerCase());
    const similarityThreshold = 0.8;
  
    if (isAnswerCorrect) {
      const level = conn.susunKalimat[m.sender].level;
      conn.reply(m.chat, `✨ *Selamat*, @${m.sender.split('@')[0]}! Kamu berhasil menyusun kalimat dengan benar pada *level ${level.toUpperCase()}*!`, m, { mentions: [m.sender] });
      conn.sendMessage(m.chat, { delete: key });
      clearTimeout(timeout);
      delete conn.susunKalimat[m.sender];
    } else if (similarityIndex >= similarityThreshold) {
      m.reply('Jawaban kamu *hampir benar*! Tapi belum tepat. Coba lagi ya.');
    } else if (m.text.toLowerCase() === 'hint') {
      const hint = originalSentence.replace(/[AIUEOaiueo]/ig, '_');
      m.reply(`🔍 *Clue*: ${hint}`);
    }
  };
  
  handler.help = ['susunkalimat'];
  handler.tags = ['game'];
  handler.command = /^(susunkalimat)$/i;
  handler.disabled = false;
  
  export default handler;
  
  function shuffleSentence(sentence) {
    const words = sentence.split(' ').filter((word) => word !== '');
    for (let i = words.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [words[i], words[j]] = [words[j], words[i]];
    }
    return words.join(' ');
  }
  
  function jaccardSimilarity(str1, str2) {
    const set1 = new Set(str1.toLowerCase().split(' '));
    const set2 = new Set(str2.toLowerCase().split(' '));
    const intersection = new Set([...set1].filter((word) => set2.has(word)));
    const union = new Set([...set1, ...set2]);
    const similarityScore = intersection.size / union.size;
    return similarityScore;
  }