import { createContext } from "react";

export const AuthContext = createContext({
  isAuthenticated: false,
  isAdmin: false,
  user: {
    id: "",
    authToken: "",
    email: "",
  },
  userAuth() {},
});
