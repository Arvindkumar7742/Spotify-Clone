import { Text, Pressable } from "react-native";
import React from "react";

const CustomButton = ({ isActive, handlePress, category }) => {
  return (
    <Pressable
      onPress={() => handlePress(category)}
      style={{
        backgroundColor: isActive ? "#40ff00" : "#282828",
      }}
      className={`transition-all duration-300 rounded-full px-4 py-2`}
    >
      <Text className={isActive ? "text-black" : "text-white"}>{category}</Text>
    </Pressable>
  );
};

export default CustomButton;
