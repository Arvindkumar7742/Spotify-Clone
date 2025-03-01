import { axiosRequest } from "../apiConnector";
import { TRACK_END_POINTS } from "../apiEndpoints";

const { GET_TRACK } = TRACK_END_POINTS;

//function to get new releases
export async function getTrackData(trackId) {
  try {
    const response = await axiosRequest(
      "GET",
      GET_TRACK + `/${trackId}`,
      null,
      null,
      {}
    );

    if (!response?.data) {
      throw new Error("Unexpected response format");
    }

    return response.data;
  } catch (err) {
    throw new Error("Error in fetching track.");
  }
}
