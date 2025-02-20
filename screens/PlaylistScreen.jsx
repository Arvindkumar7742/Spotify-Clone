import { Alert, FlatList, Image, Pressable, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { getPlaylistSongs } from "../services/operations/playlist";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { reduceUniqueSongs } from "../utils/getUniqueSongs";

const PlaylistScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;
  const [playlistTracks, setPlayListsTracks] = useState([]);

  useEffect(() => {
    const fetchPlaylistTracks = async () => {
      try {
        const result = await getPlaylistSongs(item.id, item.tracks.total);

        if (result) {
          setPlayListsTracks(reduceUniqueSongs(result.items));
          console.log("skdn=>", result);
        }
      } catch (err) {
        Alert.alert("Error", err.message);
      }
    };

    fetchPlaylistTracks();
  }, []);

  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ height: "100%" }}>
      <SafeAreaView>
        <LinearGradient
          colors={["rgb(48, 25, 52)", "rgb(52, 52, 52)", "rgb(27, 18, 18)"]}
          className="p-10 justify-center items-center"
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
        </LinearGradient>

        <View className="flex gap-2  p-4">
          <Text className="text-white text-xl font-bold">{item?.name}</Text>
          <View className="flex-row justify-between">
            <Text className="text-white text-md font-semibold">
              {item.tracks.total} Songs
            </Text>
            <MaterialIcons name="playlist-add-check" size={24} color="green" />
          </View>
        </View>

        <View className="px-4 ">
          <Text className="text-white text-lg font-bold">Songs</Text>
          <FlatList
            className="mt-5"
            data={playlistTracks}
            keyExtractor={(item) => item?.track?.id}
            renderItem={({ item, index }) => (
              <Pressable
                onPress={() => {
                  navigation.navigate("SongInfo", { item: item });
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
                  <Entypo name="dots-three-vertical" size={22} color="white" />
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
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default PlaylistScreen;
