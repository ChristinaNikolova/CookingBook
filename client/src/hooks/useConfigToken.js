import useAuthContext from "./useAuthContext";

export default function useConfigToken() {
  const { user } = useAuthContext();
  const config = {
    authToken: user.authToken,
  };

  return config;
}
