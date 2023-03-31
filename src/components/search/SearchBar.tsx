import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function SearchBar(props: { setTerm: (term: string) => void }) {
  const { setTerm } = props;
  return (
    <>
      <div className="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 py-4 relative">
          <label htmlFor="search-field" className="sr-only">
            Search
          </label>
          <MagnifyingGlassIcon
            className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
            aria-hidden="true"
          />
          <input
            id="search-field"
            className="block h-full w-full border-0 py-4 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:outline-none"
            placeholder="Search..."
            type="search"
            name="search"
            onChange={(e) => setTerm(e.target.value)}
          />
        </div>
      </div>
    </>
  );
}
