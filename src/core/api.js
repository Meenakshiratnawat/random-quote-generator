const BASE_URL = "https://api.quotable.io";

export async function getRandomQuote(tag) {
  let url = `${BASE_URL}/random`;

  if (tag) {
    url += `?tags=${tag}`;
  }

  const response = await fetch(url);
  const data = await response.json();

  return data;
}

export async function getTags() {
  const response = await fetch(`${BASE_URL}/tags`);
  const data = await response.json();

  return data;
}
