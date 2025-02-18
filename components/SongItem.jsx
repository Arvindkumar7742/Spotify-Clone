import { Text, View, Pressable, Image } from "react-native";
import React, { useContext } from "react";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const SongItem = ({ item, isPlaying = false }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("SongInfo", {
          item: item,
        });
      }}
      className={`flex-row items-center p-3 gap-2`}
    >
      <Image
        width={42}
        height={42}
        resizeMode="cover"
        className="rounded-md mr-5"
        source={{ uri: item?.track?.album?.images[0].url }}
      />
      <View
        className={`flex-1`}
        style={{
          marginLeft: "20px",
        }}
      >
        <Text numberOfLines={1} className={`font-bold text-sm pl-5 text-white`}>
          {item?.track?.name}
        </Text>
        <Text className="mt-1 text-white font-light text-sm">
          {item?.track?.artists[0].name}
        </Text>
      </View>

      <View className={`flex-row items-center gap-2 mx-2`}>
        <AntDesign name="heart" size={24} color="#1DB954" />
        <Entypo name="dots-three-vertical" size={24} color="#C0C0C0" />
      </View>
    </Pressable>
  );
};

export default SongItem;
