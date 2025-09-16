"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import { Search as SearchIcon, X, Loader2 } from "lucide-react";

interface Category {
  id: string;
  name: string;
}

export default function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const q = searchParams.get("q") || "";

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState(q);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoadingCategories(true);
        const { data: res } = await api.get("/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to load categories:", err);
      } finally {
        setIsLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  // Sync searchTerm with URL query
  useEffect(() => {
    setSearchTerm(q);
  }, [q]);

  // Clear search when navigating away from /search
  useEffect(() => {
    if (pathname === "/") {
      setSearchTerm("");
      setSelectedCategory("all");
    }
  }, [pathname]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setIsSearching(true);

    const params = new URLSearchParams();
    if (selectedCategory !== "all") params.set("category", selectedCategory);
    params.set("q", searchTerm.trim());

    router.push(`/search?${params.toString()}`);

    setTimeout(() => setIsSearching(false), 800);
  };

  return (
    <form
      onSubmit={handleSearchSubmit}
      className="flex items-center w-full max-w-4xl mx-auto bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-full shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden"
    >
      {/* Category dropdown */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="px-4 py-4 bg-gray-100 dark:bg-gray-800 dark:text-white text-gray-700 border-r border-gray-300 dark:border-gray-700 font-medium cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
        disabled={isLoadingCategories}
      >
        <option value="all">All Categories</option>
        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* Search input */}
      <div className="relative flex-1">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search products..."
          className="w-full px-4 py-3 text-gray-800 dark:text-white dark:bg-gray-900 dark:placeholder-gray-200 placeholder-gray-400 dark:placeholder-gray-500 outline-none focus:ring-2 focus:ring-gray-400 dark:focus:ring-gray-500 transition-all duration-200"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={() => setSearchTerm("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-200"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Search button */}
      <button
        type="submit"
        disabled={isSearching}
        className="px-6 py-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-500 text-white font-semibold flex items-center justify-center transition-colors duration-200 rounded-r-full"
      >
        {isSearching ? (
          <Loader2 className="animate-spin" size={18} />
        ) : (
          <SearchIcon size={18} />
        )}
      </button>
    </form>
  );
}
