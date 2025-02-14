import { View, Text } from "react-native";
import React from "react";
import "../global.css";
import Navigation from "../StackNavigator";
import { StatusBar } from "expo-status-bar";

const RootLayout = () => {
  return (
    <>
      <Navigation />
    </>
  );
};

export default RootLayout;
