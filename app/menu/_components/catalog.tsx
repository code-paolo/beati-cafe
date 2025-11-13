"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { products } from "@/app/data/products";
import { ProductCard } from "@/components/product-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  UtensilsCrossed,
  Search,
  SlidersHorizontal,
  X,
  Check,
} from "lucide-react";

type Category = "all" | "coffee" | "tea" | "pastry" | "food";
type SortOption =
  | "name-asc"
  | "name-desc"
  | "price-asc"
  | "price-desc"
  | "featured";

export function Catalog() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get URL parameters
  const categoryParam = searchParams.get("category") || "all";
  const sortParam = (searchParams.get("sort") as SortOption) || "featured";
  const searchParam = searchParams.get("search") || "";
  const minPriceParam = searchParams.get("minPrice");
  const maxPriceParam = searchParams.get("maxPrice");

  // Parse multiple categories from URL (comma-separated)
  const initialCategories =
    categoryParam === "all"
      ? ["all"]
      : categoryParam.split(",").filter((c) => c);

  // State
  const [selectedCategories, setSelectedCategories] =
    useState<string[]>(initialCategories);
  const [sortBy, setSortBy] = useState<SortOption>(sortParam);
  const [searchQuery, setSearchQuery] = useState(searchParam);
  const [minPrice, setMinPrice] = useState(minPriceParam || "");
  const [maxPrice, setMaxPrice] = useState(maxPriceParam || "");
  const [showFilters, setShowFilters] = useState(false);

  const categories: { label: string; value: Category }[] = [
    { label: "All Items", value: "all" },
    { label: "Coffee", value: "coffee" },
    { label: "Tea", value: "tea" },
    { label: "Pastries", value: "pastry" },
    { label: "Food & Snacks", value: "food" },
  ];

  const sortOptions: { label: string; value: SortOption }[] = [
    { label: "Featured First", value: "featured" },
    { label: "Name (A-Z)", value: "name-asc" },
    { label: "Name (Z-A)", value: "name-desc" },
    { label: "Price (Low to High)", value: "price-asc" },
    { label: "Price (High to Low)", value: "price-desc" },
  ];

  // Update URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();

    // Handle multiple categories
    if (selectedCategories.length > 0 && !selectedCategories.includes("all")) {
      params.set("category", selectedCategories.join(","));
    }

    if (sortBy !== "featured") {
      params.set("sort", sortBy);
    }

    if (searchQuery) {
      params.set("search", searchQuery);
    }

    if (minPrice) {
      params.set("minPrice", minPrice);
    }

    if (maxPrice) {
      params.set("maxPrice", maxPrice);
    }

    const queryString = params.toString();
    const newUrl = queryString ? `/menu?${queryString}` : "/menu";

    router.push(newUrl, { scroll: false });
  }, [selectedCategories, sortBy, searchQuery, minPrice, maxPrice, router]);

  // Filter and sort products
  let filteredProducts = products;

  // Filter by category (handle multiple categories)
  if (selectedCategories.length > 0 && !selectedCategories.includes("all")) {
    filteredProducts = filteredProducts.filter((product) =>
      selectedCategories.includes(product.category)
    );
  }

  // Filter by search query
  if (searchQuery) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Filter by price range
  if (minPrice) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price >= parseFloat(minPrice)
    );
  }
  if (maxPrice) {
    filteredProducts = filteredProducts.filter(
      (product) => product.price <= parseFloat(maxPrice)
    );
  }

  // Sort products
  filteredProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "featured":
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const handleCategoryChange = (category: Category) => {
    // If clicking "all", select only "all"
    if (category === "all") {
      setSelectedCategories(["all"]);
      return;
    }

    setSelectedCategories((prev) => {
      // If "all" is currently selected, deselect it and select the new category
      if (prev.includes("all")) {
        return [category];
      }

      // Toggle the category
      if (prev.includes(category)) {
        const newCategories = prev.filter((c) => c !== category);
        // If nothing left, default to "all"
        return newCategories.length === 0 ? ["all"] : newCategories;
      } else {
        return [...prev, category];
      }
    });
  };

  const isCategorySelected = (category: Category) => {
    return selectedCategories.includes(category);
  };

  const clearFilters = () => {
    setSelectedCategories(["all"]);
    setSortBy("featured");
    setSearchQuery("");
    setMinPrice("");
    setMaxPrice("");
    router.push("/menu", { scroll: false });
  };

  const hasActiveFilters =
    !selectedCategories.includes("all") ||
    sortBy !== "featured" ||
    searchQuery ||
    minPrice ||
    maxPrice;

  return (
    <section className="py-20 bg-linear-to-b from-white to-amber-50 min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="bg-amber-100 p-3 rounded-full">
              <UtensilsCrossed className="h-8 w-8 text-amber-700" />
            </div>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
            Our Menu
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated selection of specialty coffee, teas,
            and freshly baked treats
          </p>
        </div>

        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-6 flex justify-between items-center">
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="border-2 border-amber-700 text-amber-700 hover:bg-amber-50"
          >
            <SlidersHorizontal className="w-4 h-4 mr-2" />
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>

          {hasActiveFilters && (
            <Button
              onClick={clearFilters}
              variant="outline"
              className="border-2 border-red-500 text-red-600 hover:bg-red-50"
            >
              <X className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          )}
        </div>

        {/* Main Flex Container */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* LEFT SIDEBAR - Filters */}
          <aside
            className={`lg:w-80 flex-shrink-0 ${
              showFilters ? "block" : "hidden lg:block"
            }`}
          >
            <Card className="sticky top-24 border-0 shadow-xl bg-white rounded-2xl overflow-hidden mb-8">
              <CardContent className="p-4">
                {/* Filter Header */}
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
                    <SlidersHorizontal className="w-4 h-4 text-amber-700" />
                    Filters
                  </h3>
                  {hasActiveFilters && (
                    <Button
                      onClick={clearFilters}
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50 h-7 px-2 text-xs"
                    >
                      <X className="w-3 h-3 mr-1" />
                      Clear
                    </Button>
                  )}
                </div>

                {/* Search */}
                <div className="mb-4">
                  <label className="text-xs font-semibold text-gray-700 mb-1.5 block">
                    Search
                  </label>
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search products..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-8 h-9 text-sm border-2 border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="border-t border-gray-200 my-4"></div>

                {/* Category Filter */}
                <div className="mb-4">
                  <label className="text-xs font-semibold text-gray-700 mb-2 block">
                    Category (Multi-Select)
                  </label>
                  <div className="space-y-1.5">
                    {categories.map((category) => {
                      const isSelected = isCategorySelected(category.value);
                      return (
                        <button
                          key={category.value}
                          onClick={() => handleCategoryChange(category.value)}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-all text-sm flex items-center justify-between ${
                            isSelected
                              ? "bg-amber-700 text-white shadow-md"
                              : "bg-gray-50 text-gray-700 hover:bg-amber-50 border border-gray-200"
                          }`}
                        >
                          <span>{category.label}</span>
                          {isSelected && category.value !== "all" && (
                            <Check className="w-4 h-4" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="border-t border-gray-200 my-4"></div>

                {/* Sort By */}
                <div className="mb-4">
                  <label className="text-xs font-semibold text-gray-700 mb-1.5 block">
                    Sort By
                  </label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="w-full px-3 py-2 text-sm border-2 border-amber-200 rounded-lg focus:border-amber-500 focus:ring-amber-500 bg-white h-9"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="border-t border-gray-200 my-4"></div>

                {/* Price Range */}
                <div>
                  <label className="text-xs font-semibold text-gray-700 mb-2 block">
                    Price Range
                  </label>
                  <div className="space-y-2">
                    <div>
                      <label className="text-xs text-gray-600 mb-1 block">
                        Min Price
                      </label>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="$0.00"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        className="h-9 text-sm border-2 border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-600 mb-1 block">
                        Max Price
                      </label>
                      <Input
                        type="number"
                        step="0.01"
                        min="0"
                        placeholder="$99.99"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        className="h-9 text-sm border-2 border-amber-200 focus:border-amber-500 focus:ring-amber-500"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* RIGHT SIDE - Products */}
          <div className="flex-1">
            {/* Results Count */}
            <div className="mb-6 flex justify-between items-center">
              <p className="text-gray-600">
                Showing{" "}
                <span className="font-bold text-amber-700">
                  {filteredProducts.length}
                </span>{" "}
                of <span className="font-bold">{products.length}</span> items
              </p>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-20">
                <div className="bg-amber-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  <Search className="w-10 h-10 text-amber-700" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  No items found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your filters or search query
                </p>
                <Button
                  onClick={clearFilters}
                  className="bg-amber-700 hover:bg-amber-800 text-white rounded-full px-8"
                >
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
