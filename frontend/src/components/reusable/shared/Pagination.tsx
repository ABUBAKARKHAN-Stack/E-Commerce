import { Dispatch, FC, SetStateAction } from "react";
import { ArrowLeftCircle, ArrowRightCircle } from "lucide-react";

type Props = {
  limit: number;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  totalProducts: number;
  forOrder?: boolean;
};

const Pagination: FC<Props> = ({
  limit,
  page,
  setPage,
  totalProducts,
  forOrder = false,
}) => {
  const start = (page - 1) * limit + 1;
  const end = Math.min(start + limit - 1, totalProducts);

  return (
    <>
      <div className="z-10 flex w-full flex-col items-center gap-y-3">
        <div className="mt-5 flex shrink items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-cyan-600 p-1.5 shadow-lg dark:bg-gradient-to-r dark:from-orange-500 dark:to-orange-600">
          <button
            className="flex items-center gap-1 rounded-full !bg-white px-3 py-2.5 text-xs font-medium !text-gray-900 shadow-sm transition-all duration-200 hover:!bg-gray-50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:hover:!bg-white sm:gap-2 sm:px-6 sm:text-sm"
            onClick={() => {
              if (page <= 1) return;
              setPage((prev) => prev - 1);
            }}
            disabled={page === 1}
          >
            <ArrowLeftCircle className="size-3 sm:size-4" />
            <span className="xs:inline hidden">Previous</span>
            <span className="xs:hidden">Prev</span>
          </button>

          {/* Separator */}
          <div className="mx-1 h-4 w-px bg-white/30 sm:mx-2 sm:h-6"></div>

          {/* Current PAGE */}
          <div className="min-w-[80px] px-2 py-2.5 text-center text-xs font-semibold text-white sm:min-w-[140px] sm:px-6 sm:text-sm">
            <span className="hidden sm:inline">
              Page {page} of {Math.ceil(totalProducts / limit)}
            </span>
            <span className="sm:hidden">
              {page}/{Math.ceil(totalProducts / limit)}
            </span>
          </div>

          {/* Separator */}
          <div className="mx-1 h-4 w-px bg-white/30 sm:mx-2 sm:h-6"></div>

          <button
            className="flex items-center gap-1 rounded-full !bg-white px-3 py-2.5 text-xs font-medium !text-gray-900 shadow-sm transition-all duration-200 hover:!bg-gray-50 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none disabled:hover:!bg-white sm:gap-2 sm:px-6 sm:text-sm"
            disabled={page * limit >= totalProducts}
            onClick={() => {
              if (page * limit >= totalProducts) return;
              setPage((prev) => prev + 1);
            }}
          >
            <span className="xs:inline hidden">Next</span>
            <span className="xs:hidden">Next</span>
            <ArrowRightCircle className="size-3 sm:size-4" />
          </button>
        </div>
        <p className="text-base font-semibold text-gray-900 dark:text-gray-300">
          Showing {start}–{end} of {totalProducts}{" "}
          {forOrder ? "orders" : "products"}
        </p>
      </div>
    </>
  );
};

export default Pagination;
