import { useInfiniteQuery } from "@tanstack/react-query";
import { ProductAPI } from "../api/productApi";
import { PRODUCT } from "../api/QueryKey";
import { ProductsListRequest } from "../api/types";

export const PAGE_SIZE = 20;

export const getProductList = (req: ProductsListRequest) =>
  useInfiniteQuery({
    queryKey: PRODUCT.LIST(req),
    queryFn: ({ pageParam = 0 }) =>
      ProductAPI.getProducts({ ...req, skip: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      const nextSkip = lastPage.skip + PAGE_SIZE;
      return nextSkip >= lastPage.total ? undefined : nextSkip;
    },
    select: (data) => {
      const total = data.pages[0]?.total ?? 0;
      const skip = data.pages.at(-1)?.skip ?? 0;

      return {
        skip,
        pages: data.pages.flatMap((p) => p.products),
        total,
        currentPage: skip / PAGE_SIZE + 1,
      };
    },
    staleTime: 60_000,
  });
