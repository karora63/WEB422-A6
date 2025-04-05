// my-app/lib/authenticate.js

const API_URL = "https://user-api-1-vmga.onrender.com/api/user"; // Replace with your actual API URL

export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const getToken = () => {
  if (typeof window === 'undefined') {
    return null; // Return null if not on the client-side
  }
  return localStorage.getItem('token');
};

export const removeToken = () => {
  localStorage.removeItem('token');
};
export const readToken = () => {
  const token = getToken();
  if (!token) {
    return null; // If there's no token, return null to avoid further errors
  }
  try {
    return JSON.parse(atob(token.split('.')[1])); // Decode JWT token
  } catch (error) {
    console.error('Error decoding token:', error);
    return null; // Return null if decoding fails
  }
};


export const isAuthenticated = () => {
  const token = getToken();
  return token && Date.now() / 1000 < readToken().exp;
};

export const authenticateUser = async (user, password) => {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    body: JSON.stringify({ userName: user, password }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (res.status === 200) {
    const data = await res.json();
    setToken(data.token);
    return true;
  }
  return false;
};

export const registerUser = async (user, password, password2) => {
  const res = await fetch(`${API_URL}/register`, {
    method: 'POST',
    body: JSON.stringify({ userName: user, password, password2 }),
    headers: { 'Content-Type': 'application/json' },
  });
  if (res.status === 200) {
    return true;
  }
  return false;
};
