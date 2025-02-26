import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

import ShowArtistInfo from "../components/Artists/ShowArtistInfo";
import { TranslationContext } from "../context/TranslationContext";

const ArtistScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;
  const { langJsonData } = useContext(TranslationContext);

  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ height: "100%" }}>
      <SafeAreaView>
        <View className="relative">
          <Image
            height={280}
            width="full"
            className="rounded-sm"
            resizeMode="cover"
            source={{ uri: item.images[0].url }}
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
            {item.name}
          </Text>
        </View>
        <View className="items-center flex-row justify-start p-2">
          <Text className="text-white text-xl font-bold">
            {item?.followers?.total?.toLocaleString()}
          </Text>
          <Text className="text-gray-300 text-lg font-medium tracking-wide">
            <Text> </Text> {langJsonData["followers"]}
          </Text>
        </View>
        {/* Genres */}
        <View className="flex-row flex-wrap gap-2 p-2">
          {item?.genres?.map((genre) => (
            <View key={genre} className="bg-white/10 px-3 py-1.5 rounded-full">
              <Text className="text-white text-sm font-medium capitalize">
                {genre}
              </Text>
            </View>
          ))}
        </View>

        <ShowArtistInfo artistId={item.id} />
      </SafeAreaView>
    </LinearGradient>
  );
};

export default ArtistScreen;
