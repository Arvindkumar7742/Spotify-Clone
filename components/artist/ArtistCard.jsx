import { Text, View, Image, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const ArtistCard = ({ item }) => {
  const navigation = useNavigation();
  function handleArtistPress() {
    navigation.navigate("ArtistScreen", {
      artist: item,
    });
  }

  return (
    <Pressable onPress={handleArtistPress}>
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
    </Pressable>
  );
};

export default ArtistCard;
