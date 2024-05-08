/*
 * Page routes list
 */

export const page_routes = {
  main: "/",
  dashboard: "/",
  users: "/users",
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
} as const;
