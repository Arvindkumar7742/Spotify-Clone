import { axiosRequest } from "../apiConnector";
import { ALBUM_ENDPOINTS } from "../apiEndpoints";

const { GET_NEW_RELEASES } = ALBUM_ENDPOINTS;

//function to get new releases
export async function getNewReleases() {
  try {
    const response = await axiosRequest("GET", GET_NEW_RELEASES, null, null, {
      limit: 4,
      offset: 0,
    });

    if (!response?.data) {
      throw new Error("Unexpected response format");
    }

    return response.data.albums.items;
  } catch (err) {
    throw new Error("Error in getting new release songs.");
  }
}
