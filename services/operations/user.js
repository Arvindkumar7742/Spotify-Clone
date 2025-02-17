import { axiosRequest } from "../apiConnector";
import { USER_ENDPOINTS } from "../apiEndpoints";

const {
  GET_CURRENT_USER,
  GET_TOP_ITEMS,
  GET_RECENTLY_PLAYED,
  GET_LIKED_TRACKS,
} = USER_ENDPOINTS;

// function to get current users's profile
export async function getCurrentUser() {
  try {
    let response = await axiosRequest("GET", GET_CURRENT_USER, null, null, {});

    if (!response?.data) {
      throw new Error("Unexpected response format");
    }
    return response.data;
  } catch (err) {
    throw new Error(
      err?.response?.data || err.message || "Error in getting current user"
    );
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
    throw new Error(
      err?.response?.data ||
        err.message ||
        "Error in getting the Top items data"
    );
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
    throw new Error(
      err?.response?.data ||
        err.message ||
        "Error in getting the recently played songs"
    );
  }
}

// function to get user's like songs
export async function getLikedTracks() {
  try {
    let response = await axiosRequest("GET", GET_LIKED_TRACKS, null, null, {
      limit: 40,
    });

    if (!response?.data) {
      throw new Error("Unexpected response format");
    }
    return response.data?.items;
  } catch (err) {
    throw new Error(
      err?.response?.data || err.message || "Error in getting the Liked Songs"
    );
  }
}
