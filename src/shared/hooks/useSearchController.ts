"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";

type ControllerClassType<T> = {
  new (...args: any[]): T;
};

export const useSearchController = <T>(Controller: ControllerClassType<T>) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const controller = useMemo(
    () => new Controller(searchParams),
    [Controller, searchParams]
  );

  const setSearchParams = useCallback(
    (next: URLSearchParams | ((prev: URLSearchParams) => URLSearchParams)) => {
      const prev = new URLSearchParams(searchParams.toString());
      const final = typeof next === "function" ? next(prev) : next;

      router.replace(`${pathname}?${final.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const update = useCallback(
    (fn: (controller: T) => URLSearchParams) => {
      const result = fn(controller);
      setSearchParams(result);
    },
    [controller, setSearchParams]
  );

  return { controller, update, searchParams, setSearchParams };
};
