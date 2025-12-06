import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export default function Search() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchedRecipes, setSearchedRecipes] = useState([]);

  useEffect(() => {}, []);

  return (
    <section>
      <h2>Search</h2>
      <p>{query}</p>
    </section>
  );
}
