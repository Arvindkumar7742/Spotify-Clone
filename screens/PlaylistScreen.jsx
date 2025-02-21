import {
  Alert,
  FlatList,
  Image,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Entypo, Ionicons } from "@expo/vector-icons";

import {
  followPlaylist,
  getPlaylistSongs,
  unfollowPlaylist,
} from "../services/operations/playlist";
import { reduceUniqueSongs } from "../utils/getUniqueSongs";
import { FollowedPlaylistContext } from "../context/FollowedPlaylistContext";
import HorizontalLoader from "../components/Common/HorizontalLoader";

const PlaylistScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;
  const [playlistTracks, setPlayListsTracks] = useState([]);
  const { followedPlaylists, setFollowedPlaylists } = useContext(
    FollowedPlaylistContext
  );
  const [isFollowed, setIsFollowed] = useState(
    followedPlaylists.map((item) => item.id)
  );
  const [loading, setLoading] = useState(false);

  // function to follow a playlist
  async function handleFollowAPlaylist() {
    try {
      if (!isFollowed.includes(item.id)) {
        const result = await followPlaylist(item.id);
        if (result) {
          setFollowedPlaylists((prev) => [item, ...prev]);
          setIsFollowed((prev) => [item.id, ...prev]);
        }
      } else {
        const result = await unfollowPlaylist(item.id);
        if (result) {
          setFollowedPlaylists((prev) =>
            prev.filter((it) => it.id !== item.id)
          );
          setIsFollowed((prev) => prev.filter((it) => it !== item.id));
        }
      }
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  }

  useEffect(() => {
    // function to fetch the playlist song when render initially
    const fetchPlaylistTracks = async () => {
      setLoading(true);
      try {
        const result = await getPlaylistSongs(item.id, item.tracks.total);

        if (result) {
          setPlayListsTracks(reduceUniqueSongs(result.items));
        }
      } catch (err) {
        Alert.alert("Error", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylistTracks();
  }, []);

  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ height: "100%" }}>
      <SafeAreaView>
        <LinearGradient
          colors={["rgb(48, 25, 52)", "rgb(52, 52, 52)", "rgb(27, 18, 18)"]}
          className="p-10 justify-center items-center relative"
        >
          <Image
            style={{
              width: 200,
              height: 200,
            }}
            source={{
              uri: item?.images[0].url,
            }}
          />
          <TouchableOpacity className="absolute top-3 left-3 bg-black/50 w-[40px] h-[40px] justify-center items-center rounded-full">
            <Ionicons
              name="arrow-back-outline"
              size={24}
              color="white"
              onPress={() => navigation.goBack()}
            />
          </TouchableOpacity>
        </LinearGradient>

        <View className="flex gap-2  p-4">
          <Text className="text-white text-xl font-bold">{item?.name}</Text>
          <View className="flex-row justify-between">
            <Text className="text-white text-md font-semibold">
              {item.tracks.total} Songs
            </Text>
            <MaterialIcons
              onPress={() => {
                handleFollowAPlaylist();
              }}
              name={
                isFollowed.includes(item.id)
                  ? "playlist-add-check"
                  : "playlist-add"
              }
              size={24}
              color={isFollowed.includes(item.id) ? "green" : "white"}
            />
          </View>
        </View>

        <View className="px-4 ">
          <Text className="text-white text-lg font-bold">Songs</Text>
          {loading ? (
            <HorizontalLoader flag="top-track" />
          ) : (
            <FlatList
              className="mt-5"
              data={playlistTracks}
              keyExtractor={(item) => item?.track?.id}
              renderItem={({ item, index }) => (
                <Pressable
                  onPress={() => {
                    navigation.navigate("SongInfo", { item: item.track });
                  }}
                  className="mb-2 flex-row items-center gap-2 mx-2 my-2 rounded-md shadow-md p-2"
                  style={{ width: "100%" }}
                >
                  {/* Index */}
                  <Text className="text-white text-md font-bold mr-2">
                    {index + 1}
                  </Text>

                  {/* Image */}
                  <Image
                    className="w-[55px] h-[55px] rounded-md"
                    source={{
                      uri: item?.track?.album?.images[0]?.url
                        ? item?.track?.album?.images[0]?.url
                        : "https://static.vecteezy.com/system/resources/previews/002/249/673/non_2x/music-note-icon-song-melody-tune-flat-symbol-free-vector.jpg",
                    }}
                  />

                  {/* Text + Icon Wrapper */}
                  <View className="flex-row justify-between items-center flex-1">
                    {/* Song Info */}
                    <View className="flex-1">
                      <Text
                        className="text-white text-xl font-bold"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {item?.track.name || "Unknown Melody"}
                      </Text>
                      <Text
                        className="text-gray-400 text-xs"
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {item.track.artists
                          .map((artist) => artist.name)
                          .join(", ") || "Unknown Artist"}
                      </Text>
                    </View>

                    {/* Three Dots Icon */}
                    <Entypo
                      name="dots-three-vertical"
                      size={22}
                      color="white"
                    />
                  </View>
                </Pressable>
              )}
              contentContainerStyle={{ paddingBottom: 950 }}
              ListEmptyComponent={
                <View className="flex items-center justify-center h-40">
                  <Text className="text-white text-lg font-semibold">
                    No Tracks Found
                  </Text>
                </View>
              }
            />
          )}
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default PlaylistScreen;
