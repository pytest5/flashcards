const BASE_URL = "/api/cards";

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

<input type="date"></input>;
