import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { jest } from "@jest/globals";

import ProductFilterForm from "./ProductFilterForm";
import { useSearchController } from "@/shared/hooks/useSearchController";
import { SearchController } from "@/shared/lib/searchController";

jest.mock("@/shared/hooks/useSearchController");

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

  it("새로고침시에도 기본값 반영되는지 테스트", () => {
    render(<ProductFilterForm />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    const select = screen.getByRole("combobox") as HTMLSelectElement;

    expect(input.value).toBe("iphone");
    expect(select.value).toBe("rating");
  });

  it("검색 동작 테스트 (submit)", () => {
    render(<ProductFilterForm />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "lipstick" } });

    fireEvent.click(screen.getByRole("button", { name: /검색/i }));

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

  it("selectbox 동작 테스트", () => {
    render(<ProductFilterForm />);
    const select = screen.getByRole("combobox");
    fireEvent.change(select, { target: { value: "rating" } });
    fireEvent.click(screen.getByRole("button", { name: /검색/i }));

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

  it("검색 초기화 동작 테스트", () => {
    render(<ProductFilterForm />);
    const input = screen.getByRole("textbox") as HTMLInputElement;
    const select = screen.getByRole("combobox") as HTMLSelectElement;

    fireEvent.change(input, { target: { value: "Essence" } });
    fireEvent.change(select, { target: { value: "rating" } });
    fireEvent.click(screen.getByRole("button", { name: "X" }));

    const updateFn = mockUpdate.mock.calls.at(-1)?.[0] as (
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

    expect(input).toHaveValue("");
    expect(select).toHaveValue("");
  });

  it("Enter 키로 Submit 되는지 테스트", () => {
    render(<ProductFilterForm />);
    const input = screen.getByRole("textbox") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "tshirt" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter", charCode: 13 });

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
