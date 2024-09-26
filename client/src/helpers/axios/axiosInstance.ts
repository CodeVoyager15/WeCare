import { authKey } from "@/contants/authKey";
import { TGenericErrorResponse, TResponseSuccess } from "@/types";
import { getFromLocalStorage } from "@/utils/local-storage";
import axios from "axios";

const axiosInstance = axios.create({});
axiosInstance.defaults.headers.post["Content-Type"] = "application/json";
axiosInstance.defaults.timeout = 50000;

// Add a request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    // Do something before request is sent

    const accessToken = getFromLocalStorage(authKey);
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  //@ts-ignore
  function (response) {
    const responseObject: TResponseSuccess = {
      data: response.data.data,
      meta: response?.data?.meta,
    };

    return responseObject;
  },
  function (error) {
    const responseObject: TGenericErrorResponse = {
      statusCode: error?.response?.data?.statusCode || 500,
      message: error?.response?.data?.message || "Something Went Wrong !!",
      errorMessages: error?.response?.data?.message,
    };
    return responseObject;
  }
);

export { axiosInstance };
