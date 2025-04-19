/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ProductsListRequest {
  limit?: number;
  skip?: number;
  q?: string;
  sortBy?: "rating" | "";
  order?: "desc";
}

export interface ProductListResponse {
  products: {
    id: number;
    title: string;
    description: string;
    thumbnail: string;
    rating: number;
    reviews: any[];
  }[];
  total: number;
  skip: number;
  limit: number;
}
