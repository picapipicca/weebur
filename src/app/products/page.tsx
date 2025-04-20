import React, { Suspense } from "react";
import { PRODUCT } from "@/features/products/api/QueryKey";
import { ProductAPI } from "@/features/products/api/productApi";
import { ProductsListRequest } from "@/features/products/api/types";
import { PrefetchBoundary } from "@/shared/lib/PrefetchBoundary";

import ProductList from "@/features/products/components/ProductList";
import ProductFilterForm from "@/features/products/components/ProductFilterForm";
import { Spinner } from "@/shared/ui";

export default async function ProductsPage(props: {
  searchParams?: Promise<{
    q?: string;
    sortBy?: "rating" | "";
    order?: "desc" | "";
  }>;
}) {
  // const { q, sortBy, order } = await searchParams;
  const searchParams = await props.searchParams;
  const q = searchParams?.q || "";
  const sortBy = searchParams?.sortBy || "";
  const order = searchParams?.order || undefined;

  const req: ProductsListRequest = {
    limit: 20,
    skip: 0,
    q,
    sortBy,
    order,
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <ProductFilterForm />
      <Suspense
        fallback={
          <div className="w-full h-screen flex items-center justify-center">
            <Spinner />
          </div>
        }
      >
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
