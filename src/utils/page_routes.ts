/*
 * Page routes list
 */

export const page_routes = {
  main: "/",
  dashboard: "/",
  users: "/users",
  installations: "/installations",
  auth: {
    login: "/login",
    forgot_password: "/forgot-password",
    reset_password: "/reset-password/:key",
  },
  account: {
    profile: "/profile",
  },
  criminals: {
    list: "/criminals",
    detail: "/criminals/:criminalId",
    view: (id: string | number) => `/criminals/${id}`,
  },
  crimes: {
    list: "/crimes",
    detail: "/crimes/:crimeId",
    view: (id: string | number) => `/crimes/${id}`,
  },
  punishment: {
    list: "/punishment",
    detail: "/punishment/:punishmentId",
    view: (id: string | number) => `/punishment/${id}`,
  },
  court_details: {
    list: "/court-details",
    detail: "/court-details/:courtDetailId",
    view: (id: string | number) => `/court-details/${id}`,
  },
} as const;
