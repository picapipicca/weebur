import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import ProductList from "@/features/products/components/ProductList";
import { useViewMode } from "@/features/products/hooks/useViewMode";
import { getProductList } from "@/features/products/hooks/useProductQuery";
import { useSearchController } from "@/shared/hooks/useSearchController";

jest.mock("@/features/products/hooks/useViewMode");
jest.mock("@/features/products/hooks/useProductQuery");
jest.mock("@/shared/hooks/useSearchController", () => ({
  useSearchController: jest.fn(),
}));

describe("ProductList component", () => {
  const mockUseViewMode = useViewMode as jest.Mock;
  const mockGetProductList = getProductList as jest.Mock;
  const mockUseSearchController = useSearchController as jest.Mock;

  const mockProducts = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    title: `Product ${i + 1}`,
    description: `Description ${i + 1}`,
    thumbnail: "/test.jpg",
    rating: 4,
    reviews: i + 1,
  }));

  beforeEach(() => {
    mockUseViewMode.mockReturnValue({
      viewMode: "grid",
      mounted: true,
    });

    mockUseSearchController.mockReturnValue({
      controller: { q: "", sortBy: "", order: "" },
    });

    mockGetProductList.mockReturnValue({
      data: {
        total: 20,
        currentPage: 1,
        pages: mockProducts,
      },
      isPending: false,
      isError: false,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });
  });

  it("렌더링 시 20개의 상품을 보여주는지 테스트", async () => {
    render(<ProductList />);
    await waitFor(() => {
      expect(screen.getAllByTestId("product-title")).toHaveLength(20);
    });
  });

  it("로딩 중이면 Skeleton 20개를 렌더링 테스트", () => {
    mockGetProductList.mockReturnValueOnce({
      data: undefined,
      isPending: true,
      isError: false,
      fetchNextPage: jest.fn(),
      hasNextPage: true,
      isFetchingNextPage: false,
    });

    render(<ProductList />);
    const initialRenderSkeletons = screen.getAllByRole("presentation");
    expect(initialRenderSkeletons.length).toBe(20);
  });

  it("상품이 없을 경우 Empty UI를 보여주는지 테스트", () => {
    mockGetProductList.mockReturnValueOnce({
      data: {
        total: 0,
        currentPage: 1,
        pages: [],
      },
      isPending: false,
      isError: false,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    render(<ProductList />);
    expect(screen.getByText("일치하는 결과가 없습니다.")).toBeInTheDocument();
  });

  it("더 이상 불러올 상품이 없을 때 메시지를 보여주는지 테스트", () => {
    mockGetProductList.mockReturnValueOnce({
      data: {
        total: 24,
        currentPage: 2,
        pages: mockProducts,
      },
      isPending: false,
      isError: false,
      fetchNextPage: jest.fn(),
      hasNextPage: false,
      isFetchingNextPage: false,
    });

    render(<ProductList />);
    expect(screen.getByText("더 이상 불러올 수 없습니다.")).toBeInTheDocument();
  });

  it("각 상품에 이미지,title, description, 리뷰 수, rating을 표시하는지 테스트", () => {
    render(<ProductList />);
    const thumbnail = screen.getByAltText("Product 1 thumbnail");
    const title = screen.getByText("Product 1");
    const description = screen.getByText("Description 1");
    const reviewCount = screen.getByText("1개의 리뷰");
    const ratings = screen.getAllByLabelText("별점 4.0점");

    expect(thumbnail).toBeInTheDocument();
    expect(thumbnail).toHaveAttribute(
      "src",
      expect.stringContaining("test.jpg")
    );
    expect(title).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(reviewCount).toBeInTheDocument();
    expect(ratings[0]).toBeInTheDocument();
  });
});
