
import { TMeta } from "@/types";
import type { BaseQueryFn } from "@reduxjs/toolkit/query";
import type { AxiosRequestConfig, AxiosError } from "axios";
import { axiosInstance } from "./axiosInstance";

export const axiosBaseQuery =
  (
    { baseUrl }: { baseUrl: string } = { baseUrl: "" }
  ): BaseQueryFn<
    {
      url: string;
      method?: AxiosRequestConfig["method"];
      data?: AxiosRequestConfig["data"];
      params?: AxiosRequestConfig["params"];
      headers?: AxiosRequestConfig["headers"];
      meta?:TMeta;
      contentType:string;
    },
    unknown,
    unknown
  > =>
  async ({ url, method, data, params, headers,contentType }) => {
    try {
      // const result = await axios({
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
        headers:{
          "Content-Type":contentType ||'application/json'
        }
        
      });
      return result;
    //   return { data: result.data };
    } catch (axiosError) {
      const err = axiosError as AxiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

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
