import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import useAuthContext from "../../../hooks/useAuthContext";
import { getTranslations } from "../../../utils/i18n";
import Loader from "../../Loader/Loader";
import { serverPaths } from "../../../utils/constants/global";

export default function Logout() {
  const { userAuth } = useAuthContext();
  const navigate = useNavigate();
  const t = getTranslations();

  const { loading } = useFetch(null, serverPaths.LOGOUT);

  useEffect(() => {
    if (!loading) {
      userAuth();
      navigate("/");
    }
  }, [loading, navigate, userAuth]);

  return <Loader text={t.loggingOut} />;
}
