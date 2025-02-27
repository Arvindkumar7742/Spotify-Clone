import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { setLang, setLangJsonData } from "../redux/slices/langSlice";
import { getLanguageJsonData } from "../services/operations/translation";

const SettingScreen = () => {
  const dispatch = useDispatch();
  const { lang, langJsonData } = useSelector((state) => state.lang);

  const navigation = useNavigation();
  const items = [
    { label: langJsonData["english"], value: "en" },
    { label: langJsonData["hindi"], value: "hi" },
    { label: langJsonData["german"], value: "de" },
  ];
  async function handleLanguage(val) {
    try {
      console.log("value is::=>", val);

      const result = await getLanguageJsonData(val);

      if (result) {
        dispatch(setLang(val));
        dispatch(setLangJsonData(result));
      }
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  }

  return (
    <View className="flex-1">
      <LinearGradient
        className="h-[100%] p-3 gap-5"
        colors={["#040306", "#131624"]}
      >
        <View className="flex flex-row gap-3 ite">
          <Ionicons
            className="mb-5"
            name="arrow-back-outline"
            size={24}
            color="white"
            onPress={() => navigation.goBack()}
          />
          <Text className="text-white">Settings</Text>
        </View>
        <View>
          <Text className="text-gray-200">Choose Your language</Text>
          <View className="mt-5 gap-2">
            {items.map((item) => (
              <TouchableOpacity
                key={item.label}
                onPress={() => {
                  handleLanguage(item.value);
                }}
              >
                <Text
                  className={`${
                    lang === item.value ? "text-gray-200" : "text-gray-400"
                  }`}
                >
                  {item.label}{" "}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

export default SettingScreen;
