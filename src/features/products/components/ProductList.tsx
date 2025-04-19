"use client";

import React, { useRef, useEffect } from "react";
import { useViewMode } from "../hooks/useViewMode";
import { getProductList } from "../hooks/useProductQuery";
import { useSearchController } from "@/shared/hooks/useSearchController";
import { SearchController } from "@/shared/lib/searchController";

import SkeletonCard from "@/features/products/components/SkeletonCard";
import Search from "@/shared/assets/icons/search.svg";
import SearchResultTags from "./SearchResultTag";
import ProductItem from "./ProductItem";
import { ScrollTopButton } from "@/shared/ui";

const ProductList = () => {
  const { viewMode, mounted } = useViewMode();
  const { controller } = useSearchController(SearchController);
  const containerRef = useRef<HTMLElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = getProductList({
    limit: 20,
    skip: 0,
    q: controller.q || "",
    sortBy: controller.sortBy || "",
    order: controller.order || undefined,
  });

  useEffect(() => {
    if (!mounted || !bottomRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetchingNextPage) fetchNextPage();
      },
      { rootMargin: "300px" }
    );

    observer.observe(bottomRef.current);
    return () => observer.disconnect();
  }, [mounted, hasNextPage, isFetchingNextPage]);

  if (!mounted || isPending || isError) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            role="presentation"
            key={i}
            className="h-40 bg-gray-100 animate-pulse rounded-lg"
          />
        ))}
      </div>
    );
  }

  return (
    <section
      ref={containerRef}
      className="lg:w-7xl lg:items-center lg:mx-auto px-4 py-8"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">
          <span className="ml-2 text-sm font-normal text-gray-500 mb-2">
            {data?.total}개의 상품
          </span>
          <SearchResultTags />
        </h2>
      </div>

      {data?.total === 0 ? (
        <div className="bg-white rounded-lg p-8 text-center">
          <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Search className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            일치하는 결과가 없습니다.
          </h3>
          <p className="text-gray-500 mb-4">
            다른 키워드로 검색하거나 필터를 조정해보세요.
          </p>
        </div>
      ) : (
        <div
          className={`
        ${
          viewMode === "list"
            ? "space-y-4"
            : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        }
      `}
        >
          {data?.pages.flatMap((product: any) => (
            <ProductItem
              product={product}
              viewMode={viewMode}
              key={product.id}
            />
          ))}
        </div>
      )}

      {hasNextPage ? (
        <div ref={bottomRef} className="mt-8 text-center">
          {isFetchingNextPage && (
            <div
              className={`${
                viewMode === "list"
                  ? "space-y-4"
                  : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              }`}
            >
              {Array.from({ length: 4 }).map((_, i) => (
                <SkeletonCard key={i} variant={viewMode} />
              ))}
            </div>
          )}
        </div>
      ) : (
        data.currentPage !== 1 && (
          <div className="mt-8 mb-4 flex items-center">
            <p className="mx-auto">더 이상 불러올 수 없습니다.</p>
          </div>
        )
      )}
      <ScrollTopButton />
    </section>
  );
};

export default ProductList;
