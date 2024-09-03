const BASE_URL = "/api/cards";

const HEADERS = {
  "Content-Type": "application/json",
  // Authorization: `Bearer ${import.meta.env.VITE_BACKEND_HEADER_AUTH}`,
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
    // return json.records.map((record) => {
    //   return {
    //     record,
    //   };
    // });
  } catch (error) {
    console.error(error.message);
  }
};
