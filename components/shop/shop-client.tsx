"use client";

import { useState, useMemo } from "react";
import { ProductGrid } from "@/components/sections/product-grid";
import { FaSearch, FaFilter, FaChevronDown, FaChevronUp } from "react-icons/fa";

interface ShopClientProps {
    initialProducts: any[];
}

export function ShopClient({ initialProducts }: ShopClientProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [sortOption, setSortOption] = useState("newest");
    const [priceRange, setPriceRange] = useState<{ min: string; max: string }>({
        min: "",
        max: "",
    });
    const [filtersOpen, setFiltersOpen] = useState(false);

    const filteredProducts = useMemo(() => {
        let result = [...initialProducts];

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            result = result.filter(
                (p) =>
                    p.name.toLowerCase().includes(query) ||
                    p.description?.toLowerCase().includes(query)
            );
        }

        if (priceRange.min) {
            result = result.filter((p) => p.price >= Number(priceRange.min));
        }
        if (priceRange.max) {
            result = result.filter((p) => p.price <= Number(priceRange.max));
        }

        switch (sortOption) {
            case "price-asc":
                result.sort((a, b) => a.price - b.price);
                break;
            case "price-desc":
                result.sort((a, b) => b.price - a.price);
                break;
            case "name-asc":
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "newest":
            default:
                result.sort(
                    (a, b) =>
                        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                );
                break;
        }

        return result;
    }, [initialProducts, searchQuery, priceRange, sortOption]);

    return (
        <div className="w-full max-w-viewport mx-auto">
            <h1 className="text-center text-4xl md:text-5xl font-bold mb-4 text-gray-900">
                Our Collection
            </h1>
            <p className="text-center text-gray-500 mb-8 max-w-2xl mx-auto">
                Discover our handcrafted silicone reborn babies, each one a unique masterpiece waiting to be loved.
            </p>

            {/* Collapsible Filters */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-8 overflow-hidden">
                {/* Filter Toggle Header */}
                <button
                    onClick={() => setFiltersOpen(!filtersOpen)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                >
                    <div className="flex items-center gap-2 text-gray-700 font-medium">
                        <FaFilter className="text-rose-500" />
                        <span>Filters</span>
                        <span className="text-sm text-gray-400">
                            ({filteredProducts.length} results)
                        </span>
                    </div>
                    {filtersOpen ? (
                        <FaChevronUp className="text-gray-400" />
                    ) : (
                        <FaChevronDown className="text-gray-400" />
                    )}
                </button>

                {/* Collapsible Filter Content */}
                <div className={`transition-all duration-300 overflow-hidden ${filtersOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="p-4 pt-0 border-t border-gray-100">
                        {/* Search */}
                        <div className="relative mb-4">
                            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                                <FaSearch />
                            </div>
                            <input
                                type="text"
                                placeholder="Search babies..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Price Range */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Price Range
                                </label>
                                <div className="flex gap-2 items-center">
                                    <input
                                        type="number"
                                        placeholder="Min"
                                        value={priceRange.min}
                                        onChange={(e) =>
                                            setPriceRange((prev) => ({ ...prev, min: e.target.value }))
                                        }
                                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                                    />
                                    <span className="text-gray-400">-</span>
                                    <input
                                        type="number"
                                        placeholder="Max"
                                        value={priceRange.max}
                                        onChange={(e) =>
                                            setPriceRange((prev) => ({ ...prev, max: e.target.value }))
                                        }
                                        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none"
                                    />
                                </div>
                            </div>

                            {/* Sort */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Sort By
                                </label>
                                <select
                                    value={sortOption}
                                    onChange={(e) => setSortOption(e.target.value)}
                                    className="w-full px-4 py-2 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent outline-none cursor-pointer bg-white"
                                >
                                    <option value="newest">Newest Arrivals</option>
                                    <option value="price-asc">Price: Low to High</option>
                                    <option value="price-desc">Price: High to Low</option>
                                    <option value="name-asc">Name: A to Z</option>
                                </select>
                            </div>
                        </div>

                        {/* Clear Filters */}
                        {(searchQuery || priceRange.min || priceRange.max) && (
                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setPriceRange({ min: "", max: "" });
                                    setSortOption("newest");
                                }}
                                className="mt-4 text-sm text-rose-500 hover:text-rose-600 font-medium"
                            >
                                Clear all filters
                            </button>
                        )}
                    </div>
                </div>
            </div>

            {/* Results */}
            {filteredProducts.length > 0 ? (
              <div className="flex justify-center">
                <ProductGrid products={filteredProducts} showViewAll={false} mobileLayout="grid" enablePagination={true} itemsPerPage={15} />
              </div>
            ) : (
                <div className="text-center py-24 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                    <div className="text-gray-300 text-6xl mb-4 flex justify-center">
                        <FaSearch />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">
                        No matches found
                    </h3>
                    <p className="text-gray-500">
                        Try adjusting your search or filters to find what you're looking for.
                    </p>
                    <button
                        onClick={() => {
                            setSearchQuery("");
                            setPriceRange({ min: "", max: "" });
                            setSortOption("newest");
                        }}
                        className="mt-6 text-rose-600 hover:text-rose-700 font-medium hover:underline"
                    >
                        Clear all filters
                    </button>
                </div>
            )}
        </div>
    );
}