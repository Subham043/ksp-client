/*
 * API routes list
 */

export const api_routes = {
  dashboard: "/dashboard",
  auth: {
    login: "/auth/login",
    forgot_password: "/auth/forgot-password",
    reset_password: "/auth/reset-password",
    logout: "/auth/logout",
  },
  account: {
    profile: "/account/profile",
    password: "/account/password",
  },
  users: "/users",
  criminals: "/criminals",
  pdf: {
    crime: "/pdf/crime",
  },
  crimes: "/crimes",
  courts: "/courts",
  jails: "/jails",
  upload: {
    images: "/upload/images",
    failed_excel: "/upload/failed-excel",
  },
} as const;
