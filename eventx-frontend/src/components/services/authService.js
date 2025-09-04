import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


export const loginService = (credentials) => api.post("/auth/login", credentials);
export const registerService = (data) => api.post("/auth/register", data);
export const logoutService = () => api.post("/auth/logout");
export const meService = () => api.get("/auth/me");

export const createEventService = (payload) => api.post("/events", payload);
export const publishEventService = (id) => api.post(`/events/${id}/publish`);
export const updateEventService = (id, payload) => api.put(`/events/${id}`, payload);
export const deleteEventService = (id) => api.delete(`/events/${id}`);
export const listEventsService = (params) => api.get("/events", { params });
export const getEventService = (id) => api.get(`/events/${id}`);
// Book ticket
export const bookTicketService = (payload) => api.post("/tickets/book", payload);

// Get logged-in user tickets
export const myTicketsService = () => api.get("/tickets/my");

// Get single ticket details
export const getTicketService = (id) => api.get(`/tickets/${id}`);

export const getAllTicketsService = () => api.get("/tickets");
// Admin: Check-in ticket
export const checkInService = (payload) =>
  api.post("/tickets/check-in", payload);
export const exportAnalyticsService = async () => {
  return api.get("/analytics/export", { responseType: "blob" }); // blob for file download
};

// Get the main dashboard summary (revenue, tickets sold, etc.)
export const getSummaryService = () => api.get("/analytics/summary");

// Get attendee demographic data (age, gender, location)
export const getDemographicsService = () => api.get("/analytics/demographics");

// Get analytics for a single, specific event
export const getPerEventAnalyticsService = (eventId) => api.get(`/analytics/events/${eventId}`);
export const getSalesTrendService = () => api.get("/analytics/sales-trend");

export default api;