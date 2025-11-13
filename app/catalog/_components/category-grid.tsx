"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coffee, Cake, Sandwich, Wine, Sparkles, Check } from "lucide-react";
import { LucideIcon } from "lucide-react";

interface Category {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  color: string;
  bgGradient: string;
  iconBg: string;
  count: number;
  image: string;
}

export function CategoryGrid() {
  const router = useRouter();
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories: Category[] = [
    {
      id: "coffee",
      name: "Coffee",
      description: "Explore our premium coffee selection",
      icon: Coffee,
      color: "text-amber-700",
      bgGradient: "from-amber-50 to-orange-50",
      iconBg: "bg-amber-100",
      count: 13,
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop",
    },
    {
      id: "tea",
      name: "Tea",
      description: "Refresh with our tea collection",
      icon: Wine,
      color: "text-green-700",
      bgGradient: "from-green-50 to-emerald-50",
      iconBg: "bg-green-100",
      count: 3,
      image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=800&h=600&fit=crop",
    },
    {
      id: "pastry",
      name: "Pastries",
      description: "Freshly baked pastries and desserts",
      icon: Cake,
      color: "text-pink-700",
      bgGradient: "from-pink-50 to-rose-50",
      iconBg: "bg-pink-100",
      count: 5,
      image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=600&fit=crop",
    },
    {
      id: "food",
      name: "Food & Snacks",
      description: "Delicious meals and savory snacks",
      icon: Sandwich,
      color: "text-orange-700",
      bgGradient: "from-orange-50 to-amber-50",
      iconBg: "bg-orange-100",
      count: 6,
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&h=600&fit=crop",
    },
    {
      id: "all",
      name: "All Items",
      description: "Browse our complete menu",
      icon: Sparkles,
      color: "text-purple-700",
      bgGradient: "from-purple-50 to-pink-50",
      iconBg: "bg-purple-100",
      count: 26,
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop",
    },
  ];

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategories((prev) => {
      // If clicking "all", clear everything else and select only "all"
      if (categoryId === "all") {
        return prev.includes("all") ? [] : ["all"];
      }

      // If "all" is currently selected, deselect it and select the new category
      if (prev.includes("all")) {
        return [categoryId];
      }

      // Toggle the category
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  const handleBrowse = () => {
    if (selectedCategories.length === 0) {
      // If nothing selected, go to all items
      router.push("/menu");
      return;
    }

    if (selectedCategories.includes("all")) {
      // If "all" is selected, don't filter
      router.push("/menu");
    } else {
      // Create a comma-separated list of categories
      const categoryParam = selectedCategories.join(",");
      router.push(`/menu?category=${categoryParam}`);
    }
  };

  const isCategorySelected = (categoryId: string) => {
    return selectedCategories.includes(categoryId);
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-amber-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="bg-amber-100 p-3 rounded-full">
              <Sparkles className="h-8 w-8 text-amber-700" />
            </div>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Browse Our Catalog
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Select one or more categories to explore our carefully curated
            selection
          </p>
          {selectedCategories.length > 0 && (
            <div className="mt-4">
              <span className="text-sm text-amber-700 font-semibold">
                {selectedCategories.length} categor
                {selectedCategories.length === 1 ? "y" : "ies"} selected
              </span>
            </div>
          )}
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = isCategorySelected(category.id);
            return (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
              >
                <Card
                  className={`group relative overflow-hidden transition-all duration-500 hover:shadow-2xl rounded-2xl h-full cursor-pointer ${
                    isSelected
                      ? "border-4 border-amber-500 shadow-xl"
                      : "border-0 bg-white"
                  }`}
                >
                  {/* Background Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${
                        isSelected
                          ? "from-amber-600/70 to-transparent"
                          : "from-black/60 to-transparent"
                      } transition-colors duration-300`}
                    ></div>

                    {/* Selected Checkmark */}
                    {isSelected && (
                      <div className="absolute top-4 left-4 animate-in zoom-in duration-300">
                        <div className="bg-amber-500 p-2 rounded-full shadow-lg">
                          <Check className="h-5 w-5 text-white" />
                        </div>
                      </div>
                    )}

                    {/* Icon Overlay */}
                    <div className="absolute top-4 right-4">
                      <div
                        className={`${category.iconBg} p-3 rounded-full shadow-lg`}
                      >
                        <Icon className={`h-6 w-6 ${category.color}`} />
                      </div>
                    </div>

                    {/* Item Count Badge */}
                    <div className="absolute bottom-4 left-4">
                      <div className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                        <span className="text-sm font-bold text-gray-900">
                          {category.count} Items
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <CardContent
                    className={`p-6 bg-gradient-to-br ${category.bgGradient} ${
                      isSelected ? "ring-2 ring-amber-400 ring-inset" : ""
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3
                        className={`text-2xl font-bold transition-colors ${
                          isSelected
                            ? "text-amber-700"
                            : "text-gray-900 group-hover:text-amber-700"
                        }`}
                      >
                        {category.name}
                      </h3>
                      <div
                        className={`text-amber-600 transition-opacity ${
                          isSelected
                            ? "opacity-100"
                            : "opacity-0 group-hover:opacity-100"
                        }`}
                      >
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed">
                      {category.description}
                    </p>

                    {/* Selection Status */}
                    <div
                      className={`mt-4 flex items-center font-semibold transition-opacity ${
                        isSelected
                          ? "text-amber-700 opacity-100"
                          : "text-amber-700 opacity-0 group-hover:opacity-100"
                      }`}
                    >
                      <span className="text-sm">
                        {isSelected ? "Selected ✓" : "Click to Select"}
                      </span>
                    </div>
                  </CardContent>

                  {/* Decorative Corner Element */}
                  <div
                    className={`absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-amber-100/50 to-transparent rounded-tl-full transition-opacity duration-300 ${
                      isSelected
                        ? "opacity-100"
                        : "opacity-0 group-hover:opacity-100"
                    }`}
                  ></div>
                </Card>
              </div>
            );
          })}
        </div>

        {/* Browse Button */}
        {selectedCategories.length > 0 && (
          <div className="mt-12 flex justify-center animate-in slide-in-from-bottom-5 duration-500">
            <Button
              onClick={handleBrowse}
              size="lg"
              className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-bold text-lg px-12 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300"
            >
              Browse {selectedCategories.length === 1 ? "Category" : "Categories"}
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Button>
          </div>
        )}

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-700 mb-2">26+</div>
            <div className="text-sm text-gray-600">Total Items</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-700 mb-2">5</div>
            <div className="text-sm text-gray-600">Categories</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-700 mb-2">100%</div>
            <div className="text-sm text-gray-600">Fresh Daily</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-amber-700 mb-2">4.9★</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </div>
        </div>
      </div>
    </section>
  );
}




