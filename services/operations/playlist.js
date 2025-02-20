import { axiosRequest } from "../apiConnector";
import { PLAYLIST_END_POINTS } from "../apiEndpoints";

const { GET_PLAYLIST_TRACKS } = PLAYLIST_END_POINTS;

//function to get new artist's top songs
export async function getPlaylistSongs(playlistId, limit) {
  try {
    const response = await axiosRequest(
      "GET",
      GET_PLAYLIST_TRACKS + `/${playlistId}/tracks`,
      null,
      null,
      {
        limit: limit,
        offset: 0,
      }
    );

    if (!response?.data) {
      throw new Error("Unexpected response format");
    }

    return response.data;
  } catch (err) {
    throw new Error("Error in fetching Playlist songs");
  }
}
