import { createContext } from "react";

export const AuthContext = createContext({
  userAuth() {},
  isAuthenticated: false,
  isAdmin: false,
  userId: "",
  authToken: "",
});
