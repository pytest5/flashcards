const BASE_URL = "/api/users";

const HEADERS = () => {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${JSON.parse(localStorage.getItem("jwt"))}`,
  };
};

export async function getCurrentUser() {
  try {
    const response = await fetch(`${BASE_URL}/currentUser`, {
      method: "GET",
      headers: HEADERS(),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    return json;
  } catch (error) {
    console.error(error.message);
  }
}

export const getUserById = async (userId) => {
  try {
    const response = await fetch(`${BASE_URL}/${userId}`, {
      headers: HEADERS(),
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
      headers: HEADERS(),
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
      headers: HEADERS(),
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

export const login = async (data) => {
  try {
    const response = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: HEADERS(),
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const token = await response.json();
    localStorage.setItem("jwt", JSON.stringify(token));
    return token;
  } catch (error) {
    console.error(error.message);
  }
};

export const logout = async () => {
  try {
    const response = await fetch(`${BASE_URL}/logout`, {
      method: "GET",
      headers: HEADERS(),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error.message);
  }
};
