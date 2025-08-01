import { ProductFilterParams } from "@/types/main.types";

const getQueryParams = ({
  category,
  maxPrice,
  minPrice,
  search,
  sortBy,
  limit,
  page,
}: ProductFilterParams) => {
  const queryParams: Record<string | number, string | number> = {};
  if (search.trim()) queryParams.search = search;
  if (category && category !== "all") queryParams.category = category;
  if (minPrice) queryParams.minPrice = minPrice;
  if (maxPrice) queryParams.maxPrice = maxPrice;
  if (sortBy) queryParams.sortBy = sortBy;
  if (limit) queryParams.limit = limit;
  if (page) queryParams.page = page;

  return queryParams;
};

export { getQueryParams };
