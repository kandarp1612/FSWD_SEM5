import React from "react";
import { motion } from "framer-motion";
import { IMAGE_BASE } from "../api/tmdb";

export default function MovieCard({ item, isLarge, onClick }) {
  const imgPath = item.poster_path || item.backdrop_path;
  return (
    <motion.div
      className={`min-w-[140px] md:min-w-[200px] cursor-pointer ${isLarge ? 'min-h-[280px]' : 'min-h-[120px]'}`}
      whileHover={{ scale: 1.06 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={onClick}
    >
      <img
        src={`${IMAGE_BASE}${imgPath}`}
        alt={item.title || item.name}
        className={`rounded-md object-cover w-full ${isLarge ? 'h-[280px]' : 'h-[140px]'}`}
      />
    </motion.div>
  );
}
