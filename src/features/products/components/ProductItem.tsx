import React from "react";
import Image from "next/image";

import { RatingStars } from "@/shared/ui";

interface ProductItemProps {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  rating: number;
  reviews: number;
}
const ProductItem = ({
  product,
  viewMode,
}: {
  product: ProductItemProps;
  viewMode: "grid" | "list";
}) => {
  return (
    <div
      className={`cursor-pointer 
      bg-white rounded-lg shadow-sm overflow-hidden border border-gray-100 transition-all hover:shadow-md
      ${
        viewMode === "list"
          ? "flex flex-row justify-between gap-4"
          : "flex flex-col"
      }
    `}
    >
      <div
        className={`flex items-center justify-center ${
          viewMode === "list" ? "min-w-[150px]" : ""
        }`}
      >
        <Image
          src={product.thumbnail}
          alt={`${product.title} thumbnail`}
          width={150}
          height={150}
          sizes={
            viewMode === "list" ? "150px" : "(min-width: 1024px) 23vw, 20vw"
          }
        />
      </div>

      <div
        className={`flex justify-between p-4 flex-1 ${
          viewMode === "list" ? " flex-row" : "flex-col"
        }`}
      >
        <div className={`${viewMode === "list" ? "w-[70%]" : "w-full"}`}>
          <h3
            data-testid="product-title"
            className={`font-semibold text-gray-900${
              viewMode === "list" ? "text-lg mb-2" : "text-base"
            }`}
          >
            {product.title}
          </h3>
          <p
            className={`text-gray-600 text-sm mb-3 ${
              viewMode === "list" ? "" : "line-clamp-2"
            }`}
          >
            {product.description}
          </p>
        </div>

        <div className="pr-4">
          <RatingStars rating={product.rating} />
          <div className="text-xs text-gray-500 mt-2">
            {product.reviews}개의 리뷰
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
