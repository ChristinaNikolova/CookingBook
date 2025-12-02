import { createContext } from "react";
import usePersistedState from "../hooks/usePersistedState";
import { emails } from "../utils/constants/global";

// todo check Ivo implementation

export const AuthContext = createContext({
  userAuth() {},
  isAuthenticated: false,
  isAdmin: false,
  userId: "",
});

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = usePersistedState("authToken", "");
  const [email, setEmail] = usePersistedState("email", "");
  const [id, setId] = usePersistedState("userId", "");

  const userAuth = (authData) => {
    setAuthToken(authData ? authData.accessToken : "");
    setEmail(authData ? authData.user.email : "");
    setId(authData ? authData.user._id : "");
  };

  return (
    <AuthContext.Provider
      value={{
        userAuth,
        isAuthenticated: !!authToken,
        isAdmin: email === emails.ADMIN,
        userId: id,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
