import React from "react";
import { SearchController } from "@/shared/lib/searchController";
import { useSearchController } from "@/shared/hooks/useSearchController";

const SearchResultTags = () => {
  const { controller } = useSearchController(SearchController);
  const tags = [];

  if (controller.q) tags.push({ label: `${controller.q}` });
  if (controller.sortBy) {
    const label =
      controller.sortBy === "rating"
        ? "평점 높은순"
        : controller.sortBy === ""
        ? "전체"
        : controller.sortBy;
    tags.push({ label });
  }

  return (
    <div className="flex flex-wrap gap-2 mt-2">
      {tags.map((tag, i) => (
        <span
          key={i}
          className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium"
        >
          {tag.label}
        </span>
      ))}
    </div>
  );
};
export default SearchResultTags;
