import { Text, View, Image } from "react-native";
import React from "react";

const ArtistCard = ({ item }) => {
  return (
    <View className="p-3">
      <Image
        height={130}
        width={130}
        className="rounded-md"
        source={{ uri: item.images[0].url }}
      />
      <Text className="text-[13px] font-medium text-white mt-2">
        {item?.name}
      </Text>
    </View>
  );
};

export default ArtistCard;
