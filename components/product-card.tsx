import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="text-gray-400 text-4xl">🎨</div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-gray-500">
            📍 {product.location.name}
          </span>
          {product.category && (
            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
              {product.category}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="text-xl font-bold text-blue-600">
            NPR {product.price.toLocaleString()}
          </span>
          <span className="text-sm text-gray-500">by {product.sellerName}</span>
        </div>
      </div>
    </div>
  );
}






