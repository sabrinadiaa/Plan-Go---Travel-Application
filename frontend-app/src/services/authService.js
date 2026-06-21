import api from "./api";

export const login = (email, password) => {
  return api.post("/auth/login", {
    email: email,
    password: password,
  });
};

export const register = (username, email, password) => {
  return api.post("/auth/register", {
    username: username,
    email: email,
    password: password,
  });
};