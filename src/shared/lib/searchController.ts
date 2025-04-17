export class SearchController {
  // limit?: number;
  // skip?: number;
  sortBy: "rating" | "";
  q: string;
  order: "desc" | undefined;

  constructor(searchParams: URLSearchParams) {
    const { sortBy, q, order } = this.init(searchParams);
    this.order = order;
    this.sortBy = sortBy;
    this.q = q;
    // this.limit = limit;
    // this.skip = skip;
  }

  init(searchParams: URLSearchParams) {
    const rawSearchType = searchParams.get("orderBy");
    const validSearchTypes = ["rating", ""] as const;

    const sortBy = validSearchTypes.includes(rawSearchType as any)
      ? (rawSearchType as "rating" | "")
      : "";

    const rawOrder = searchParams.get("order");
    const validOrders = ["desc"] as const;

    const order = validOrders.includes(rawOrder as any)
      ? (rawOrder as "desc")
      : undefined;

    return {
      sortBy,
      q: searchParams.get("q") || "",
      order,
    };
  }

  set<T extends keyof this>(key: T, value: this[T]) {
    this[key] = value;
  }

  getResult() {
    const params = new URLSearchParams();

    // params.set("limit", String(this.limit));
    // params.set("skip", String(this.skip));

    if (this.q) params.set("q", this.q);
    if (this.sortBy) params.set("orderBy", this.sortBy);
    if (this.order) params.set("order", this.order);
    return params;
  }
}
