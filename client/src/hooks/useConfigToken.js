import { useMemo } from "react";
import useAuthContext from "./useAuthContext";

export default function useConfigToken() {
  const { user } = useAuthContext();

  return useMemo(
    () => ({
      authToken: user.authToken,
    }),
    [user.authToken]
  );
}
