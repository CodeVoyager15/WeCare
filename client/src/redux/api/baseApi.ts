import { axiosBaseQuery } from '@/helpers/axios/axiosBaseQuery'
import { createApi } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: axiosBaseQuery({ baseUrl: 'http://localhost:5000/api/v1/' }),
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