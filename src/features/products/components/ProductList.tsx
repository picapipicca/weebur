"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { useViewMode } from "../hooks/useViewMode";
import { getProductList } from "../hooks/useProductQuery";
import { useSearchController } from "@/shared/hooks/useSearchController";
import { SearchController } from "@/shared/lib/searchController";

import SkeletonCard from "@/features/products/components/SkeletonCard";
import { RatingStars } from "@/shared/ui";
import Search from "@/shared/assets/icons/search.svg";
import SearchResultTags from "./SearchResultTag";

const ProductList = () => {
  const { viewMode, mounted } = useViewMode();
  const { controller } = useSearchController(SearchController);

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
  console.log(data);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!bottomRef.current || !hasNextPage) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          fetchNextPage();
        }
      },
      {
        rootMargin: "300px",
      }
    );

    observer.observe(bottomRef.current);

    return () => observer.disconnect();
  }, [bottomRef.current, hasNextPage]);

  if (!mounted || isPending || isError) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="h-40 bg-gray-100 animate-pulse rounded-lg"
          ></div>
        ))}
      </div>
    );
  }

  return (
    <section className="lg:w-7xl lg:items-center lg:mx-auto px-4 py-8 ">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">
          {/* {searchQuery ? `"${searchQuery}" 검색 결과` : "모든 워크샵"} */}
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
          {data?.pages.map((workshop: any) => (
            <div
              key={workshop.id}
              className={` cursor-pointer
            bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 transition-all hover:shadow-md
            ${
              viewMode === "list"
                ? "flex flex-col md:flex-row"
                : "flex flex-col"
            }
          `}
            >
              <div
                className={`
                  p-4 flex flex-col
                  ${viewMode === "list" ? "md:w-2/3" : "w-full"}
                `}
              >
                <div className="flex items-center justify-center mb-4">
                  <Image
                    src={workshop.thumbnail}
                    alt="thumbnail"
                    width={150}
                    height={150}
                  />
                </div>
                <div className="flex items-start justify-between mb-1">
                  <h3
                    className={`font-semibold text-gray-900 ${
                      viewMode === "list" ? "text-lg" : "text-base"
                    }`}
                  >
                    {workshop.title}
                  </h3>
                </div>

                <div className="flex items-center text-xs text-gray-500 mb-2">
                  <span>{workshop.reviews}개의 리뷰</span>
                </div>

                <p
                  className={`text-gray-600 text-sm mb-3 ${
                    viewMode === "list" ? "" : "line-clamp-2"
                  }`}
                >
                  {workshop.description}
                </p>

                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center">
                    <RatingStars rating={workshop.rating} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* {hasNextPage ? (
        <div ref={bottomRef} className="mt-8 text-center">
          {isFetchingNextPage && (
            <div className="text-gray-500 text-sm">불러오는 중...</div>
          )}
        </div>
      ) : (
        data.currentPage !== 1 && (
          <div className="mt-8 mb-4 flex items-center">
            <p className="mx-auto">더 이상 불러올 수 없습니다.</p>
          </div>
        )
      )} */}
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
    </section>
  );
};

export default ProductList;
