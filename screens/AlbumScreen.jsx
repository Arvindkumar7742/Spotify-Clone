import { Alert, FlatList, Image, Pressable, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { reduceUniqueSongs } from "../utils/getUniqueSongs";
import { getAlbumTracks } from "../services/operations/album";

const AlbumScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;
  const [albumTracks, setAlbumTracks] = useState([]);

  useEffect(() => {
    const fetchAlbumTracks = async () => {
      try {
        const result = await getAlbumTracks(item.id, item.total_tracks);

        if (result) {
          setAlbumTracks(reduceUniqueSongs(result.items, "album"));
        }
      } catch (err) {
        Alert.alert("Error", err.message);
      }
    };

    fetchAlbumTracks();
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
          <Text className="text-white text-2xl font-bold">{item?.name}</Text>
          <View className="gap-2">
            <Text className="text-gray-400">
              {item.artists.length > 2
                ? item.artists
                    .slice(0, 2)
                    .map((artist) => artist.name)
                    .join(", ") + ` and ${item.artists.length - 2} others`
                : item.artists.map((artist) => artist.name).join(", ")}
            </Text>
          </View>
        </View>

        <View className="px-4 ">
          <Text className="text-white text-lg font-bold">
            Album Hit {item.total_tracks} Songs
          </Text>
          <FlatList
            className="mt-5"
            data={albumTracks}
            keyExtractor={(item) => item?.id}
            renderItem={({ item, index }) => (
              <Pressable
                onPress={() => {
                  navigation.navigate("SongInfo", { item: item });
                }}
                className="mb-2 flex-row items-center gap-2 my-1 rounded-md shadow-md p-1"
                style={{ width: "100%" }}
              >
                {/* Text + Icon Wrapper */}
                <View className="flex-row justify-between items-center flex-1">
                  {/* Song Info */}
                  <View className="flex-1">
                    <Text
                      className="text-white text-md font-bold"
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item?.name || "Unknown Melody"}
                    </Text>
                    <Text
                      className="text-gray-400 text-xs"
                      numberOfLines={1}
                      ellipsizeMode="tail"
                    >
                      {item.artists.map((artist) => artist.name).join(", ") ||
                        "Unknown Artist"}
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

export default AlbumScreen;
