import { ActivityIndicator, View } from "react-native";
import React from "react";

const HorizontalLoader = ({ flag }) => {
  return (
    <View
      style={{
        margin: 4,
        width: flag == "top-track" ? 330 : 350,
        height: flag == "top-track" ? 400 : 130,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#414040",
        p: 2,
        borderRadius: 16,
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      }}
    >
      <ActivityIndicator color="white" size="large" />
    </View>
  );
};

export default HorizontalLoader;
