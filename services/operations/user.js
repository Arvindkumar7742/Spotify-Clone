import { axiosRequest } from "../apiConnector";
import { PROFILE_ENDPOINTS } from "../apiEndpoints";

const { GET_CURRENT_USER } = PROFILE_ENDPOINTS;
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
