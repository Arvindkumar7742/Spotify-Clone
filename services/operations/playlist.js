import { axiosRequest } from "../apiConnector";
import { PLAYLIST_END_POINTS } from "../apiEndpoints";

const { GET_PLAYLIST_TRACKS, FOLLOW_PLAYLIST, UNFOLLOW_PLAYLIST } =
  PLAYLIST_END_POINTS;

//function to get new artist's top songs
export async function getPlaylistSongs(playlistId, limit) {
  try {
    const response = await axiosRequest(
      "GET",
      GET_PLAYLIST_TRACKS + `/${playlistId}/tracks`,
      null,
      null,
      {
        limit: 50,
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

// function to follow a particular playlist
export async function followPlaylist(playlistId) {
  try {
    const response = await axiosRequest(
      "PUT",
      FOLLOW_PLAYLIST + `/${playlistId}/followers`,
      null,
      null,
      {}
    );

    if (response.status === 200) {
      return true;
    }
  } catch (err) {
    throw new Error("Error in following a playlist");
  }
}

// function to unfollow a play list
export async function unfollowPlaylist(playlistId) {
  try {
    const response = await axiosRequest(
      "DELETE",
      UNFOLLOW_PLAYLIST + `/${playlistId}/followers`,
      null,
      null,
      {}
    );

    if (response.status === 200) {
      return true;
    }
  } catch (err) {
    throw new Error("Error while unfollowing a playlist");
  }
}
