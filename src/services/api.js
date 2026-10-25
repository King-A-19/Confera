const API_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:5000/api"
).replace(/\/$/, "");

async function request(endpoint, options = {}) {
  const token = localStorage.getItem("confera-token");

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {}),
      ...(options.headers || {}),
    },
  });

  const data = await response.json();

  if (!response.ok) {
    if (response.status === 401 && token) {
      localStorage.removeItem("confera-token");
      localStorage.removeItem("confera-user");

      if (window.location.pathname !== "/login") {
        window.location.replace("/login?session=expired");
      }
    }

    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export async function registerUser(userData) {
  return request("/auth/register", {
    method: "POST",
    body: JSON.stringify(userData),
  });
}

export async function loginUser(credentials) {
  return request("/auth/login", {
    method: "POST",
    body: JSON.stringify(credentials),
  });
}

export async function getEvents() {
  return request("/events");
}

export async function getEvent(id) {
  return request(`/events/${id}`);
}

export async function createEvent(eventData) {
  return request("/events", {
    method: "POST",
    body: JSON.stringify(eventData),
  });
}

export async function updateEvent(id, eventData) {
  return request(`/events/${id}`, {
    method: "PUT",
    body: JSON.stringify(eventData),
  });
}

export async function deleteEvent(id) {
  return request(`/events/${id}`, {
    method: "DELETE",
  });
}
