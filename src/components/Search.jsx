import { useState } from "react";

export default function Search() {
  const [search, setSearch] = useState("");

  const URL = "https://dummyjson.com/products/search?q=";

  function handleSubmit(event) {
    event.preventDefault();
    if (!search || !search.length || search.trim().length < 1) return;
    const searchURI = encodeURIComponent(search.trim());
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Search..." onChange={(e) => setSearch(e.target.value)} />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
