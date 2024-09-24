import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/v1/' }),
  tagTypes:[],
  endpoints: () => ({}),
  
})







// const api = createApi({
//   baseQuery: axiosBaseQuery({
//     baseUrl: "https://example.com",
//   }),
//   endpoints(build) {
//     return {
//       query: build.query({ query: () => ({ url: "/query", method: "get" }) }),
//       mutation: build.mutation({
//         query: () => ({ url: "/mutation", method: "post" }),
//       }),
//     };
//   },
// });