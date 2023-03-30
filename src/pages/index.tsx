import Head from "next/head";
import useGet from "@/hooks/useGet";
import { Photo, SearchResult } from "@/types/search";
import { useState } from "react";

export default function Home() {
  const [query, setQuery] = useState("test");
  const { isLoading, data, load } = useGet<SearchResult>("/api/search", {
    query: query,
  });

  if (isLoading) {
    return <>Loading..</>;
  }

  if (!data) {
    return <>No results..</>;
  }

  return (
    <>
      <Head>
        <title>Image browser</title>
        <meta name="description" content="The search image browser" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-full">
        <ImageGrid photos={data.results} />
      </main>
    </>
  );
}

export function ImageGrid(props: { photos: Photo[] }) {
  const { photos } = props;
  return (
    <ul
      role="list"
      className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8 m-4"
    >
      {photos.map((photo) => (
        <li key={photo.id} className="relative">
          <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
            <img
              src={photo.urls.small}
              alt={photo.alt_description || photo.description}
              className="pointer-events-none object-cover group-hover:opacity-75"
            />
            <button
              type="button"
              className="absolute inset-0 focus:outline-none"
            ></button>
          </div>
          <p className="pointer-events-none mt-2 ml-1 block truncate text-sm font-medium text-slate-700">
            {photo.description || photo.alt_description}
          </p>
        </li>
      ))}
    </ul>
  );
}
