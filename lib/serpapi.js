import fetch from 'node-fetch';

export async function generateSerpApiUrl(data) {
  const params = new URLSearchParams(data);
  const url = `https://serpapi.com/search.json?${params.toString()}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Request failed');
    }

    const result = await response.json();
    return result;
  } catch (error) {
    throw new Error(`Failed to fetch data: ${error.message}`);
  }
}