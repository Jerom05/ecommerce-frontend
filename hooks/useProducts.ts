import { useEffect, useState } from "react";
import api from "@/utils/api";

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  stock: number;
  slug: string;
  thumbnail: { public_id: string; url: string } | null;
  product_images: string[];
  category_id: string;
}

export interface MetaData {
  total_data: number;
  filtered_data: number;
  current_page: number;
  limit: number;
}

interface UseProductsParams {
  page: string;
  limit: string;
  category_id?: string;
  search_keyword?: string;
}

export function useProducts({
  page,
  limit,
  category_id,
  search_keyword,
}: UseProductsParams) {
  const [products, setProducts] = useState<Product[]>([]);
  const [meta_data, setMetaData] = useState<MetaData | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/products", {
          params: { page, limit, category_id, search_keyword },
        });

        setProducts(data.data);
        setMetaData(data.meta_data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [page, limit, category_id, search_keyword]);

  return { products, meta_data, loading };
}
