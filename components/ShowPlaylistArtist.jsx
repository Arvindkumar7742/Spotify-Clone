import { View, Text, Pressable, FlatList, Image } from "react-native";
import React from "react";
import { getCombinedList } from "../utils/getCombinedList";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ShowPlaylistArtist = ({ playlists, artists, activeCategory }) => {
  const navigation = useNavigation();
  let combinedList = getCombinedList(playlists, artists, activeCategory);

  return (
    <View>
      <FlatList
        data={combinedList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              navigation.navigate(
                item.type === "artist" ? "ArtistScreen" : "PlaylistPage",
                {
                  item: item,
                }
              );
            }}
            className="mb-2 flex-row items-center gap-2 rounded-md shadow-md p-2"
          >
            <Image
              className={`w-[55px] h-[55px] ${
                item.type === "artist" ? "rounded-full" : "rounded-md"
              }`}
              source={{ uri: item.images[0]?.url }}
            />
            <View>
              <Text className="text-white text-[22px] pl-2 font-bold w-[106px]">
                {item?.name.length < 30
                  ? item?.name
                  : item?.name.slice(0, 30) + "..."}
              </Text>
              <Text className="text-gray-400 text-sm pl-2 w-[106px]">
                {item.type[0].toUpperCase() + item.type.slice(1)}
              </Text>
            </View>
          </Pressable>
        )}
        ListHeaderComponent={
          activeCategory !== "Artists" && (
            <Pressable
              onPress={() => navigation.navigate("Liked")}
              className="mb-2 w-full flex-row items-center gap-5 p-2 bg-[#202020] rounded-md shadow-md"
            >
              <LinearGradient
                colors={["#33006F", "#FFFFFF"]}
                className="rounded-md"
              >
                <Pressable className="w-[55px] h-[55px] flex items-center justify-center">
                  <AntDesign name="heart" size={24} color="white" />
                </Pressable>
              </LinearGradient>

              <View>
                <Text className="text-white text-sm font-bold">
                  Liked Songs
                </Text>
                <Text className="text-gray-400 text-sm">Playlist</Text>
              </View>
            </Pressable>
          )
        }
        contentContainerStyle={{ paddingBottom: 600 }}
        ListEmptyComponent={
          <View className="h-[200px] flex items-center justify-center">
            <Text className="text-white">No items found</Text>
          </View>
        }
      />
    </View>
  );
};

export default ShowPlaylistArtist;
