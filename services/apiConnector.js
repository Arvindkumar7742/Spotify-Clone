import axios from "axios";
import { apiConfig } from "../config";
import AsyncStorage from "@react-native-async-storage/async-storage";

// create the axios and import the configuration of base url, key and token from config
export const axiosInstance = axios.create({});
const baseURL = apiConfig.baseUrl;

export const axiosRequest = async (method, url, headers, bodyData, params) => {
  const accessToken = await AsyncStorage.getItem("token");
  return axiosInstance({
    method: `${method}`,
    url: `${baseURL + url}`,
    data: bodyData ? bodyData : null,
    headers: {
      ...headers,
      Authorization: `Bearer ${accessToken}`,
    },
    params: params ? params : null,
  });
};
