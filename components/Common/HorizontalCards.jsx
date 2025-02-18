import { Text, Pressable, Image, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const HorizontalCards = ({ imageSrc, name, path, item }) => {
  const navigation = useNavigation();
  return (
    <Pressable
      className="p-3"
      onPress={() =>
        navigation.navigate(path, {
          item: item,
        })
      }
    >
      <Image
        height={130}
        width={130}
        className="rounded-md"
        source={{ uri: imageSrc }}
      />
      <View className="w-[130px] mt-2">
        <Text
          className="text-[13px] font-medium text-white text-center"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {name.split(" ").slice(0, 2).join(" ")}
        </Text>
      </View>
    </Pressable>
  );
};

export default HorizontalCards;
