import React, { useEffect, useState } from "react";
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
import { authConfig } from "../config/authConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const LoginScreen = () => {
  const navigation = useNavigation();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
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
          style={{ textAlign: "center", marginTop: 80 }}
        />
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 24,
            marginTop: 20,
          }}
        >
          Millions of Songs Free on Spotify!
        </Text>

        <Pressable
          disabled={!request || isAuthenticating}
          onPress={handleLogin}
          style={{
            backgroundColor: isAuthenticating ? "#128C45" : "#1DB954",
            margin: 10,
            marginTop: 20,
            padding: 10,
            borderRadius: 20,
            opacity: isAuthenticating ? 0.6 : 1,
          }}
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
