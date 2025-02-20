import { axiosRequest } from "../apiConnector";
import { USER_ENDPOINTS } from "../apiEndpoints";

const {
  GET_CURRENT_USER,
  GET_TOP_ITEMS,
  GET_RECENTLY_PLAYED,
  GET_LIKED_TRACKS,
  GET_FOLLOWED_ARTIST,
  GET_USERS_PLAYLISTS,
  SAVE_TRACKS_FOR_USER,
  REMOVE_TRACKS_FOR_USER,
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
    throw new Error("Error in getting current user");
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
        limit: 12,
      }
    );

    if (!response?.data) {
      throw new Error("Unexpected response format");
    }
    return response.data?.items;
  } catch (err) {
    throw new Error("Error in getting the Top items data");
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
    throw new Error("Error in getting the recently played songs");
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
    throw new Error("Error in getting the Liked Songs");
  }
}

// function to get the followed artists
export async function getFollowedArtists() {
  try {
    let response = await axiosRequest("GET", GET_FOLLOWED_ARTIST, null, null, {
      type: "artist",
      limit: 10,
    });

    if (!response?.data) {
      throw new Error("Unexpected response format");
    }
    return response.data;
  } catch (err) {
    throw new Error("Error in getting the user's followed artists");
  }
}

// function to get the user's playlist
export async function getUsersPlaylist() {
  try {
    let response = await axiosRequest("GET", GET_USERS_PLAYLISTS, null, null, {
      limit: 10,
    });

    if (!response?.data) {
      throw new Error("Unexpected response format");
    }
    return response.data?.items;
  } catch (err) {
    throw new Error("Error in getting the user's playlist");
  }
}

// function to save / like a track in user's saved tracks
export async function saveTrackForCurrentUser(trackId) {
  try {
    let response = await axiosRequest("PUT", SAVE_TRACKS_FOR_USER, null, null, {
      ids: trackId,
    });

    if (response.status === 200) {
      return true;
    }
  } catch (err) {
    throw new Error("Error in saving the track in current user");
  }
}

// function to unsave / dislike a track in user's saved tracks
export async function removeTrackFromCurrentUser(trackId) {
  try {
    let response = await axiosRequest(
      "DELETE",
      REMOVE_TRACKS_FOR_USER,
      null,
      null,
      {
        ids: trackId,
      }
    );

    if (response.status === 200) {
      return true;
    }
  } catch (err) {
    throw new Error("Error in removing the track from current user");
  }
}
