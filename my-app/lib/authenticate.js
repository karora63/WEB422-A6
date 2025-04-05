// File: lib/authenticate.js

export function setToken(token) {
  localStorage.setItem('access_token', token);
}

export function getToken() {
  return localStorage.getItem('access_token');
}

export function removeToken() {
  localStorage.removeItem('access_token');
}

export function readToken() {
  const token = getToken();
  return token ? JSON.parse(atob(token.split('.')[1])) : null;
}

export function isAuthenticated() {
  const token = getToken();
  return token !== null;
}

export async function authenticateUser(user, password) {
  try {
    const res = await fetch('https://user-api-1-vmga.onrender.com/api/user/login', {
      method: "POST",
      body: JSON.stringify({ userName: user, password: password }),
      headers: {
        "content-type": "application/json",
      },
    });

    if (!res.ok) {
      const errorMessage = await res.text(); // Get the plain text response
      throw new Error(`Login failed: ${errorMessage}`);
    }

    const data = await res.json();

    if (res.status === 200) {
      setToken(data.token);  // Save token to localStorage
      return true;
    } else {
      throw new Error(data.message || 'Unknown error occurred during login');
    }
  } catch (err) {
    console.error("Authentication error:", err);
    throw new Error(`Authentication failed: ${err.message || err}`);
  }
}

export async function registerUser(user, password, password2) {
  try {
    const res = await fetch('https://user-api-1-vmga.onrender.com/api/user/register', {
      method: "POST",
      body: JSON.stringify({
        userName: user,
        password: password,
        password2: password2,
      }),
      headers: {
        "content-type": "application/json",
      },
    });

    if (!res.ok) {
      const errorMessage = await res.text(); // Get the plain text response
      throw new Error(`Registration failed: ${errorMessage}`);
    }

    const data = await res.json();

    if (res.status === 200) {
      return true;  // Registration successful
    } else {
      throw new Error(data.message || 'Unknown error occurred during registration');
    }
  } catch (err) {
    console.error("Registration error:", err);
    throw new Error(`Registration failed: ${err.message || err}`);
  }
}
