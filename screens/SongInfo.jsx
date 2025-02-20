import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
import { ProgressBar } from "react-native-paper";
import { useState } from "react";

const SongInfo = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;
  const [toggle, setToggle] = useState(true);

  const handleToggle = () => {
    setToggle(!toggle);
    console.log(toggle);
  };
  return (
    <LinearGradient
      colors={["#F3FF33", "black"]}
      start={{ x: 0.2, y: -0.7 }} // Start at the top
      end={{ x: 0.2, y: 0.85 }} // End at the bottom
      className="flex-1 justify-end items-center"
    >
      <View className="flex w-[85%] h-full">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mt-4">
          <Ionicons name="arrow-back-outline" size={28} color="white" />
        </TouchableOpacity>
        <View className="items-center mt-18">
          <Image
            source={{ uri: item?.album?.images?.[0]?.url }}
            className="w-[100%] h-72 rounded-md mt-10"
            resizeMode="cover"
          />
        </View>

        <View className="flex flex-row justify-between mt-10">
          <View className="mt-6">
            <Text className="text-white text-xl font-bold">{item?.name}</Text>
            <View className="flex flex-row items-center gap-1">
              <Ionicons
                name="sparkles-sharp"
                size={10}
                color="#1dd661"
                className="mt-1"
              />
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                className="text-gray-400 text-sm mt-1 w-[180px]"
              >
                {item?.artists?.map((artist) => artist.name).join(", ")}
              </Text>
            </View>
            <View className="flex flex-row items-center gap-1 mt-2">
              <MaterialCommunityIcons name="album" size={20} color="#1dd661" />
              <Text className="text-gray-400 text-sm ">
                {item?.album?.name}
              </Text>
            </View>
          </View>
          <View className="flex flex-row gap-6 items-center">
            <Ionicons name="add-circle-outline" size={35} color="white" />
            <AntDesign name="heart" size={24} color="white" />
          </View>
        </View>

        <View className="mt-8">
          <ProgressBar
            progress={Math.random()}
            color="#1dd661"
            className="h-1 rounded-full"
          />
          <View className="flex-row justify-between mt-1">
            <Text className="text-gray-400 text-xs">3:06</Text>
            <Text className="text-gray-400 text-xs">3:44</Text>
          </View>
        </View>

        <View className="flex flex-row w-[100%] items-center justify-center gap-8">
          <MaterialCommunityIcons
            name="skip-previous"
            size={40}
            color="white"
          />
          <TouchableOpacity onPress={handleToggle}>
            {toggle ? (
              <Ionicons name="play-circle-sharp" size={75} color="white" />
            ) : (
              <Ionicons name="pause-circle" size={75} color="white" />
            )}
          </TouchableOpacity>
          <MaterialIcons name="skip-next" size={40} color="white" />
        </View>
      </View>
    </LinearGradient>
  );
};

export default SongInfo;
