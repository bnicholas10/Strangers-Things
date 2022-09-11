export const BASE_URL =
  "https://strangers-things.herokuapp.com/api/2206-vpi-rm-web-pt";

export const fetchPosts = async (token) => {
  try {
    const url = `${BASE_URL}/posts`;
    // console.log(token);
    const response = await fetch(url, {
      headers: token
        ? {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        : { "Content-Type": "application/json" },
    });
    const info = await response.json();
    const postsList = info.data.posts;

    return postsList;
  } catch (error) {
    console.error(error);
  }
};

export const registerUser = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username,
          password,
        },
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const loginUser = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username,
          password,
        },
      }),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const fetchUser = async (token) => {
  if (!token) {
    return;
  }
  try {
    const response = await fetch(`${BASE_URL}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const info = await response.json();
    return info;
  } catch (error) {
    console.error(error);
  }
};

export const createPost = async (
  token,
  title,
  description,
  price,
  location,
  willDeliver
) => {
  try {
    const url = `${BASE_URL}/posts`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        post: {
          title,
          description,
          price,
          location,
          willDeliver,
        },
      }),
    });
    const info = await response.json();
    return info;
  } catch (error) {
    console.error(error);
  }
};

export const deletePost = async (postId, token) => {
  try {
    const url = `${BASE_URL}/posts/${postId}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const info = await response.json();
    return info;
  } catch (error) {
    console.error(error);
  }
};

export const sendMessage = async (postId, token, message) => {
  try {
    const url = `${BASE_URL}/posts/${postId}/messages`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        message: {
          content: message,
        },
      }),
    });
    const info = await response.json();
    return info;
  } catch (error) {
    console.error(error);
  }
};
