import { View, Text, TouchableOpacity, FlatList, Image } from "react-native";
import React, { useState } from "react";

const Albums = ({ albums }) => {
  return (
    <FlatList
      className="mt-5"
      data={albums}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View className="mb-2 flex-row w-1/2 items-center gap-2 mx-2 my-2 rounded-md shadow-md p-2">
          <Image
            className="w-[55px] h-[55px] rounded-md"
            source={{
              uri: item.images[0]?.url,
            }}
          />
          <View>
            <Text className="text-white text-[22px] pl-2 font-bold w-[106px]">
              {item?.name.length < 30
                ? item?.name
                : item?.name.slice(0, 30) + "..."}
            </Text>
            <Text
              className="text-white text-sm pl-2 font-semibold w-[106px]"
              style={{
                color: "gray",
              }}
            >
              {item?.artists.length > 0 &&
                (item?.artists[0]?.name.length < 30
                  ? item?.artists[0]?.name
                  : item?.artists[0]?.name.slice(0, 30) + "...")}
            </Text>
          </View>
        </View>
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

export default Albums;
