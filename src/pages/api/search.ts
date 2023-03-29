import type { NextApiRequest, NextApiResponse } from "next";
import fetch from "~utils/fetch";

type ResponseData = {
  message: string;
};

const searchApiKey = process.env.IMAGE_SEARCH_API_KEY || "";
const searchApiBaseUrl = process.env.IMAGE_SEARCH_API_URL || "";
const searchRoute = "/search";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const searchTerm = (req.query.query as string) || "";
  const searchApiUrl = new URL(searchApiBaseUrl + searchRoute);
  searchApiUrl.searchParams.append("query", searchTerm);

  const response = await fetch(searchApiUrl.href, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: searchApiKey,
    },
  });

  res.status(200).json(response);
}
