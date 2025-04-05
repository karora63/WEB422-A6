// File: lib/userData.js

import { getToken } from './authenticate';  // Ensure the correct path

export async function addToFavourites(id) {
  const token = getToken();  // Call getToken to retrieve token

  if (!token) {
    throw new Error("User is not authenticated");
  }

  const res = await fetch(`https://user-api-1-vmga.onrender.com/api/user/favourites/${id}`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Authorization: `JWT ${token}`,
    },
  });

  const data = await res.json();

  if (res.status === 200) {
    return data;
  } else {
    return [];
  }
}

export async function removeFromFavourites(id) {
  const token = getToken();  // Call getToken to retrieve token

  if (!token) {
    throw new Error("User is not authenticated");
  }

  const res = await fetch(`https://user-api-1-vmga.onrender.com/api/user/favourites/${id}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: `JWT ${token}`,
    },
  });

  const data = await res.json();

  if (res.status === 200) {
    return data;
  } else {
    return [];
  }
}

export async function getFavourites() {
  const token = getToken();  // Call getToken to retrieve token

  if (!token) {
    throw new Error("User is not authenticated");
  }

  const res = await fetch('https://user-api-1-vmga.onrender.com/api/user/favourites', {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `JWT ${token}`,
    },
  });

  const data = await res.json();

  if (res.status === 200) {
    return data;
  } else {
    return [];
  }
}
