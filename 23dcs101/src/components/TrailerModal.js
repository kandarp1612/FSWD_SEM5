import React, { useEffect, useState } from "react";
import { requests } from "../api/tmdb";

export default function TrailerModal({ item, onClose }) {
  const [videoKey, setVideoKey] = useState(null);
  const mediaType = item.media_type || (item.first_air_date ? "tv" : "movie");

  useEffect(() => {
    requests.fetchVideos(mediaType, item.id).then(data => {
      const videos = data.results || [];
      const trailer = videos.find(v => v.site === "YouTube" && v.type === "Trailer" && v.official) ||
                      videos.find(v => v.site === "YouTube" && v.type === "Trailer") ||
                      videos.find(v => v.site === "YouTube");
      if (trailer) setVideoKey(trailer.key);
    });
  }, [item, mediaType]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="relative w-full max-w-4xl bg-[#0b0b0b] rounded-md overflow-hidden">
        <button className="absolute right-3 top-3 z-20 bg-white/10 px-3 py-1 rounded" onClick={onClose}>
          Close
        </button>

        <div className="aspect-video bg-black">
          {videoKey ? (
            <iframe
              title="Trailer"
              src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
              allow="autoplay; encrypted-media; fullscreen"
              className="w-full h-full"
              frameBorder="0"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300">
              No trailer available
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
