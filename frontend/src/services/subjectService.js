const BASE_URL = "/api/subjects";

const HEADERS = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`,
  };

export const getAllSubjects = async () => {
  try {
    const response = await fetch(BASE_URL, { method: "GET", headers: HEADERS });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
  }
};
