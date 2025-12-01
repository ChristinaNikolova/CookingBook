import { useEffect } from "react";

export default function useTop() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
}
