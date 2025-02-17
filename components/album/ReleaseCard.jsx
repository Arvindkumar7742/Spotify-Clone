import { View, Text, Pressable, Image } from "react-native";
import React from "react";

const ReleaseCard = ({ item }) => {
  return (
    <Pressable className="p-3">
      <Image
        height={130}
        width={130}
        className="rounded-md"
        source={{ uri: item.images[0].url }}
      />
      <View className="w-[130px] mt-2">
        <Text
          className="text-[13px] font-medium text-white text-center"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {item?.name.split(" ").slice(0, 2).join(" ")}
        </Text>
      </View>
    </Pressable>
  );
};

export default ReleaseCard;
