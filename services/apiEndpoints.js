// USERS ENDPOINTS
export const USER_ENDPOINTS = {
  GET_CURRENT_USER: "/me",
  GET_TOP_ITEMS: "/me/top",
  GET_RECENTLY_PLAYED: "/me/player/recently-played",
  GET_LIKED_TRACKS: "/me/tracks",
};

// ALBUM ENDPOINTS
export const ALBUM_ENDPOINTS = {
  GET_NEW_RELEASES: "/browse/new-releases",
};

//  SEARCH END POINTS
export const SEARCH_ENDPOINTS = {
  GET_CATEGORIZED_RESULT: "/search",
};

// ARTIST END POINTS
export const ARTIST_END_POINTS = {
  GET_ARTIST_TOP_SONGS: "/artists",
  GET_ARTIST_ALBUMS: "/artists",
  GET_ARTIST_RELATED_ARTIST: "/artists",
};
