// my-app/lib/userData.js

const API_URL = "https://user-api-1-vmga.onrender.com/api/user"; // Replace with your actual API URL
import { getToken } from './authenticate';

const headers = () => {
  const token = getToken();
  return {
    Authorization: `JWT ${token}`,
    'Content-Type': 'application/json',
  };
};

export const addToFavourites = async (id) => {
  const res = await fetch(`${API_URL}/favourites/${id}`, {
    method: 'PUT',
    headers: headers(),
  });
  if (res.status === 200) {
    return await res.json();
  }
  return [];
};

export const removeFromFavourites = async (id) => {
  const res = await fetch(`${API_URL}/favourites/${id}`, {
    method: 'DELETE',
    headers: headers(),
  });
  if (res.status === 200) {
    return await res.json();
  }
  return [];
};

export const getFavourites = async () => {
  const res = await fetch(`${API_URL}/favourites`, {
    method: 'GET',
    headers: headers(),
  });
  if (res.status === 200) {
    return await res.json();
  }
  return [];
};

export const addToHistory = async (id) => {
  const res = await fetch(`${API_URL}/history/${id}`, {
    method: 'PUT',
    headers: headers(),
  });
  if (res.status === 200) {
    return await res.json();
  }
  return [];
};

export const removeFromHistory = async (id) => {
  const res = await fetch(`${API_URL}/history/${id}`, {
    method: 'DELETE',
    headers: headers(),
  });
  if (res.status === 200) {
    return await res.json();
  }
  return [];
};

export const getHistory = async () => {
  const res = await fetch(`${API_URL}/history`, {
    method: 'GET',
    headers: headers(),
  });
  if (res.status === 200) {
    return await res.json();
  }
  return [];
};
