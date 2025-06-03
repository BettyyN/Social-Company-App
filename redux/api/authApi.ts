import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    // REMOVED the manual Content-Type setting
    validateStatus: (response) => {
      return response.status >= 200 && response.status < 300;
    },
  }),
  endpoints: (builder) => ({
    signup: builder.mutation({
      query: (formData) => ({
        url: "/user",
        method: "POST",
        body: formData,
        // No headers set here - let the browser handle it automatically
        // Add transform to handle errors
        transformErrorResponse: (response: any) => {
          return response.data;
        },
      }),
    }),
  }),
});

export const { useSignupMutation } = authApi;
