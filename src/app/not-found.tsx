import React from "react";
import Link from "next/link";

const NotFound = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-white text-center">
      <h1 className="text-4xl font-bold text-gray-800">404</h1>
      <p className="mt-2 text-gray-600">페이지를 찾을 수 없습니다.</p>
      <Link
        href="/"
        className="mt-4 inline-block rounded-lg bg-primary px-4 py-2 text-white"
      >
        홈으로 이동
      </Link>
    </div>
  );
};

export default NotFound;
