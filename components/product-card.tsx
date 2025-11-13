"use client";

import { Product } from "@/app/types";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star, Sparkles, Heart } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useAuth } from "@/context/auth-context";
import { ToastContext } from "@/components/ui/toast";
import { useContext, useState } from "react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { isAuthenticated, openLogin } = useAuth();
  const toastContext = useContext(ToastContext);
  const [isLiked, setIsLiked] = useState(false);

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      // Show toast and open login modal
      if (toastContext) {
        toastContext.toast({
          title: "Login Required",
          description: "Please log in to add items to your cart.",
          variant: "warning",
        });
      }
      openLogin();
      return;
    }

    addItem(product);

    if (toastContext) {
      toastContext.toast({
        title: "Added to cart!",
        description: `${product.name} has been added to your cart.`,
        variant: "success",
      });
    }
  };

  const handleLikeToggle = () => {
    if (!isAuthenticated) {
      // Show toast and open login modal
      if (toastContext) {
        toastContext.toast({
          title: "Login Required",
          description: "Please log in first to add items to favorites.",
          variant: "warning",
        });
      }
      openLogin();
      return;
    }

    // If authenticated, toggle the like
    setIsLiked(!isLiked);

    if (toastContext) {
      toastContext.toast({
        title: isLiked ? "Removed from favorites" : "Added to favorites",
        description: isLiked
          ? `${product.name} has been removed from your favorites.`
          : `${product.name} has been added to your favorites.`,
        variant: isLiked ? "info" : "success",
      });
    }
  };

  return (
    <Card className="group relative overflow-hidden transition-all duration-500 border-0 hover:shadow-2xl bg-white rounded-2xl h-full flex flex-col">
      {/* Image Container with Overlay Effects */}
      <div className="relative overflow-hidden aspect-square">
        {/* Image with zoom effect */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
        />

        {/* Gradient Overlay on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Featured Badge with Animation */}
        {product.featured && (
          <Badge className="absolute top-4 right-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white border-0 shadow-lg animate-pulse">
            <Sparkles className="w-3 h-3 mr-1 fill-white" />
            Featured
          </Badge>
        )}

        {/* Like Button */}
        <button
          onClick={handleLikeToggle}
          className="absolute top-4 left-4 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:scale-110 transition-transform duration-200"
        >
          <Heart
            className={`w-5 h-5 transition-colors ${
              isLiked ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </button>

        {/* Quick View Badge - Shows on Hover */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <div className="bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-lg">
            <p className="text-xs text-gray-600 line-clamp-2">
              {product.description}
            </p>
          </div>
        </div>
      </div>

      {/* Content Container */}
      <div className="flex flex-col flex-grow p-6 bg-gradient-to-b from-white to-amber-50/30">
        {/* Category Badge */}
        <Badge
          variant="outline"
          className="w-fit text-xs border-amber-300 text-amber-700 bg-amber-50 capitalize mb-3 font-semibold"
        >
          {product.category}
        </Badge>

        {/* Product Name with Icon */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-amber-700 transition-colors flex items-center gap-2">
          {product.name}
          {product.featured && (
            <Star className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse" />
          )}
        </h3>

        {/* Price Below Name */}
        <div className="mb-3">
          <span className="text-2xl font-bold text-amber-700">
            ${product.price.toFixed(2)}
          </span>
        </div>

        {/* Rating Stars */}
        <div className="flex gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
          ))}
          <span className="text-xs text-gray-500 ml-1">(4.9)</span>
        </div>

        {/* Spacer */}
        <div className="flex-grow"></div>

        {/* Action Button with Enhanced Design */}
        <Button
          onClick={handleAddToCart}
          className="w-full bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white rounded-xl group-hover:shadow-lg transition-all mt-4 font-semibold text-base py-6 relative overflow-hidden"
        >
          {/* Shimmer Effect */}
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          <ShoppingCart className="w-5 h-5 mr-2" />
          Add to Cart
        </Button>
      </div>

      {/* Decorative Corner Elements */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-amber-100/50 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-orange-100/50 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </Card>
  );
}
