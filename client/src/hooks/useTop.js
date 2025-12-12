import { useEffect } from "react";

export default function useTop(params = null) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [params]);
}
