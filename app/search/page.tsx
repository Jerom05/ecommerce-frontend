"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useCallback } from "react";

import { useProducts } from "@/hooks/useProducts";
import Pagination from "@/components/common/Pagination";

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "20";
  const category_id = searchParams.get("category") || "";
  const search_keyword = searchParams.get("q") || "";

  const { products, meta_data, loading } = useProducts({
    page,
    limit,
    category_id,
    search_keyword,
  });

  const handleProductClick = useCallback(
    (slug: string) => {
      router.push(`/products/${slug}`);
    },
    [router],
  );

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Search Results</h1>

      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div>
          <div className="mb-2">
            <p>Total products found: {meta_data?.filtered_data}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white p-4 rounded cursor-pointer hover:shadow-md"
                onClick={() => handleProductClick(product.slug)}
              >
                <img
                  src={product.thumbnail?.url || "/product.jpg"}
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

          {/* Pagination */}
          {meta_data && (
            <Pagination
              page={page}
              limit={limit}
              category_id={category_id}
              search_keyword={search_keyword}
              meta_data={meta_data}
            />
          )}
        </div>
      )}
    </div>
  );
}
