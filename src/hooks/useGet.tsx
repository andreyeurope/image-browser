import { Reducer, useEffect, useReducer } from "react";

import fetch from "~utils/fetch";

type Action<ResponseData> =
  | {
      type: "IS_LOADING";
    }
  | {
      type: "SUCCESS";
      data: ResponseData;
    }
  | {
      type: "ERROR";
      error: string;
    };

type State<ResponseData> =
  | { data: undefined; isLoading: true; error: undefined }
  | {
      data: ResponseData;
      isLoading: false;
      error: undefined;
    }
  | {
      data: ResponseData | undefined;
      isLoading: false;
      error: string;
    };

function reducer<ResponseData>(
  state: State<ResponseData>,
  action: Action<ResponseData>
): State<ResponseData> {
  switch (action.type) {
    case "IS_LOADING":
      return {
        isLoading: true,
        data: undefined,
        error: undefined,
      };
    case "SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: action.data,
      };
    case "ERROR":
      return {
        ...state,
        isLoading: false,
        error: action.error,
      };
    default:
      throw new Error();
  }
}

const buildRequestUrl = ({
  route,
  queryParams,
}: {
  route: string;
  queryParams?: { [key: string]: any } | undefined;
}) => {
  const url = route;
  const query = new URLSearchParams();
  const parameters = queryParams || {};
  Object.keys(parameters)
    .filter((key) => !!parameters[key])
    .forEach((key) => query.set(key, parameters[key]));
  const queryString = query.toString();
  return url.match(/\?/) ? `${url}&${queryString}` : `${url}?${queryString}`;
};

type ReturnArgs<T> = State<T> & {
  load: () => void;
};
function useGet<ResponseData>(
  route: string,
  queryParams?: { [key: string]: any } | undefined
): ReturnArgs<ResponseData> {
  const [state, dispatch] = useReducer<
    Reducer<State<ResponseData>, Action<ResponseData>>
  >(reducer, {
    isLoading: true,
    data: undefined,
    error: undefined,
  });

  const requestUrl = buildRequestUrl({ route, queryParams });

  const load = async () => {
    try {
      const data = await fetch(requestUrl, {
        method: "GET",
      });
      dispatch({ type: "SUCCESS", data });
    } catch (err: any) {
      dispatch({ type: "ERROR", error: err.message });
      reportError(err);
      console.error(`GET to ${requestUrl} failed`);
      console.error(err);
      throw err;
    }
  };

  useEffect(() => {
    let isLatest = true;
    if (isLatest) {
      load();
    }
    return () => {
      isLatest = false;
    };
  });

  return { ...state, load };
}

export default useGet;
