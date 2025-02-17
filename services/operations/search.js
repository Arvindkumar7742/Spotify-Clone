import { axiosRequest } from "../apiConnector";
import { SEARCH_ENDPOINTS } from "../apiEndpoints";

const { GET_CATEGORIZED_RESULT } = SEARCH_ENDPOINTS;

//function to get new releases
export async function getCategorizedResult(q) {
  try {
    const response = await axiosRequest(
      "GET",
      GET_CATEGORIZED_RESULT,
      null,
      null,
      {
        q,
        type: "album,track,playlist,artist",
        limit: 10,
        offset: 0,
      }
    );

    if (!response?.data) {
      throw new Error("Unexpected response format");
    }

    return response.data;
  } catch (err) {
    throw new Error("Error in fetching categorized result.");
  }
}
