const BASE_URL = "/api/cards";

const HEADERS = () => {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`,
  };
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
      headers: HEADERS(),
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
      headers: HEADERS(),
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

export const createManyCards = async (formData, deckId) => {
  function transformData(data) {
    return data.map((i) => {
      const { _id, prompt: front, ...rest } = i;
      return {
        front,
        ...rest,
        isMultipleChoice: true,
        isChildFriendly: true,
        decks: [deckId],
      };
    });
  }
  try {
    const response = await fetch(`${BASE_URL}/batch`, {
      method: "POST",
      body: JSON.stringify(transformData(formData)),
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

export const deleteManyCards = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: "DELETE",
      body: JSON.stringify(formData),
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

export const updateManyCards = async (formData) => {
  try {
    const response = await fetch(`${BASE_URL}`, {
      method: "PUT",
      body: JSON.stringify(formData),
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
