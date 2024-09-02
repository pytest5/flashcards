const BASE_URL = "/api/users";

const HEADERS = {
  "Content-Type": "application/json",
  // Authorization: `Bearer ${import.meta.env.VITE_BACKEND_HEADER_AUTH}`,
};

export const getUserById = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/${userId}`, {
      headers: HEADERS,
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
    return { id: json._id, username: json.userName };
  } catch (error) {
    console.error(error.message);
  }
};

export const createUser = async (formData) => {
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
    return { id: json._id, username: json.userName };
  } catch (error) {
    console.error(error.message);
  }
};

export const deleteUser = async (userId) => {
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
