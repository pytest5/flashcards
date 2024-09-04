const BASE_URL = "/api/cards";

const HEADERS = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`,
};

async function getCards() {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
}

export const getCardsByDeckId = async (deckId) => {
  const appendQuery = `?decks=${deckId}`;
  try {
    const response = await fetch(BASE_URL + appendQuery, {
      headers: HEADERS,
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.error(error.message);
  }
};

export const createCard = async (formData) => {
  const payload = formData;
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: HEADERS,
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.error(error.message);
  }
};