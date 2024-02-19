import {
  createApi,
  FetchArgs,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";
import { routes } from "../../config/constatnts";
import { setCredentials, logOut } from "../../state/auth/authSlice";
import { getToken } from "../../utils/helperFunction";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_API_BACKEND,
  credentials: "omit",
  prepareHeaders: (headers, { getState }: any) => {
    const token = getToken("accessToken");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReAuth = async (
  args: string | FetchArgs,
  api: any,
  extraoptions: {}
) => {
  let result = await baseQuery(args, api, extraoptions);

  if (result?.error?.status === 403) {
    console.log("sending refresh token ");

    const refreshResult = await baseQuery(routes.refresh, api, extraoptions);
    console.log(refreshResult);

    if (refreshResult?.data) {
      const user = api.getState().auth.user;
      api.dispatch(setCredentials({ ...refreshResult.data, user }));
      // retry with new access token

      result = await baseQuery(args, api, extraoptions);
    } else {
      api.dispatch(logOut);
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReAuth,
  endpoints: (builder) => ({}),
});
