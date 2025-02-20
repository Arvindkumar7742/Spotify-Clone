import { Alert, Image, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { getPlaylistSongs } from "../services/operations/playlist";
import { useRoute } from "@react-navigation/native";

const PlaylistScreen = () => {
  const route = useRoute();
  const { item } = route.params;
  const [playlistTracks, setPlayListsTracks] = useState([]);

  useEffect(() => {
    const fetchPlaylistTracks = async () => {
      try {
        const result = await getPlaylistSongs(item.id);

        if (result) {
          setPlayListsTracks(result.items);
        }
      } catch (err) {
        Alert.alert("Error", err.message);
      }
    };

    fetchPlaylistTracks();
  });

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
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item, index }) => (
              <Pressable
                onPress={() => {
                  navigation.navigate("SongInfo", {
                    item: item,
                  });
                }}
                className="mb-2 flex-row w-1/2 items-center gap-2 mx-2 my-2 rounded-md shadow-md p-2"
              >
                <View>
                  <Text className="text-white text-md font-bold mr-2">
                    {index + 1}
                  </Text>
                </View>
                <Image
                  className="w-[55px] h-[55px] rounded-md"
                  source={{ uri: item.album.images[0]?.url }}
                />
                <View
                  style={{
                    width: "75%",
                  }}
                  className="flex-row justify-between"
                >
                  <View>
                    <Text className="text-white text-[20px] font-bold w-[106px]">
                      {item?.name.length < 25
                        ? item?.name
                        : item?.name.slice(0, 25) + "..."}
                    </Text>
                    <Text className="text-white text-xs font-semibold w-[106px]">
                      {item.album.artists[0]?.name.length < 25
                        ? item.album.artists[0]?.name
                        : item.album.artists[0]?.name.slice(0, 25) + "..."}
                    </Text>
                  </View>
                  <Entypo name="dots-three-vertical" size={22} color="white" />
                </View>
              </Pressable>
            )}
            contentContainerStyle={{ paddingBottom: 950 }} // Prevent last item from getting cut off
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
