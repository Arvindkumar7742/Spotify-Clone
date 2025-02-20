import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  SafeAreaView,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Entypo from "@expo/vector-icons/Entypo";
import { useAuthRequest } from "expo-auth-session";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { authConfig } from "../config";
import { UserContext } from "../context/UserContext";
import { LikedSongsContext } from "../context/LikedSongsContext";
import { FollowedPlaylistContext } from "../context/FollowedPlaylistContext";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { fetchCurrentUser } = useContext(UserContext);
  const { fetchLikedSongs } = useContext(LikedSongsContext);
  const { fetchFollowedPlaylists } = useContext(FollowedPlaylistContext);

  const [request, response, promptAsync] = useAuthRequest(
    {
      ...authConfig.config,
    },
    {
      ...authConfig.discovery,
    }
  );

  const handleLogin = async () => {
    if (!request || isAuthenticating) return;
    try {
      console.log("Prompting Spotify Auth...");
      setIsAuthenticating(true);
      await promptAsync();
      setIsAuthenticating(false);
    } catch (err) {
      console.log("Prompt async error:", err);
      Alert.alert("Error", err.message);
    }
  };

  useEffect(() => {
    const checkTokenValidity = async () => {
      console.log("Checking token validity...");

      const accessToken = await AsyncStorage.getItem("token");
      const expirationDate = await AsyncStorage.getItem("expirationDate");
      console.log("Retrieved access token:", accessToken);
      console.log("Retrieved expiration date:", expirationDate);

      if (accessToken && expirationDate) {
        const currentTime = Date.now();
        if (currentTime < parseInt(expirationDate)) {
          console.log("Token is still valid, navigating to Main...");
          navigation.replace("Main");
        } else {
          console.log("Token expired, clearing storage...");
          await AsyncStorage.removeItem("token");
          await AsyncStorage.removeItem("expirationDate");
        }
      }
    };

    checkTokenValidity();
  }, []);

  useEffect(() => {
    const saveToken = async () => {
      if (response?.type === "success") {
        console.log("Auth Response:", response);

        const { access_token, expires_in } = response.params;
        if (access_token) {
          const expirationDate = Date.now() + expires_in * 1000; // Convert expires_in to milliseconds

          await AsyncStorage.setItem("token", access_token);
          await AsyncStorage.setItem(
            "expirationDate",
            expirationDate.toString()
          );

          console.log("Token and expiration date saved!");

          // saving the user profile and liked songs and followed playlist using context
          fetchLikedSongs();
          fetchCurrentUser();
          fetchFollowedPlaylists();
          navigation.navigate("Main");
        }
      } else if (response?.type === "error") {
        console.error("Auth Error:", response.error);
        Alert.alert("Error", response.error);
      }
    };

    saveToken();
  }, [response]);

  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      <SafeAreaView>
        <Entypo
          name="spotify"
          size={80}
          color="white"
          className="text-center mt-[150px]"
        />
        <Text className="text-white font-bold text-center text-[28px] p-5 mt-8">
          Millions of Songs Free on Spotify!
        </Text>

        <Pressable
          disabled={!request || isAuthenticating}
          onPress={handleLogin}
          className={`m-10 p-3 rounded-[20px] ${
            isAuthenticating
              ? "opacity-60 bg-[#128C45]"
              : "opacity-100 bg-[#1DB954]"
          }`}
        >
          {isAuthenticating ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={{ color: "white", textAlign: "center", fontSize: 18 }}>
              Sign in with Spotify
            </Text>
          )}
        </Pressable>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default LoginScreen;
