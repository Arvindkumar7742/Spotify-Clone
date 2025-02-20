import React from "react";
import "../global.css";
import Navigation from "../StackNavigator";
import { UserContextProvider } from "../context/UserContext";
import { LikedSongsContextProvider } from "../context/LikedSongsContext";
import { FollowedPlayListContextProvider } from "../context/FollowedPlaylistContext";

const RootLayout = () => {
  return (
    <>
      <UserContextProvider>
        <LikedSongsContextProvider>
          <FollowedPlayListContextProvider>
            <Navigation />
          </FollowedPlayListContextProvider>
        </LikedSongsContextProvider>
      </UserContextProvider>
    </>
  );
};

export default RootLayout;
