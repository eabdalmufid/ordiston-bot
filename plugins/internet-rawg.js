import fetch from "node-fetch"

let handler = async (m, {
    conn,
    usedPrefix,
    text,
    args,
    command
}) => {
    let name = await conn.getName(m.sender)
    
    if (command == 'rawggame') {
    if (!text) throw "input id"
    let cari = await fetchGame(text)
    throw cari
    }
    if (command == 'rawgsearch') {
    if (!text) throw "input search"
    let cari = await fetchGamesBySearch(text)
    throw cari
    }
    if (command == 'rawggenre') {
    let cari = await fetchGenres()
    throw cari
    }
    
}
handler.tags = ["search"]
handler.command = handler.help = ["rawggame", "rawgsearch", "rawggenre"]

export default handler

async function fetchGame(id) {
  const response = await fetch(`https://api.rawg.io/api/games/${id}?key=df0a6dbf13504aefb411f7298892a149`);
  const json = await response.json();
  return json;
};

async function fetchGamesBySearch(query) {
  const response = await fetch(`https://api.rawg.io/api/games?key=df0a6dbf13504aefb411f7298892a149&search=${query}`);
  const json = await response.json();
  return json.results;
};

async function fetchGenres() {
  const response = await fetch('https://api.rawg.io/api/genres?key=df0a6dbf13504aefb411f7298892a149&ordering=-games_count&page_size=10');
  const json = await response.json();
  return json.results;
};