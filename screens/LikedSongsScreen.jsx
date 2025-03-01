import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

import SongItem from "../components/SongItem";
import { LikedSongsContext } from "../context/LikedSongsContext";

const LikedSongsScreen = () => {
  const [input, setInput] = useState("");
  const navigation = useNavigation();
  const { likedTracks } = useContext(LikedSongsContext);
  const [searchedTracks, setSearchedTracks] = useState(likedTracks);

  // searching for the song
  function handleSearch(text) {
    const filteredTracks = likedTracks.filter((item) =>
      item.track.name.toLowerCase().includes(text.toLowerCase())
    );
    setSearchedTracks(filteredTracks);
  }
  const handleInputChange = (text) => {
    setInput(text);
    handleSearch(text);
  };

  return (
    <>
      <LinearGradient colors={["#614385", "#516395"]} style={{ flex: 1 }}>
        <ScrollView className="flex-1 mt-[50px]">
          {/* Back Button */}
          <Pressable onPress={() => navigation.goBack()} className="mx-[10px]">
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable>

          {/* Search Bar and Sort Button */}
          <View className="flex-row items-center justify-between mx-[10px] mt-[9px]">
            {/* Search Input Container */}
            <View className="flex-row items-center bg-[#42275a] p-[9px] flex-1 rounded-[3px] h-[38px] gap-[10px]">
              <AntDesign name="search1" size={20} color="white" />
              <TextInput
                style={{
                  height: 100,
                  width: 230,
                  marginTop: 55,
                  paddingTop: 10,
                  textAlignVertical: "top",
                  color: "white",
                }}
                value={input}
                onChangeText={handleInputChange}
                placeholder="Find in Liked songs"
                placeholderTextColor="white"
              />
            </View>

            {/* Sort Button */}
            <Pressable className="mx-[10px] bg-[#42275a] p-[10px] rounded-[3px] h-[38px] justify-center">
              <Text className="text-white">Sort</Text>
            </Pressable>
          </View>

          <View style={{ height: 50 }} />
          <View style={{ marginHorizontal: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
              Liked Songs
            </Text>
            <Text style={{ color: "white", fontSize: 13, marginTop: 5 }}>
              {likedTracks.length} songs
            </Text>
          </View>

          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {searchedTracks.length === 0 ? (
              <ActivityIndicator size="large" color="gray" />
            ) : searchedTracks.length < likedTracks.length ? (
              <FlatList
                data={searchedTracks}
                renderItem={({ item }) => <SongItem item={item} />}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
              />
            ) : (
              <FlatList
                data={likedTracks}
                renderItem={({ item }) => <SongItem item={item} />}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
              />
            )}
          </ScrollView>
        </ScrollView>
      </LinearGradient>
    </>
  );
};

export default LikedSongsScreen;
