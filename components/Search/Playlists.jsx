import { View, Text, FlatList, Image, Pressable } from "react-native";
import React, { useContext, useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "expo-router";

import { FollowedPlaylistContext } from "../../context/FollowedPlaylistContext";
import {
  followPlaylist,
  unfollowPlaylist,
} from "../../services/operations/playlist";

const Playlists = ({ playlists }) => {
  const navigation = useNavigation();
  const { followedPlaylists, setFollowedPlaylists } = useContext(
    FollowedPlaylistContext
  );
  const [isFollowed, setIsFollowed] = useState(
    followedPlaylists.map((item) => item.id)
  );

  async function handleFollowAPlaylist(item) {
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

  return (
    <FlatList
      className="mt-5"
      data={playlists.filter((playlist) => playlist)}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            navigation.navigate("PlaylistPage", {
              item: item,
            });
          }}
          className="mb-2 flex-row items-center gap-2 mx-2 my-2 rounded-md shadow-md p-2"
        >
          <Image
            className="w-[55px] h-[55px] rounded-md"
            source={{
              uri: item.images[0]?.url,
            }}
          />
          <View
            style={{
              width: "80%",
            }}
            className="flex-row justify-between items-center"
          >
            <View>
              <Text
                style={{
                  width: "106px",
                }}
                className="text-white text-[22px] pl-2 font-bold w-[106px]"
              >
                {item?.name.length < 25
                  ? item?.name
                  : item?.name.slice(0, 25) + "..."}
              </Text>
              <Text
                className="text-white text-sm pl-2 font-semibold w-[106px]"
                style={{
                  color: "gray",
                }}
              >
                Playlist
              </Text>
            </View>
            <MaterialIcons
              onPress={() => {
                handleFollowAPlaylist(item);
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
        </Pressable>
      )}
      contentContainerStyle={{ paddingBottom: 250 }} // Prevent last item from getting cut off
      ListEmptyComponent={
        <View className="flex items-center justify-center h-40">
          <Text className="text-white text-lg font-semibold">
            No Albums Found
          </Text>
        </View>
      }
    />
  );
};

export default Playlists;
