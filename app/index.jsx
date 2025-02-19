import React from "react";
import "../global.css";
import Navigation from "../StackNavigator";
import { UserContextProvider } from "../context/UserContext";
import { StatusBar } from "expo-status-bar";

const RootLayout = () => {
  return (
    <>
      <UserContextProvider>
        <Navigation />
        <StatusBar className="bg-black" style="light" />
      </UserContextProvider>
    </>
  );
};

export default RootLayout;
