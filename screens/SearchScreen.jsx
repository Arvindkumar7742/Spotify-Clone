import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import TopTracks from "../components/TopTracks";

const SearchScreen = () => {
  const [query, setQuery] = useState("");

  function handleTextChange(text) {
    setQuery(text);
  }

  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <Text className="text-white m-2 font-bold text-xl ">Search</Text>
      <View className="relative w-full justify-center p-2">
        <Ionicons
          name="search-outline"
          size={25}
          color="black"
          className="absolute z-10 mx-5"
        />

        <TextInput
          onChangeText={handleTextChange}
          value={query}
          className="bg-white pl-12 text-lg font-semibold rounded-lg"
          placeholder="What do you want to listen to?"
          placeholderTextColor="rgba(0, 0, 0, 0.8)"
        />
      </View>

      <TopTracks />
    </LinearGradient>
  );
};

export default SearchScreen;
