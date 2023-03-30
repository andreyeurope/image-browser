export function Pagination(props: {
  currentPage: number;
  totalResults: number;
  pageSize: number;
  nextPage: () => void;
  previousPage: () => void;
}) {
  const { currentPage, pageSize, totalResults, nextPage, previousPage } = props;
  return (
    <div
      className="flex items-center justify-between border-t border-gray-200 bg-white py-3 sm:px-6"
      aria-label="Pagination"
    >
      <div className="flex flex-1 justify-between items-center">
        <button
          onClick={previousPage}
          className="relative inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
        >
          Previous
        </button>
        <p className="text-sm text-gray-700">
          Showing{" "}
          <span className="font-medium">
            {(currentPage - 1) * pageSize + 1}
          </span>{" "}
          to <span className="font-medium">{currentPage * pageSize}</span> of{" "}
          <span className="font-medium">{totalResults}</span> results
        </p>
        <button
          onClick={nextPage}
          className="relative ml-3 inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:outline-offset-0"
        >
          Next
        </button>
      </div>
    </div>
  );
}
