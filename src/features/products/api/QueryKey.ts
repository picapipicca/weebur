import { ProductsListRequest } from "./types";

export const PRODUCT = {
  KEY: ["products"] as const,
  LIST: (filter: ProductsListRequest) =>
    [...PRODUCT.KEY, "list", filter] as const,
};
