import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const ArtistScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { artist } = route.params;

  return (
    <View>
      <View className="relative">
        <Image
          height={280}
          width="full"
          className="rounded-sm"
          resizeMode="cover"
          source={{ uri: artist.images[0].url }}
        />
        <TouchableOpacity className="absolute top-3 left-3 bg-black/50 w-[40px] h-[40px] justify-center items-center rounded-full">
          <Ionicons
            name="arrow-back-outline"
            size={24}
            color="white"
            onPress={() => navigation.goBack()}
          />
        </TouchableOpacity>
        <Text className="text-5xl font-bold absolute bottom-0 w-full text-white text-center">
          {artist.name}
        </Text>
      </View>

      <LinearGradient
        colors={["#040306", "#131624"]}
        style={{ height: "100%" }}
      ></LinearGradient>
    </View>
  );
};

export default ArtistScreen;
