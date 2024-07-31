import axios from 'axios'
import fetch from 'node-fetch'
import cheerio from 'cheerio'
import { webp2png } from '../lib/webp2mp4.js'
let handler = async (m, { conn, args, usedPrefix, text, command }) => {
  try {
    if (!text) throw 'Input Text';

    const res = await getImages(encodeURIComponent(text), 1);
    if (!res.artworks || !res.artworks.edges || res.artworks.edges.length === 0) {
      throw 'No results found for the given text.';
    }

    const output = await apiResponse(res.artworks.edges[0].node.id);
    const outputImg = imageUrlFromResponse(output);

    if (!output.artwork) {
      throw 'Error fetching artwork information.';
    }

    let teks = `
🔍 *[ RESULT ]*

📚 Title: ${output.artwork.title}
🔗 Author: ${output.artwork.author.displayName}
📝 Created At: ${output.artwork.createdAt}
👥 Follower Count: ${output.artwork.author.followerCount}
👁️ Views: ${output.artwork.views}
`;

    conn.sendFile(m.chat, await webp2png((await conn.getFile(outputImg[0])).data), '', teks, m);
  } catch (error) {
    console.error(error);
    conn.reply(m.chat, `Error: ${error}`, m);
  }
};

handler.help = ['pixai']
handler.tags = ['internet']
handler.command = ['pixai']

export default handler

const baseURL = "https://api.pixai.art/graphql";

async function getImages(q, n = 5, isNsfw = false) {
  try {
    const response = await fetch(baseURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `
          query listArtworks($before: String, $after: String, $first: Int, $last: Int, $isNsfw: Boolean, $isPrivate: Boolean, $orderBy: String, $tag: String, $q: String, $relevantArtworkId: ID, $keyword: String, $text: String, $hidePrompts: Boolean, $authorName: String, $feed: String, $authorId: ID, $challenge: Int, $archived: Boolean, $isTheme: Boolean, $themeId: ID) {
            artworks(
              before: $before
              after: $after
              first: $first
              last: $last
              isNsfw: $isNsfw
              isPrivate: $isPrivate
              orderBy: $orderBy
              tag: $tag
              q: $q
              relevantArtworkId: $relevantArtworkId
              keyword: $keyword
              text: $text
              hidePrompts: $hidePrompts
              authorName: $authorName
              feed: $feed
              authorId: $authorId
              challenge: $challenge
              archived: $archived
              isTheme: $isTheme
              themeId: $themeId
            ) {
              edges {
                node {
                  ...ArtworkBase
                }
                cursor
              }
              pageInfo {
                hasNextPage
                hasPreviousPage
                endCursor
                startCursor
              }
              totalCount
            }
          }
          
          fragment ArtworkBase on Artwork {
            id
            title
            authorId
            authorName
            author {
              ...UserBase
            }
            mediaId
            prompts
            createdAt
            updatedAt
            media {
              ...MediaBase
            }
            isNsfw
            hidePrompts
            isPrivate
            tags {
              ...TagBase
            }
            extra
            likedCount
            liked
            views
            commentCount
            inspiredCount
            deriveThemeId
            rootThemeId
          }
          
          fragment UserBase on User {
            id
            email
            emailVerified
            username
            displayName
            createdAt
            updatedAt
            avatarMedia {
              ...MediaBase
            }
            followedByMe
            followingMe
            followerCount
            followingCount
            inspiredCount
            isAdmin
          }
          
          fragment MediaBase on Media {
            id
            type
            width
            height
            urls {
              variant
              url
            }
            imageType
            fileUrl
            duration
            thumbnailUrl
            hlsUrl
            size
          }
          
          fragment TagBase on Tag {
            id
            name
            mediaId
            media {
              ...MediaBase
            }
            category
            weight
            rootTagId
            createdAt
            updatedAt
            extra
          }
        `,
        variables: {
          isNsfw,
          q,
          first: n,
          feed: 'random',
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

async function apiResponse(artworkId) {
  const headers = {
    Referer: 'https://pixai.art/',
    'User-Agent':
      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/107.0.0.0 Safari/537.36',
  };

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: JSON.stringify({
      query: `
  query getArtwork($id: ID!) {
    artwork(id: $id) {
      ...ArtworkBase
    }
  }
  
  fragment ArtworkBase on Artwork {
    id
    title
    authorId
    authorName
    author {
      ...UserBase
    }
    mediaId
    prompts
    createdAt
    updatedAt
    media {
      ...MediaBase
    }
    isNsfw
    hidePrompts
    tags {
      id
      name
    }
    extra
    likedCount
    liked
    views
    commentCount
  }
  
  fragment UserBase on User {
    id
    email
    emailVerified
    username
    displayName
    createdAt
    updatedAt
    avatarMedia {
      ...MediaBase
    }
    followedByMe
    followingMe
    followerCount
    followingCount
    isAdmin
  }
  
  fragment MediaBase on Media {
    id
    type
    width
    height
    urls {
      variant
      url
    }
    imageType
    fileUrl
    duration
    thumbnailUrl
    hlsUrl
    size
  }
`,
      variables: {
        id: artworkId,
      },
    }),
  };

  try {
    const response = await fetch(baseURL, requestOptions);

    if (response.status === 200) {
      const data = await response.json();
      return data.data;
    }

    return {};
  } catch (error) {
    console.error(error);
    return {};
  }
}
function imageUrlFromResponse(response) {
    if (response && response.artwork && response.artwork.media) {
      return response.artwork.media.urls
        .filter((media) => media.variant === 'PUBLIC')
        .map((media) => media.url);
    }
    return [];
  }
  