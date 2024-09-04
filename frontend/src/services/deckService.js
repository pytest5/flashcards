const BASE_URL = "/api/decks";

const HEADERS = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`,
};

// export const getDecksByUserId = async (userId) => {
//   const appendQuery = `?user=${userId}`;
//   try {
//     const response = await fetch(BASE_URL + appendQuery, {
//       headers: HEADERS,
//     });
//     if (!response.ok) {
//       throw new Error(`Response status: ${response.status}`);
//     }

//     const json = await response.json();
//     return json;
//   } catch (error) {
//     console.error(error.message);
//   }
// };

export async function getCurrentUserDecks() {
  try {
    const response = await fetch(`${BASE_URL}/currentUser`, { method: "GET", headers: HEADERS });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

export const getDecksBySubject = async (subject) => {
  const appendQuery = `?subject=${subject}`;
  try {
    const response = await fetch(BASE_URL + appendQuery, {
      headers: HEADERS,
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
  }
};

export const loadDeck = async (deckId) => {
  try {
    const response = await fetch(`${BASE_URL}/${deckId}`, {
      headers: HEADERS,
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
  }
};

export const createDeck = async (formData) => {
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
    return json;
  } catch (error) {
    console.error(error.message);
  }
};

export const deleteDeck = async (deckId) => {
  try {
    const response = await fetch(`${BASE_URL}/${deckId}`, {
      method: "DELETE",
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

export const editDeck = async (deckId, formData) => {
  const payload = formData;
  try {
    const response = await fetch(`${BASE_URL}/${deckId}`, {
      method: "PUT",
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
