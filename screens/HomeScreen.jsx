import { View, Text, Alert, ScrollView, Image, Pressable } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import NewReleases from "../components/Home/NewReleases";
import RecentlyPlayed from "../components/Home/RecentlyPlayed";
import TopArtists from "../components/Home/TopArtists";
import { UserContext } from "../context/UserContext";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);

  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <ScrollView className="mt-10">
        <View
          style={{
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <View className="flex-row items-center">
            <Pressable
              onPress={() => {
                navigation.navigate("Profile");
              }}
            >
              <Image
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: 20,
                  resizeMode: "cover",
                }}
                source={{
                  uri:
                    user?.images.length > 0
                      ? user?.images[0].url
                      : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQABqQIdskCD9BK0I81EbVfV9tTz320XvJ35A&s",
                }}
              />
            </Pressable>

            <View className="mx-3 my-1 flex-row items-center space-x-2">
              <Pressable className="bg-[#309635] p-2 pl-6 pr-6 mr-2 rounded-full">
                <Text className="text-white text-base">All</Text>
              </Pressable>

              <Pressable className="bg-[#282828] p-2 pl-6 pr-6 rounded-full">
                <Text className="text-white text-base">Music</Text>
              </Pressable>
            </View>
          </View>
        </View>

        <View className="flex-row items-center justify-between mt-5">
          {/* Liked Songs */}
          <Pressable
            onPress={() => navigation.navigate("Liked")}
            className="mb-2 flex-row items-center gap-2 flex-1 mx-2 my-2 bg-[#202020] rounded-md shadow-md"
          >
            <LinearGradient
              colors={["#33006F", "#FFFFFF"]}
              className="rounded-md"
            >
              <Pressable className="w-[55px] h-[55px] flex items-center justify-center">
                <AntDesign name="heart" size={24} color="white" />
              </Pressable>
            </LinearGradient>

            <Text className="text-white text-xs font-bold">Liked Songs</Text>
          </Pressable>

          {/* Random Artist */}
          <View className="mb-2 flex-row items-center gap-2 flex-1 mx-2 my-2 bg-[#202020] rounded-md shadow-md">
            <Image
              className="w-[55px] h-[55px] rounded-md"
              source={{ uri: "https://i.pravatar.cc/100" }}
            />
            <View>
              <Text className="text-white text-xs font-bold">
                Hiphop Tamhiza
              </Text>
            </View>
          </View>
        </View>

        {/* users's top artists */}
        <TopArtists />

        {/* New Release section to see all the new release songs */}
        <NewReleases />

        {/* user's recently played songs */}
        <RecentlyPlayed />
      </ScrollView>
    </LinearGradient>
  );
};

export default HomeScreen;
