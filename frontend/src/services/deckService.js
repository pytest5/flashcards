const BASE_URL = "/api/decks";

const HEADERS = {
  "Content-Type": "application/json",
  // Authorization: `Bearer ${import.meta.env.VITE_BACKEND_HEADER_AUTH}`,
};

export const getDecksByUserId = async (userId) => {
  const appendQuery = `?user=${userId}`;
  try {
    const response = await fetch(BASE_URL + appendQuery, {
      headers: HEADERS,
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    return json.records.map((record) => {
      return {
        record,
      };
    });
  } catch (error) {
    console.error(error.message);
  }
};

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
      console.log(json);
      return json.records.map((record) => {
        return {
          record,
        };
      });
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
    console.log(json);
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

export const deleteDeck = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/${userId}`, {
      method: "DELETE",
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

export const editDeck = async (userId, formData) => {
    const payload = formData;
  try {
    const response = await fetch(`${BASE_URL}/${userId}`, {
      method: "PUT",
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