import React from "react";

import "../global.css";
import Navigation from "../StackNavigator";
import { UserContextProvider } from "../context/UserContext";
import { LikedSongsContextProvider } from "../context/LikedSongsContext";
import { FollowedPlayListContextProvider } from "../context/FollowedPlaylistContext";
import { TranslationContextProvider } from "../context/TranslationContext";

const RootLayout = () => {
  return (
    <>
      <UserContextProvider>
        <LikedSongsContextProvider>
          <FollowedPlayListContextProvider>
            <TranslationContextProvider>
              <Navigation />
            </TranslationContextProvider>
          </FollowedPlayListContextProvider>
        </LikedSongsContextProvider>
      </UserContextProvider>
    </>
  );
};

export default RootLayout;
