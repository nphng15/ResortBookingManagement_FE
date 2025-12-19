// API Base URL configuration
// - Local dev: uses Vite proxy (/api/v1)
// - Production: uses VITE_BASE_URL from environment

export const API_BASE_URL = import.meta.env.VITE_BASE_URL
  ? `${import.meta.env.VITE_BASE_URL}/api/v1`
  : '/api/v1';
