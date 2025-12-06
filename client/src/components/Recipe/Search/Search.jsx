import useSearchContext from "../../../hooks/useSearchContext";

// todo show message with serached: maya...
export default function Search() {
  const { searchQuery } = useSearchContext();
  return (
    <section>
      <h2>Search</h2>
      <p>{searchQuery}</p>
    </section>
  );
}
