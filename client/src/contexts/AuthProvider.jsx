import usePersistedState from "../hooks/usePersistedState";
import { emails } from "../utils/constants/global";
import { AuthContext } from "./authContext";

export default function AuthProvider({ children }) {
  const [authToken, setAuthToken] = usePersistedState("authToken", "");
  const [email, setEmail] = usePersistedState("email", "");
  const [id, setId] = usePersistedState("userId", "");

  const userAuth = (authData) => {
    setAuthToken(authData ? authData.accessToken : "");
    setEmail(authData ? authData.email : "");
    setId(authData ? authData._id : "");
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
}
