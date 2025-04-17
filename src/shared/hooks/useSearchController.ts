"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useMemo } from "react";

type ControllerClassType<T> = {
  new (...args: any[]): T;
};

export const useSearchController = <T>(Controller: ControllerClassType<T>) => {
  // 1) 현재 쿼리스트링 읽기
  const searchParams = useSearchParams(); // ReadonlyURLSearchParams
  const pathname = usePathname(); // "/products"
  const router = useRouter();

  // 2) Controller 인스턴스 생성 (memoized)
  const controller = useMemo(
    () => new Controller(searchParams),
    [Controller, searchParams]
  );

  // 3) setter 역할 – URLSearchParams 를 받아 history 에 반영
  const setSearchParams = useCallback(
    (next: URLSearchParams | ((prev: URLSearchParams) => URLSearchParams)) => {
      // Readonly → 복사본
      const prev = new URLSearchParams(searchParams.toString());
      const final = typeof next === "function" ? next(prev) : next;

      // replace: 히스토리를 늘리지 않고, push: 뒤로가기를 허용
      router.replace(`${pathname}?${final.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  // 4) react‑router‑dom 버전과 동일한 API 제공
  const update = useCallback(
    (fn: (controller: T) => URLSearchParams) => {
      const result = fn(controller);
      setSearchParams(result);
    },
    [controller, setSearchParams]
  );

  return { controller, update, searchParams, setSearchParams };
};
