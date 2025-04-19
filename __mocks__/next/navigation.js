module.exports = {
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
  }),
  usePathname: () => "/products",
  useSearchParams: () => new URLSearchParams("searchText=test&searchType=all"),
};
