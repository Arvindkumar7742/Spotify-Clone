import { View, Text, SafeAreaView, Pressable } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import AntDesign from "@expo/vector-icons/AntDesign";

const LoginScreen = () => {
  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <SafeAreaView>
        <Entypo
          name="spotify"
          size={80}
          color="white"
          className="mt-[80px] text-center"
        />
        <Text className="text-white font-bold text-center text-4xl mt-20">
          Millions of Songs Free on spotify!
        </Text>
        <Pressable className="text-white bg-[#1DB954] m-10 mt-20 mb-3 p-2 rounded-[20px]">
          <Text className="text-center text-lg">Sign in with Spotify</Text>
        </Pressable>

        <Pressable className="text-white m-10 mt-0 mb-3 p-2 rounded-[20px] border-[2px] border-slate-500">
          <View className="text-center flex-row justify-evenly items-center">
            <Feather name="smartphone" size={22} color="white" />
            <Text className="text-white text-lg">Continue With Phone</Text>
          </View>
        </Pressable>

        <Pressable className="text-white m-10 mt-0 mb-3 p-2 rounded-[20px] border-[2px] border-slate-500">
          <View className="text-center flex-row justify-evenly items-center">
            <AntDesign name="google" size={22} color="white" />
            <Text className="text-white text-lg">Continue With Google</Text>
          </View>
        </Pressable>

        <Pressable className="text-white m-10 mt-0 mb-3 p-2 rounded-[20px] border-[2px] border-slate-500">
          <View className="text-center flex-row justify-evenly items-center">
            <Entypo name="facebook" size={22} color="white" />
            <Text className="text-white text-lg">Continue With Facebook</Text>
          </View>
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;
