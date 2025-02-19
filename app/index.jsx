import React from "react";
import "../global.css";
import Navigation from "../StackNavigator";
import { UserContextProvider } from "../context/UserContext";

const RootLayout = () => {
  return (
    <>
      <UserContextProvider>
        <Navigation />
      </UserContextProvider>
    </>
  );
};

export default RootLayout;
