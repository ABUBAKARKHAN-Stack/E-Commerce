import { LoaderFunctionArgs } from "react-router-dom";
import { queryClient } from "../tanstackQueryClient";
import { QueryKeys } from "@/types/main.types";
import { getProductHelper } from "@/helpers/user/products.helper";

const productDetailsLoader = async ({ params }: LoaderFunctionArgs) => {
  const { productId } = params;
  if (!productId) return;

  queryClient.ensureQueryData({
    queryKey: [QueryKeys.PRODUCT, productId],
    queryFn: () => getProductHelper(productId),
  });

  return { productId };
};

export { productDetailsLoader };
