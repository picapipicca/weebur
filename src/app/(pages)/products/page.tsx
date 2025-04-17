import { Suspense } from "react";
import { PRODUCT } from "@/features/products/api/QueryKey";
import { ProductAPI } from "@/features/products/api/productApi";
import { ProductsListRequest } from "@/features/products/api/types";
import { PrefetchBoundary } from "@/shared/lib/PrefetchBoundary";

import ProductList from "@/features/products/components/ProductList";
import ProductFilterForm from "@/features/products/components/ProductFilterForm";

export type SearchParams = {
  [key: string]: any;
};
export default async function ProductsPage(props: {
  searchParams: SearchParams;
}) {
  const req: ProductsListRequest = {
    limit: 20,
    skip: 0,
    q: props.searchParams?.q || "",
    sortBy: props.searchParams?.sortBy || "",
    order: props.searchParams?.order || undefined,
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <ProductFilterForm />
      <Suspense fallback={<div>Loading...</div>}>
        <PrefetchBoundary
          prefetchOptions={{
            queryKey: PRODUCT.LIST(req),
            queryFn: async () => ProductAPI.getProducts(req),
            initialPageParam: 0,
          }}
        >
          <ProductList />
        </PrefetchBoundary>
      </Suspense>
    </main>
  );
}
