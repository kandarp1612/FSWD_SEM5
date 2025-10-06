import React, { useEffect, useState } from "react";
import requests from "../requests";

export default function Banner() {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch(requests.trending);
      const data = await res.json();
      if (data.Response === "True") {
        const random = data.Search[Math.floor(Math.random() * data.Search.length)];
        setMovie(random);
      }
    }
    fetchData();
  }, []);

  if (!movie) return <div className="h-[20vh] bg-gradient-to-b from-gray-900 to-black"></div>;

  return (
    <header className="relative text-white h-[70vh]">
      <div
        className="absolute inset-0 bg-center bg-cover transition-transform duration-500 hover:scale-105"
        style={{ backgroundImage: `url(${movie.Poster !== "N/A" ? movie.Poster : "/no-image.png"})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/70 flex flex-col justify-end p-8 md:p-16">
        <h1 className="text-3xl md:text-5xl font-bold mb-4 drop-shadow-lg">{movie.Title}</h1>
        <p className="text-sm md:text-base mb-4 max-w-xl drop-shadow-lg">Year: {movie.Year}</p>
        <div className="flex space-x-4">
          <button className="bg-white text-black px-6 py-2 rounded font-semibold shadow hover:bg-gray-300 transition">Play</button>
          <button className="bg-gray-800/70 text-white px-6 py-2 rounded font-semibold shadow hover:bg-gray-700 transition">My List</button>
        </div>
      </div>
    </header>
  );
}
