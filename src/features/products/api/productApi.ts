import { ApiInstance } from "@/shared/api/ApiInstance";
import { ProductsListRequest, ProductListResponse } from "./types";

export const ProductAPI = {
  getProducts: async (req?: ProductsListRequest) => {
    const isServer = typeof window === "undefined";
    const endpoint = req?.q ? "/products/search" : "/products";
    const isServerUrl = `https://dummyjson.com${endpoint}`;

    const { data } = await ApiInstance.get<ProductListResponse>(
      isServer ? isServerUrl : endpoint,
      {
        params: req,
      }
    );

    return {
      ...data,
      products: data.products.map((product) => ({
        id: product.id,
        title: product.title ?? "",
        description: product.description ?? "",
        thumbnail: product.thumbnail ?? "",
        rating: product.rating ?? 0,
        reviews: Array.isArray(product.reviews)
          ? product.reviews.length
          : product.reviews ?? 0,
      })),
    };
  },
};
