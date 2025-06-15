import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/outline";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  goToPrevPage: () => void;
  goToNextPage: () => void;
};

export const Pagination = ({
  currentPage,
  totalPages,
  goToPrevPage,
  goToNextPage,
}: PaginationProps) => {

  return (
    <div className="flex justify-center mt-8">
    <button
      onClick={goToPrevPage}
      disabled={currentPage === 1}
      className="rounded disabled:opacity-50"
    >
      <ArrowLeftCircleIcon className="size-10" />
    </button>
    <span className="text-gray-600 items-center my-auto dark:text-gray-300 mx-4 font-medium">
      Page {currentPage} of {totalPages}
    </span>
    <button
      onClick={goToNextPage}
      disabled={currentPage === totalPages}
      className="rounded disabled:opacity-50"
    >
      <ArrowRightCircleIcon className="size-10" />
    </button>
  </div>
  );
};
