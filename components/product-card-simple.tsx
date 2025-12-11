"use client";

import type { Product } from "@/types/product";

interface ProductCardSimpleProps {
  product: Product;
}

export default function ProductCardSimple({ product }: ProductCardSimpleProps) {
  return (
    <div className="group relative bg-white/80 backdrop-blur-xl rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20">
      {/* Image */}
      <div className="relative h-64 bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 overflow-hidden">
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
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent line-clamp-1">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 min-h-[2.5rem]">
          {product.description}
        </p>
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
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            NPR {product.price.toLocaleString()}
          </span>
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
    </div>
  );
}



