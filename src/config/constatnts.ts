const baseUrl =
  `${process.env.REACT_APP_API_BACKEND}` || "http://localhost:4000";

export const routes = {
  login: "/api/v1/auth/login",
  register: "/api/v1/auth/register",
  profile: "/api/v1/user/profile",
  refresh: "/api/v1/auth/refresh",
  docs: "api/docs",
};

export const navigation = [
  {
    name: "API Documentation",
    href: baseUrl + "/api/docs",
    target: "_blank",
    key: "1",
  },
  {
    name: "Github",
    href: "https://github.com/mayur1106/eg-auth-frontend-",
    target: "_blank",
    key: "2",
  },
];
