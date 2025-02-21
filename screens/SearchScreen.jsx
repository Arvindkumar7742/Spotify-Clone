import {
  View,
  Text,
  TextInput,
  Alert,
  Pressable,
  BackHandler,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import TopTracks from "../components/TopTracks";
import { getCategorizedResult } from "../services/operations/search";
import ShowSearchResults from "../components/Search/ShowSearchResults";
import HorizontalLoader from "../components/Common/HorizontalLoader";

const SearchScreen = () => {
  const [searchText, setSearchText] = useState("");
  const [isSearchInputFocused, setIsSearchInputFocused] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const inputRef = useRef(null);

  const handleTextChange = async (text) => {
    setSearchText(text);
  };

  const handleInputBlur = () => {
    if (inputRef.current) {
      inputRef.current.blur();
      setIsSearchInputFocused(false);
      setSearchText("");
    }
  };

  // calling api's for searching the text
  const handleSearch = async () => {
    if (searchText.trim()) {
      setLoading(true);
      try {
        const result = await getCategorizedResult(searchText);

        if (result) {
          setSearchResults(result);
        }
      } catch (err) {
        Alert.alert("Error", err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  // adding event for toggling between the search results and top tracks
  useEffect(() => {
    const onBackPress = () => {
      if (isSearchInputFocused) {
        handleInputBlur();
        return true; // Prevent default back navigation
      }
      return false; // Allow default back navigation
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      onBackPress
    );
    return () => backHandler.remove();
  }, [isSearchInputFocused]);

  return (
    <LinearGradient colors={["#040306", "#131624"]} className="flex-1">
      <SafeAreaView className="flex-1">
        <View className="px-4 flex flex-col gap-10 flex-1 pb-[52px]">
          <View className="w-full mt-10 flex flex-row items-center gap-6">
            <Text className="text-white text-3xl font-bold">Search</Text>
          </View>

          <View className="relative w-full justify-center">
            <Pressable onPress={handleInputBlur} className="absolute z-10 mx-4">
              <Ionicons
                name={isSearchInputFocused ? "arrow-back" : "search-outline"}
                size={25}
                color="black"
                className=""
              />
            </Pressable>

            <TextInput
              ref={inputRef}
              onFocus={() => setIsSearchInputFocused(true)}
              onBlur={handleSearch}
              onChangeText={handleTextChange}
              value={searchText}
              className="bg-white pl-14 text-lg font-semibold rounded-lg h-16"
              placeholder="What do you want to listen to?"
              placeholderTextColor="rgba(0, 0, 0, 0.8)"
            />
          </View>

          {!isSearchInputFocused && searchText.trim().length === 0 ? (
            <TopTracks />
          ) : loading ? (
            <HorizontalLoader flag="top-track" />
          ) : (
            <ShowSearchResults searchResults={searchResults} />
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default SearchScreen;
