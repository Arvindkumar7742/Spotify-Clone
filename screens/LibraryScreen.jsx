import { View, Text, ScrollView, Pressable, Image, Alert } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { getFollowedArtists } from "../services/operations/user";
import CustomButton from "../components/Common/CustomButton";
import { UserContext } from "../context/UserContext";
import { useNavigation } from "expo-router";
import ShowPlaylistArtist from "../components/ShowPlaylistArtist";
import { FollowedPlaylistContext } from "../context/FollowedPlaylistContext";
import HorizontalLoader from "../components/Common/HorizontalLoader";

const LibraryScreen = () => {
  const navigation = useNavigation();
  const [activeCategory, setActiveCategory] = useState("All");
  const { followedPlaylists } = useContext(FollowedPlaylistContext);
  const [artists, setArtists] = useState([]);
  const { user } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [artistsResult] = await Promise.allSettled([getFollowedArtists()]);

      // Handle user artists
      if (artistsResult.status === "fulfilled") {
        setArtists(artistsResult.value?.artists.items);
      } else {
        Alert.alert("Error", "Failed to fetch user followed artists");
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <LinearGradient colors={["#040306", "#131624"]} className="flex-1">
      <SafeAreaView>
        <View className="px-4 flex flex-col gap-10 mb-12">
          <View className="w-full mt-10 flex flex-row items-center gap-4">
            <Pressable
              onPress={() => {
                navigation.navigate("Profile");
              }}
            >
              <Image
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  resizeMode: "cover",
                }}
                source={{
                  uri:
                    user?.images.length > 0
                      ? user?.images[0].url
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQABqQIdskCD9BK0I81EbVfV9tTz320XvJ35A&s",
                }}
              />
            </Pressable>
            <Text className="text-white text-3xl font-bold">Your Library</Text>
          </View>

          <View className="flex flex-row gap-3">
            {["All", "Artists", "Playlists"].map((category) => (
              <CustomButton
                key={category}
                isActive={activeCategory === category}
                handlePress={(cat) => setActiveCategory(cat)}
                category={category}
              />
            ))}
          </View>

          {loading ? (
            <HorizontalLoader flag="top-track" />
          ) : (
            <View className="flex p-2 gap-2 flex-col">
              <ShowPlaylistArtist
                artists={artists}
                playlists={followedPlaylists}
                activeCategory={activeCategory}
              />
            </View>
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LibraryScreen;
