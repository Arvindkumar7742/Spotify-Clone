import {
  View,
  Text,
  ScrollView,
  Image,
  Pressable,
  RefreshControl,
  Alert,
} from "react-native";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import NewReleases from "../components/Home/NewReleases";
import RecentlyPlayed from "../components/Home/RecentlyPlayed";
import TopArtists from "../components/Home/TopArtists";
import { UserContext } from "../context/UserContext";
import { getNewReleases } from "../services/operations/album";
import {
  getRecentlyPlayed,
  getUsersTopItems,
} from "../services/operations/user";
import { TranslationContext } from "../context/TranslationContext";
import DropDownPicker from "react-native-dropdown-picker";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const [newReleases, setNewReleases] = useState([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [topArtists, setTopArtists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { lang, setLang, langJsonData } = useContext(TranslationContext);

  const [open, setOpen] = useState(false);
  const items = [
    { label: langJsonData["english"], value: "en" },
    { label: langJsonData["hindi"], value: "hi" },
    { label: langJsonData["german"], value: "de" },
  ];

  const fetchNewReleases = async () => {
    setLoading(true);
    try {
      const result = await getNewReleases();
      if (result) setNewReleases(result);
    } catch (err) {
      Alert.alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentlyPlayed = async () => {
    setLoading(true);
    try {
      const result = await getRecentlyPlayed();
      if (result) {
        setRecentlyPlayed(result);
      }
    } catch (err) {
      Alert.alert("Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchTopArtists = async () => {
    setLoading(true);
    try {
      const type = "artists";
      const result = await getUsersTopItems(type);
      if (result) {
        setTopArtists(result);
      }
    } catch (err) {
      Alert.alert("Error", err.message);
    } finally {
      setLoading(false);
    }
  };

  // Function to Refresh All Components
  const onRefresh = useCallback(async (fun1) => {
    setRefreshing(true);
    await fetchNewReleases();
    await fetchRecentlyPlayed();
    await fetchTopArtists();
    setRefreshing(false);
  }, []);

  useEffect(() => {
    fetchNewReleases();
    fetchRecentlyPlayed();
    fetchTopArtists();
  }, []);

  return (
    <LinearGradient colors={["#040306", "#131624"]} style={{ flex: 1 }}>
      {/* <ScrollView
        className="mt-10"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
      > */}
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
              <Text className="text-white text-base">
                {langJsonData["all"]}
              </Text>
            </Pressable>

            <Pressable className="bg-[#282828] p-2 pl-6 pr-6 rounded-full">
              <Text className="text-white text-base">
                {langJsonData["music"]}
              </Text>
            </Pressable>

            <View
              style={{
                zIndex: 1000,
                width: 140,
                marginLeft: 10,
                marginRight: 20,
              }}
            >
              <DropDownPicker
                open={open}
                value={lang}
                items={items}
                setOpen={setOpen}
                setValue={setLang}
                placeholder="Select language"
                style={{
                  borderColor: "#444",
                  backgroundColor: "#202020",
                  borderRadius: 10,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}
                textStyle={{
                  color: "#fff",
                  fontSize: 14,
                }}
                dropDownContainerStyle={{
                  backgroundColor: "#282828",
                  borderColor: "#444",
                  borderRadius: 10,
                }}
                listItemLabelStyle={{
                  color: "#fff",
                }}
              />
            </View>
          </View>
        </View>
      </View>

      {/* Remaining Content */}
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

          <Text className="text-white text-xs font-bold">
            {langJsonData["liked_songs"]}
          </Text>
        </Pressable>

        {/* Random Artist */}
        <View className="mb-2 flex-row items-center gap-2 flex-1 mx-2 my-2 bg-[#202020] rounded-md shadow-md">
          <Image
            className="w-[55px] h-[55px] rounded-md"
            source={{ uri: "https://i.pravatar.cc/100" }}
          />
          <View>
            <Text className="text-white text-xs font-bold">
              {langJsonData["hiphop_tamhiza"]}
            </Text>
          </View>
        </View>
      </View>

      {/* users's top artists */}
      <TopArtists
        topArtists={topArtists}
        loading={loading}
        refreshing={refreshing}
      />

      {/* New Release section to see all the new release songs */}
      <NewReleases
        newReleases={newReleases}
        loading={loading}
        refreshing={refreshing}
      />

      {/* user's recently played songs */}
      <RecentlyPlayed
        recentlyPlayed={recentlyPlayed}
        loading={loading}
        refreshing={refreshing}
      />
      {/* </ScrollView> */}
    </LinearGradient>
  );
};

export default HomeScreen;
