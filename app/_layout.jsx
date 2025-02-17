import { View, Text } from "react-native";
import React from "react";
import "../global.css";
import Navigation from "../StackNavigator";
import { StatusBar } from "expo-status-bar";
import { PlayerContextProvider } from "../context/PlayerContext";
import { ModalPortal } from "react-native-modals";

const RootLayout = () => {
  return (
    <>
      <PlayerContextProvider>
        <Navigation />
      </PlayerContextProvider>
      <ModalPortal />
    </>
  );
};

export default RootLayout;
