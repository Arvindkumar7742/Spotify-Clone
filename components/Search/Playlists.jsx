import { View, Text, FlatList, Image, Pressable } from "react-native";
import React from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useNavigation } from "expo-router";

const Playlists = ({ playlists }) => {
  const navigation = useNavigation();
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
              className="align-"
              name="playlist-add"
              size={24}
              color="white"
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
