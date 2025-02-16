import { axiosRequest } from "../apiConnector";
import { USER_ENDPOINTS } from "../apiEndpoints";

const { GET_CURRENT_USER, GET_TOP_ITEMS, GET_RECENTLY_PLAYED } = USER_ENDPOINTS;

// function to get current users's profile
export async function getCurrentUser() {
  try {
    let response = await axiosRequest("GET", GET_CURRENT_USER, null, null, {});

    if (!response?.data) {
      throw new Error("Unexpected response format");
    }
    return response.data;
  } catch (err) {
    throw new Error(err.message);
  }
}

// function to get current users's top items
export async function getUsersTopItems(type) {
  try {
    let response = await axiosRequest(
      "GET",
      GET_TOP_ITEMS + "/" + type,
      null,
      null,
      {
        limit: 3,
      }
    );

    if (!response?.data) {
      throw new Error("Unexpected response format");
    }
    return response.data?.items;
  } catch (err) {
    throw new Error(err.message);
  }
}

// function to get current users's recently played
export async function getRecentlyPlayed() {
  try {
    let response = await axiosRequest("GET", GET_RECENTLY_PLAYED, null, null, {
      limit: 4,
    });

    if (!response?.data) {
      throw new Error("Unexpected response format");
    }
    return response.data?.items;
  } catch (err) {
    throw new Error(err.message);
  }
}
