import { View, Text, FlatList, Image, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const Tracks = ({ tracks }) => {
  const navigation = useNavigation();
  const { langJsonData } = useSelector((state) => state.lang);

  return (
    <FlatList
      className="mt-5"
      data={tracks}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            navigation.navigate("SongInfo", {
              item: item,
            });
          }}
          style={{
            width: "100%",
          }}
          className="mb-2 flex-row w-1/2 items-center gap-2 mx-2 my-2 bg-[#202020] rounded-md shadow-md p-2"
        >
          <Image
            className="w-[55px] h-[55px] rounded-md"
            source={{ uri: item.album.images[0]?.url }}
          />
          <View>
            <Text
              style={{
                width: "106px",
              }}
              className="text-white text-[16px] font-bold"
            >
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
        </Pressable>
      )}
      contentContainerStyle={{ paddingBottom: 250 }} // Prevent last item from getting cut off
      ListEmptyComponent={
        <View className="flex items-center justify-center h-40">
          <Text className="text-white text-lg font-semibold">
            {langJsonData["empty_tracks"]}
          </Text>
        </View>
      }
    />
  );
};

export default Tracks;
