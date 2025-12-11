"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Product } from "@/types/product";

interface ProductCardEnhancedProps {
  product: Product;
  index?: number;
}

export default function ProductCardEnhanced({
  product,
  index = 0,
}: ProductCardEnhancedProps) {
  const [isFavorited, setIsFavorited] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorited(!isFavorited);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ 
        y: -15, 
        scale: 1.06,
        transition: { 
          duration: 0.3,
          type: "spring",
          stiffness: 300,
          damping: 20
        }
      }}
      className="group relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        willChange: 'transform',
        transformStyle: "preserve-3d"
      }}
    >
      {/* Glassmorphic Card */}
      <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20">
        {/* 3D Tilt Effect Container */}
        <motion.div
          className="relative h-64 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 overflow-hidden"
          animate={{
            rotateX: isHovered ? 5 : 0,
            rotateY: isHovered ? 2 : 0,
            scale: isHovered ? 1.02 : 1,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          style={{ 
            transformStyle: "preserve-3d",
            perspective: "1000px"
          }}
        >
          {/* NFT Artwork or Placeholder */}
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
              <div className="text-6xl opacity-50">🎨</div>
            </div>
          )}

          {/* Overlay Gradient on Hover */}
          <div
            className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Quick View Overlay */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 10,
            }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center gap-3"
          >
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              View Details
            </motion.button>
          </motion.div>

          {/* Favorite Heart Icon */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all"
          >
            <motion.svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill={isFavorited ? "#ef4444" : "none"}
              stroke={isFavorited ? "#ef4444" : "#6b7280"}
              strokeWidth="2"
              animate={{ scale: isFavorited ? [1, 1.3, 1] : 1 }}
              transition={{ duration: 0.3 }}
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </motion.svg>
          </button>

          {/* Share Icon */}
          <button
            className="absolute top-3 left-3 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all"
            onClick={(e) => {
              e.stopPropagation();
              // Share functionality
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#6b7280"
              strokeWidth="2"
            >
              <circle cx="18" cy="5" r="3" />
              <circle cx="6" cy="12" r="3" />
              <circle cx="18" cy="19" r="3" />
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
            </svg>
          </button>
        </motion.div>

        {/* Card Content */}
        <div className="p-5">
          {/* Title with Gradient Text */}
          <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent line-clamp-1">
            {product.name}
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[2.5rem]">
            {product.description}
          </p>

          {/* Location and Category */}
          <div className="flex items-center justify-between mb-4">
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <span className="text-base">📍</span>
              {product.location.name}
            </span>
            {product.category && (
              <span className="text-xs bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                {product.category}
              </span>
            )}
          </div>

          {/* Price and Seller */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                NPR {product.price.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white text-xs font-bold">
                {product.sellerName.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm text-gray-500 hidden sm:block">
                {product.sellerName}
              </span>
            </div>
          </div>
        </div>

        {/* Glow Effect on Hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{
            background: isHovered
              ? "radial-gradient(circle at center, rgba(139, 92, 246, 0.3) 0%, transparent 70%)"
              : "transparent",
            boxShadow: isHovered
              ? "0 20px 60px rgba(139, 92, 246, 0.4), 0 0 40px rgba(59, 130, 246, 0.3)"
              : "none",
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}

