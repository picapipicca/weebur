"use client";

import React from "react";
import { useIsFetching } from "@tanstack/react-query";
import { SelectBox, Input, Button } from "@/shared/ui";
import { useForm } from "react-hook-form";

import { useSearchController } from "@/shared/hooks/useSearchController";
import { SearchController } from "@/shared/lib/searchController";

const ProductFilterForm = () => {
  const { controller, update } = useSearchController(SearchController);
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      q: controller.q ?? "",
      sortBy: controller.sortBy ?? "",
    },
  });

  const isFetchingProducts = useIsFetching({
    queryKey: ["products", "list"],
  });
  const disabled = isFetchingProducts > 0;

  const onReset = () => {
    reset({
      q: "",
      sortBy: "",
    });
    update((controller: SearchController) => {
      controller.set("q", "");
      controller.set("sortBy", "");
      controller.set("order", undefined);
      return controller.getResult();
    });
  };

  const onSubmit = (data: any) => {
    const { q, sortBy } = data;

    update((controller: SearchController) => {
      controller.set("q", q);

      if (sortBy === "rating") {
        controller.set("sortBy", "rating");
        controller.set("order", "desc");
      } else {
        controller.set("sortBy", "");
        controller.set("order", undefined);
      }

      return controller.getResult();
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} role="form">
      <header className="bg-white sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary">WEEBUR</h1>
              <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                과제
              </span>
            </div>

            <div className="flex items-center md:w-1/2 lg:w-1/3 justify-between">
              <div className={"flex w-full max-w-lg"}>
                <div className={"w-full max-w-28"}>
                  <SelectBox
                    name={"sortBy"}
                    control={control}
                    optionSet={[
                      { name: "전체", value: "" },
                      { name: "별점순", value: "rating" },
                    ]}
                  />
                </div>
                <div className={"w-full my-auto"}>
                  <Input
                    name={"q"}
                    submitHandler={handleSubmit(onSubmit)}
                    submitCondition
                    control={control}
                    isReadOnly={disabled}
                  />
                </div>
              </div>
              <div className="w-auto min-w-28">
                <Button
                  buttonType={"default"}
                  size={"sm"}
                  addClass="rounded-md rounded-l-none"
                  clickHandler={handleSubmit(onSubmit)}
                  isDisabled={disabled}
                >
                  검색
                </Button>
                {onReset && (
                  <Button
                    addClass={"mr-2 cursor-pointer"}
                    size={"sm"}
                    clickHandler={onReset}
                  >
                    X
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </form>
  );
};

export default ProductFilterForm;
