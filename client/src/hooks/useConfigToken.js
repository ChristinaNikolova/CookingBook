import useAuthContext from "./useAuthContext";

// todo check if good idea???
export default function useConfigToken() {
  const { user } = useAuthContext();
  const config = {
    authToken: user.authToken,
  };

  return config;
}
