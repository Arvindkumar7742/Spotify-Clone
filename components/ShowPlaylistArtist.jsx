import {
  View,
  Text,
  Pressable,
  FlatList,
  Image,
  RefreshControl,
} from "react-native";
import React, { useContext, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { getCombinedList } from "../utils/getCombinedList";
import { useSelector } from "react-redux";

const ShowPlaylistArtist = ({
  playlists,
  artists,
  activeCategory,
  fetchData,
}) => {
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);
  const { langJsonData } = useSelector((state) => state.lang);
  let combinedList = getCombinedList(
    playlists,
    artists,
    activeCategory,
    langJsonData
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  return (
    <View>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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
              <Text
                style={{
                  width: "106px",
                }}
                className="text-white text-[22px] pl-2 font-bold"
              >
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
          activeCategory !== langJsonData["artists"] && (
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
                  {langJsonData["liked_songs"]}
                </Text>
                <Text className="text-gray-400 text-sm">
                  {langJsonData["playlists"]}
                </Text>
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
