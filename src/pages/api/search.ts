import { SearchResult } from "@/types/search";
import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "~utils/fetch";

const searchApiKey = process.env.IMAGE_SEARCH_API_KEY || "";
const searchApiBaseUrl = process.env.IMAGE_SEARCH_API_URL || "";
const searchRoute = "/search/photos";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SearchResult>
) {
  const query = (req.query.query as string) || "";
  const page = (req.query.page as string) || "";
  const searchApiUrl = new URL(searchApiBaseUrl + searchRoute);
  searchApiUrl.searchParams.append("query", query);
  searchApiUrl.searchParams.append("page", page);
  searchApiUrl.searchParams.append("per_page", "20");

  const response = await fetch(searchApiUrl.href, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Client-ID ${searchApiKey}`,
    },
  });

  res.status(200).json(response as SearchResult);
}
