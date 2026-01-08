"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Donor } from "@/types/donor";

interface DonorCardEnhancedProps {
  donor: Donor;
  index?: number;
}

export default function DonorCardEnhanced({
  donor,
  index = 0,
}: DonorCardEnhancedProps) {

  const [isHovered, setIsHovered] = useState(false);



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
                  <motion.div className="relative h-64 bg-gradient-to-br from-red-400 via-red-500 to-red-600 overflow-hidden"
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
                  {donor.image ? (
                    <img
                      src={donor.image}
                      alt={donor.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-100 via-red-100 to-red-200">
                      <div className="text-6xl opacity-50">🩸</div>
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
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
            >
              View Donor Profile
            </motion.button>
          </motion.div>


        </motion.div>

        {/* Card Content */}
        <div className="p-5">
          {/* Title with Gradient Text */}
          <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent line-clamp-1">
            {donor.name}
          </h3>

          {/* Blood Group */}
          <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[2.5rem]">
            Blood Group: {donor.bloodGroup}
          </p>

          {/* Location and Contact */}
          <div className="flex items-center justify-between mb-4">
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <span className="text-base">📍</span>
              {donor.location.name}
            </span>
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <span className="text-base">📞</span>
              {donor.contact}
            </span>
          </div>

          {/* Contact and Donor */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div>
              <span className="text-sm text-gray-500">Last Donation: </span>
              <span className="text-sm font-bold text-gray-800">
                {donor.lastDonation}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white text-xs font-bold">
                {donor.name.charAt(0).toUpperCase()}
              </div>
              <span className="text-sm text-gray-500 hidden sm:block">
                {donor.name}
              </span>
            </div>
          </div>
          <div className="text-sm text-gray-500 mt-2">
            Availability:{" "}
            <span className="font-bold text-gray-800">
              {donor.availability}
            </span>
          </div>
        </div>

        {/* Glow Effect on Hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          animate={{
            background: isHovered
              ? "radial-gradient(circle at center, rgba(255, 0, 0, 0.3) 0%, transparent 70%)"
              : "transparent",
            boxShadow: isHovered
              ? "0 20px 60px rgba(255, 0, 0, 0.4), 0 0 40px rgba(255, 0, 0, 0.3)"
              : "none",
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </motion.div>
  );
}

