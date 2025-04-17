import { ProductsListRequest } from "./types";

export const PRODUCT = {
  KEY: ["products"] as const,
  LIST: (req: ProductsListRequest) => [...PRODUCT.KEY, "list", req] as const,
};
