import fetch from "node-fetch";

let handler = async (m, { conn, args, usedPrefix, text, command }) => {
  let lister = ["v1", "v2"];

  let NoQuery = `{
  Page {
    media(type: ANIME, status: RELEASING, sort: POPULARITY_DESC) {
      title {
        romaji
        english
        native
      }
      episodes
      nextAiringEpisode {
        episode
        timeUntilAiring
      }
      id
      siteUrl
      coverImage {
        large
        color
      }
      studios(isMain: true) {
        edges {
          isMain
          node {
            name
            siteUrl
          }
        }
      }
    }
  }
}
`;

  let Query = `query ($search: String, $status: MediaStatus) {
  Media(type: ANIME, status: $status, search: $search) {
    title {
      romaji
      english
      native
    }
    episodes
    nextAiringEpisode {
      episode
      timeUntilAiring
    }
    id
    siteUrl
    coverImage {
      large
      color
    }
    studios(isMain: true) {
      edges {
        isMain
        node {
          name
          siteUrl
        }
      }
    }
  }
}`;

  let [feature, inputs, inputs_, inputs__, inputs___] = text.split("|");
  if (!lister.includes(feature))
    return m.reply(
      "*Example:*\n.anilisthql search|vpn\n\n*Pilih type yg ada*\n" +
        lister.map((v, index) => "  ○ " + v).join("\n")
    );

  if (lister.includes(feature)) {
    if (feature == "v1") {
      if (!inputs) return m.reply("Input query");
      await m.reply(wait);
      try {
        let res = await Anilist(NoQuery, {
          search: inputs,
        });
        let dats = res.data.Page.media;
        let teks = dats
          .map((item, index) => {
            return `*[ RESULT ${index + 1} ]*

📚 *Romaji:* ${item.title.romaji || "tidak diketahui"}
🌐 *English:* ${item.title.english || "tidak diketahui"}
🌸 *Native:* ${item.title.native || "tidak diketahui"}
🆔️ *ID:* ${item.id || "tidak diketahui"}
🔗 *Url:* ${item.siteUrl || "tidak diketahui"}
🖼️ *Cover:* ${item.coverImage.large || "tidak diketahui"}
🎨 *Color:* ${item.coverImage.color || "tidak diketahui"}
🎥 *Studio Name:* ${item.studios.edges[0].node.name || "tidak diketahui"}
🔗 *Site Url:* ${item.studios.edges[0].node.siteUrl || "tidak diketahui"}
`;
          })
          .filter((v) => v)
          .join("\n\n________________________\n\n");
        await m.reply(teks);
      } catch (e) {
        await m.reply(eror);
      }
    }

    if (feature == "v2") {
      if (!inputs) return m.reply("Input query");
      await m.reply(wait);
      try {
        let res = await Anilist(Query, {
          search: inputs,
        });
        let dats = [res.data.Media];
        let teks = dats
          .map((item, index) => {
            return `*[ RESULT ${index + 1} ]*

📚 *Romaji:* ${item.title.romaji || "tidak diketahui"}
🌐 *English:* ${item.title.english || "tidak diketahui"}
🌸 *Native:* ${item.title.native || "tidak diketahui"}
🆔️ *ID:* ${item.id || "tidak diketahui"}
🔗 *Url:* ${item.siteUrl || "tidak diketahui"}
🖼️ *Cover:* ${item.coverImage.large || "tidak diketahui"}
🎨 *Color:* ${item.coverImage.color || "tidak diketahui"}
🎥 *Studio Name:* ${item.studios.edges[0].node.name || "tidak diketahui"}
🔗 *Site Url:* ${item.studios.edges[0].node.siteUrl || "tidak diketahui"}
`;
          })
          .filter((v) => v)
          .join("\n\n________________________\n\n");
        await m.reply(teks);
      } catch (e) {
        await m.reply(eror);
      }
    }
  }
};
handler.help = ["anilisthql"];
handler.tags = ["search"];
handler.command = /^(anilisthql)$/i;
export default handler;

async function Anilist(query, variables) {
  return await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ query, variables }),
  })
    .then((res) => res.json())
    .catch((err) => err);
}
