import { CLIENT_ID, AUTHORIZATION_ENDPOINT, BASE_URL } from "@env";
import { makeRedirectUri, ResponseType } from "expo-auth-session";

// exporting the auth config
export const authConfig = {
  config: {
    responseType: ResponseType.Token,
    clientId: CLIENT_ID,
    scopes: [
      "user-read-email",
      "user-library-read",
      "user-read-recently-played",
      "user-top-read",
      "playlist-read-private",
      "playlist-read-collaborative",
      "playlist-modify-public",
      "user-follow-read",
      "user-library-modify",
      "playlist-modify-public",
      "playlist-modify-private",
    ],
    usePKCE: false,
    redirectUri: makeRedirectUri({
      scheme: "myspotifyapp",
      useProxy: true,
    }),
  },
  discovery: {
    authorizationEndpoint: AUTHORIZATION_ENDPOINT,
  },
};

// export the api config
export const apiConfig = {
  baseUrl: BASE_URL,
};
