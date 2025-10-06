import React, { useEffect, useState } from "react";

function Row({ title, fetchUrl }) {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(fetchUrl);
      const data = await res.json();
      if (data.Response === "True" && data.Search) {
        setMovies(data.Search);
        setError("");
      } else {
        setMovies([]);
        setError(data.Error || "No movies found");
      }
    }
    fetchData();
  }, [fetchUrl]);

  if (error) return <div className="text-red-500 ml-6 mt-2">{title}: {error}</div>;

  return (
    <div className="ml-6 mt-6">
      <h2 className="text-lg md:text-2xl font-bold mb-2">{title}</h2>
      <div className="flex overflow-x-scroll space-x-4 p-2 scrollbar-hide">
        {movies.map((movie) => (
          <div key={movie.imdbID} className="relative group cursor-pointer">
            <img
              className="w-40 h-60 object-cover rounded-md shadow-lg transform transition duration-300 group-hover:scale-105 group-hover:brightness-110"
              src={movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"}
              alt={movie.Title}
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-center p-2 rounded-md">
              <p className="text-xs md:text-sm">{movie.Title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Row;
