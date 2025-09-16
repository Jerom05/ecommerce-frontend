"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/utils/api";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  slug: string;
  thumbnail: string | null;
  product_images: string[];
  category_id: string;
}

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";
  const category_id = searchParams.get("category") || "";
  const search_keyword = searchParams.get("q") || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/products", {
          params: {
            page,
            limit,
            category_id: category_id || undefined,
            search_keyword: search_keyword || undefined,
          },
        });
        setProducts(data.data); // assuming API returns { data: [] }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, limit, category_id, search_keyword]);

  const handleProductClick = (slug: string) => {
    router.push(`/products/${slug}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Search Results</h1>

      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded cursor-pointer hover:shadow-md"
              onClick={() => handleProductClick(product.slug)}
            >
              {/* Thumbnail or placeholder */}
              <img
                src={product.thumbnail || "/placeholder.png"}
                alt={product.title}
                className="w-full h-40 object-cover mb-2 rounded"
              />

              <h2 className="font-semibold">{product.title}</h2>
              <p className="text-sm text-gray-500 mb-1">
                {product.description}
              </p>
              <p className="font-bold text-green-600">${product.price}</p>
              <p className="text-sm text-gray-400">Stock: {product.stock}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
