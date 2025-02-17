import { View, Text, FlatList, Image } from "react-native";
import React from "react";

const Artists = ({ artists }) => {
  return (
    <FlatList
      className="mt-5"
      data={artists}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View className="mb-2 flex-row w-1/2 items-center gap-2 mx-2 my-2 rounded-md shadow-md p-2">
          <Image
            className="w-[55px] h-[55px] rounded-full"
            source={{
              uri: item.images[0]?.url
                ? item.images[0]?.url
                : "https://pinnacle.works/wp-content/uploads/2022/06/dummy-image.jpg",
            }}
          />
          <View>
            <Text className="text-white text-[22px] pl-2 font-bold w-[106px]">
              {item?.name.length < 30
                ? item?.name
                : item?.name.slice(0, 30) + "..."}
            </Text>
          </View>
        </View>
      )}
      contentContainerStyle={{ paddingBottom: 250 }} // Prevent last item from getting cut off
      ListEmptyComponent={
        <View className="flex items-center justify-center h-40">
          <Text className="text-white text-lg font-semibold">
            No Artists Found
          </Text>
        </View>
      }
    />
  );
};

export default Artists;
