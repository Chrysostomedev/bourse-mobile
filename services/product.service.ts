import { get } from "@/core/axios.mobile";

export type Product = {
  id: number | string;
  title: string;
  description: string | null;
  price: number;
  currency: string;
  image_url: string | null;
};

export const productService = {
  async getAll(): Promise<Product[]> {
    const res = await get<Product[] | { data: Product[] }>("/products");
    return Array.isArray(res) ? res : res.data ?? [];
  },

  async getById(id: number | string): Promise<Product> {
    return get<Product>(`/products/${id}`);
  }
};
