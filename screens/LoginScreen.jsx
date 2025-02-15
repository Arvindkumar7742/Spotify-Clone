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

const LoginScreen = () => {
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const [request, response, promptAsync] = useAuthRequest(
    {
      ...authConfig.config,
    },
    {
      ...authConfig.discovery,
    }
  );

  useEffect(() => {
    if (response?.type === "success") {
      console.log("Auth Response:", response);

      const accessToken = response.params;
      console.log("Access Token:", accessToken);

      // Save accessToken to state or secure storage
    } else if (response?.type === "error") {
      console.error("Auth Error:", response.error);
      Alert.alert("Error", response.error);
    }
  }, [response]);

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
