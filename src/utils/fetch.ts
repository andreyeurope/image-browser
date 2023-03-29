import unfetch from "isomorphic-unfetch";

export default async function fetch(url: string, options?: RequestInit) {
  let response;

  try {
    response = await unfetch(url, options);
  } catch {
    throw new Error("Error fetching from URL");
  }

  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("application/json")) {
    const json = await response.json();
    if (response.ok) {
      return json;
    }
  }
  throw new Error(`Unable to handle HTTP request to ${url}`);
}
