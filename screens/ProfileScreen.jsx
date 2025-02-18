import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getCurrentUser } from "../services/operations/user";
import { UserContext } from "../context/UserContext";

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);

  return (
    <View className="flex-1">
      <LinearGradient
        className="h-[280px] p-3 gap-5"
        colors={["#4d94ff", "#1a75ff", "#003380", "#001f4d", "#001433"]}
      >
        <View>
          <Ionicons
            className="mb-5"
            name="arrow-back-outline"
            size={24}
            color="white"
            onPress={() => navigation.goBack()}
          />
          <View className="flex-row gap-5 items-center">
            <Image
              style={{
                width: 140,
                height: 140,
                borderRadius: 100,
                resizeMode: "cover",
              }}
              source={{
                uri:
                  user?.images.length > 0
                    ? user?.images[0].url
                    : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQABqQIdskCD9BK0I81EbVfV9tTz320XvJ35A&s",
              }}
            />
            <View className="gap-2">
              <Text className="text-white font-bold text-2xl">
                {user?.display_name}
              </Text>
              <Text className="text-white font-bold text-sm">
                {user?.followers.total}
                <Text className="text-gray-400 font-semibold"> followers</Text>
                <Text className="text-white"> • </Text>8
                <Text className="text-gray-400 font-semibold"> following</Text>
              </Text>
            </View>
          </View>
        </View>
        <View className="flex-row items-center gap-5">
          <TouchableOpacity className="border-[1px] border-white p-2 rounded-3xl w-[80px]">
            <Text className="text-white text-center">Edit</Text>
          </TouchableOpacity>
          <Entypo name="dots-three-vertical" size={22} color="white" />
        </View>
      </LinearGradient>

      {/* Second LinearGradient */}
      <LinearGradient
        colors={["#001433", "#000a1a", "#000000"]}
        style={{ height: "100%" }}
      >
        <Text className="text-white text-center text-2xl mt-5 font-semibold">
          No Recent Activity
        </Text>
      </LinearGradient>
    </View>
  );
};

export default ProfileScreen;
