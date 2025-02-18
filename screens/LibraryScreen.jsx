import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  getFollowedArtists,
  getUsersPlaylist,
} from "../services/operations/user";
import CustomButton from "../components/Common/CustomButton";

const LibraryScreen = () => {
  const [activeCategory, setActiveCategory] = useState("");
  const [artists, setArtists] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [combinedData, setCombinedData] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const [artistsResult, playlistsResult] = await Promise.allSettled([
        getFollowedArtists(),
        getUsersPlaylist(),
      ]);

      // // Handle user artists
      // if (artistsResult.status === "fulfilled") {
      //   console.log("🚀 ~ fetchData ~ artistsResult:", artistsResult.value);
      //   setArtists(artistsResult.value?.items);
      // } else {
      //   Alert.alert("Error", "Failed to fetch user artists");
      // }

      // // Handle user playlist
      // if (playlistsResult.status === "fulfilled") {
      //   console.log("🚀 ~ fetchData ~ playlistsResult:", playlistsResult.value);
      //   setPlaylists(playlistsResult.value?.items);
      // } else {
      //   Alert.alert("Error", "Failed to fetch user playlist");
      // }
    };

    fetchData();
  }, []);

  return (
    <LinearGradient colors={["#040306", "#131624"]} className="flex-1">
      <SafeAreaView>
        <ScrollView>
          <View className="px-4 flex flex-col gap-10 mb-12">
            <View className="w-full mt-10 flex flex-row items-center gap-4">
              <Text className="text-white text-3xl font-bold">
                Your Library
              </Text>
            </View>

            <View className="flex flex-row gap-3">
              {["Artists", "Playlists"].map((category) => (
                <CustomButton
                  key={category}
                  isActive={activeCategory === category}
                  handlePress={(cat) =>
                    cat === activeCategory
                      ? setActiveCategory("")
                      : setActiveCategory(cat)
                  }
                  category={category}
                />
              ))}
            </View>

            <View className="flex flex-wrap flex-row justify-between gap-2.5"></View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LibraryScreen;
