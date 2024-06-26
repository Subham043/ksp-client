export const env = {
  API_ENDPOINT:
    import.meta.env.VITE_USER_NODE_ENV === "development"
      ? "http://localhost:8080/api"
      : "https://ksp-api.digisole.in/api",
  MAIN_URL:
    import.meta.env.VITE_USER_NODE_ENV === "development"
      ? "http://localhost:5173"
      : "https://ksp-client.digisole.in",
} as const;
