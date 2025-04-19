import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { jest } from "@jest/globals";

import ProductFilterForm from "./ProductFilterForm";
import { useSearchController } from "@/shared/hooks/useSearchController";
import { SearchController } from "@/shared/lib/searchController";

jest.mock("@/shared/hooks/useSearchController");

// mock controller 생성
const mockUpdate = jest.fn();
const mockController = {
  q: "iphone",
  sortBy: "rating",
  set: jest.fn(),
  getResult: jest.fn().mockReturnValue({}),
};

beforeEach(() => {
  (useSearchController as jest.Mock).mockReturnValue({
    controller: mockController,
    update: mockUpdate,
  });
});

describe("ProductFilterForm component", () => {
  it("폼요소 렌더링 테스트", () => {
    render(<ProductFilterForm />);

    expect(screen.getByRole("combobox")).toBeVisible();
    expect(screen.getByRole("textbox")).toBeVisible();
    expect(screen.getByRole("button", { name: /검색/i })).toBeVisible();
    expect(screen.getByRole("button", { name: "X" })).toBeVisible();
  });

  it("새로고침시에도 url이 유지되고 useForm에 기본값으로 들어오는지 테스트", () => {
    // mocking된 controller.q, sortBy가 폼 필드에 반영되는지 테스트

    render(<ProductFilterForm />);

    const input = screen.getByRole("textbox") as HTMLInputElement;
    const select = screen.getByRole("combobox") as HTMLSelectElement;

    expect(input.value).toBe("iphone");
    expect(select.value).toBe("rating");
  });

  it("input & update controller 검색 동작 테스트(submit)", async () => {
    render(<ProductFilterForm />);
    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "lipstick" } });

    const submitButton = screen.getByRole("button", { name: /검색/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockUpdate).toHaveBeenCalled();

      const updateFn = mockUpdate.mock.calls[0][0] as (
        controller: SearchController
      ) => any;

      const dummyController = {
        set: jest.fn().mockReturnThis(),
        getResult: jest.fn().mockReturnValue({}),
      } as unknown as SearchController;

      updateFn(dummyController);

      expect(dummyController.set).toHaveBeenCalledWith("q", "lipstick");
      expect(dummyController.getResult).toHaveBeenCalled();
    });
  });

  it("selectbox rating 옵션 선택 시 동작 테스트", async () => {
    render(<ProductFilterForm />);

    const select = screen.getByRole("combobox") as HTMLSelectElement;
    fireEvent.change(select, { target: { value: "rating" } });
    const submitButton = screen.getByRole("button", { name: /검색/i });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(mockUpdate).toHaveBeenCalled();

      const updateFn = mockUpdate.mock.calls[0][0] as (
        controller: SearchController
      ) => any;

      const dummyController = {
        set: jest.fn().mockReturnThis(),
        getResult: jest.fn().mockReturnValue({}),
      } as unknown as SearchController;

      updateFn(dummyController);

      expect(dummyController.set).toHaveBeenCalledWith("sortBy", "rating");
      expect(dummyController.set).toHaveBeenCalledWith("order", "desc");
      expect(dummyController.getResult).toHaveBeenCalled();
    });
  });

  it("검색 초기화 동작 테스트", async () => {
    render(<ProductFilterForm />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    const select = screen.getByRole("combobox") as HTMLSelectElement;
    const resetButton = screen.getByRole("button", { name: "X" });

    fireEvent.change(input, { target: { value: "Essence" } });
    fireEvent.click(select, { target: { value: "rating" } });

    fireEvent.click(resetButton);

    await waitFor(() => {
      expect(mockUpdate).toHaveBeenCalled();

      const latestCallIndex = mockUpdate.mock.calls.length - 1;
      const updateFn = mockUpdate.mock.calls[latestCallIndex][0] as (
        controller: SearchController
      ) => any;

      const dummyController = {
        set: jest.fn().mockReturnThis(),
        getResult: jest.fn().mockReturnValue({}),
      } as unknown as SearchController;

      updateFn(dummyController);

      expect(dummyController.set).toHaveBeenCalledWith("q", "");
      expect(dummyController.set).toHaveBeenCalledWith("sortBy", "");
      expect(dummyController.set).toHaveBeenCalledWith("order", undefined);
      expect(dummyController.getResult).toHaveBeenCalled();
    });

    expect(input).toHaveValue("");
    expect(select).toHaveValue("");
  });

  it("인풋에서 Enter 누르면 Submit 되는지 테스트", async () => {
    render(<ProductFilterForm />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "tshirt" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter", charCode: 13 });

    waitFor(() => {
      expect(mockUpdate).toHaveBeenCalled();

      const updateFn = mockUpdate.mock.calls[0][0] as (
        controller: SearchController
      ) => any;

      const dummyController = {
        set: jest.fn().mockReturnThis(),
        getResult: jest.fn().mockReturnValue({}),
      } as unknown as SearchController;

      updateFn(dummyController);

      expect(dummyController.set).toHaveBeenCalledWith("q", "tshirt");
    });
  });
});
