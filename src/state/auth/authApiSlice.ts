import { apiSlice } from "../../app/api/apiSlice";
import { routes } from "../../config/constatnts";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder: any) => ({
    login: builder.mutation({
      query: (credentials: any) => ({
        url: routes.login,
        method: "POST",
        body: { ...credentials },
      }),
    }),

    signup: builder.mutation({
      query: (credentials: any) => ({
        url: routes.register,
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});
export const { useLoginMutation, useSignupMutation } = authApiSlice;
