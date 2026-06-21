const USER_KEY = "plango_user";

export const saveLoggedInUser = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getLoggedInUser = () => {
  const rawUser = localStorage.getItem(USER_KEY);

  if (!rawUser) {
    return null;
  }

  try {
    return JSON.parse(rawUser);
  } catch (error) {
    localStorage.removeItem(USER_KEY);
    return null;
  }
};

export const getLoggedInUserId = () => {
  const user = getLoggedInUser();
  return user?.id || null;
};

export const getLoggedInUserRole = () => {
  const user = getLoggedInUser();
  return user?.role || null;
};

export const isLoggedIn = () => {
  return Boolean(getLoggedInUserId());
};

export const isAdmin = () => {
  return getLoggedInUserRole() === "ADMIN";
};

export const isCustomer = () => {
  return getLoggedInUserRole() === "CUSTOMER";
};

export const logout = () => {
  localStorage.removeItem(USER_KEY);
};