import React from "react";
import "../global.css";
import Navigation from "../StackNavigator";
import { UserContextProvider } from "../context/UserContext";
import { LikedSongsContextProvider } from "../context/LikedSongsContext";

const RootLayout = () => {
  return (
    <>
      <UserContextProvider>
        <LikedSongsContextProvider>
          <Navigation />
        </LikedSongsContextProvider>
      </UserContextProvider>
    </>
  );
};

export default RootLayout;
