import fetch from "node-fetch";

export const regexPattern = /(?:doodstream|dood|dooood|ds2play)(?:.*)\/(?:d\/|e\/)([A-z0-9]+)/;

export async function generatePlayUrl(inputText) {
  const match = inputText.match(regexPattern);
  if (!match) {
    console.error("Input tidak sesuai dengan regex pattern.");
    throw new Error("Input tidak sesuai dengan regex pattern.");
  }

  const encryptedId = match[1];
  const apiUrl = `https://api.delivrjs.workers.dev/encrypt/${encryptedId}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const playUrl = `https://xstreampro.pages.dev/play.html?id=${data.encryptId}&host=doodstream`;
    return playUrl;
  } catch (error) {
    console.error("Terjadi kesalahan dalam fetch:", error);
    throw error;
  }
}