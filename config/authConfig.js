import { CLIENT_ID, AUTHORIZATION_ENDPOINT } from "@env";
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
    ],
    usePKCE: true,
    redirectUri: makeRedirectUri({
      scheme: "spotify-clone",
      useProxy: true,
    }),
  },
  discovery: {
    authorizationEndpoint: AUTHORIZATION_ENDPOINT,
  },
};
