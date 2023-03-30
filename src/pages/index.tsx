import Head from "next/head";
import useGet from "@/hooks/useGet";
import { SearchResult } from "@/types/search";
import { useEffect, useState } from "react";
import { ImageGrid } from "@/components/search/ImageGrid";
import { Pagination } from "@/components/search/Pagination";
import SearchBar from "@/components/search/SearchBar";

export default function Home() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const { isLoading, data, load } = useGet<SearchResult>("/api/search", {
    query: query,
    page: page,
  });

  useEffect(() => {
    load();
  }, [page]);

  useEffect(() => {
    const refetch = setTimeout(() => load(), 2000);
    return () => clearTimeout(refetch);
  }, [query]);

  if (isLoading) {
    return <>Loading images..</>;
  }

  if (!data) {
    return <>No results..</>;
  }

  const { total, total_pages, results } = data;

  const nextPage = () => {
    const nextPage = page + 1;
    if (total_pages < nextPage) {
      setPage(total_pages);
      return;
    }
    setPage(nextPage);
  };

  const previousPage = () => {
    const previousPage = page - 1;
    if (previousPage < 1) {
      setPage(1);
      return;
    }
    setPage(previousPage);
  };

  return (
    <>
      <Head>
        <title>Image browser</title>
        <meta name="description" content="The search image browser" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-full">
        <SearchBar setTerm={setQuery} />
        {results.length == 0 && (
          <div className="flex h-36 text-center justify-center items-center">
            <p className="flex">
              Get results by typing something in the search bar
            </p>
          </div>
        )}
        <ImageGrid photos={results} />
        <footer>
          <Pagination
            currentPage={page}
            totalResults={total}
            pageSize={20}
            nextPage={nextPage}
            previousPage={previousPage}
          />
        </footer>
      </main>
    </>
  );
}
