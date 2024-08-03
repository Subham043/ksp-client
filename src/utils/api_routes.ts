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
  installations: "/installations",
  criminals: "/criminals",
  pdf: {
    crime: "/pdf/crime",
  },
  crimes: "/crimes",
  crimesByCriminals: "/crimes-by-criminals",
  courts: "/courts",
  hearings: "/hearings",
  jails: "/jails",
  visitors: "/visitors",
  upload: {
    images: "/upload/images",
    failed_excel: "/upload/failed-excel",
    sample_excel: "/upload/sample-excel",
  },
} as const;
