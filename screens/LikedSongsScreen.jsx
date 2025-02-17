import {
  View,
  Text,
  ScrollView,
  Pressable,
  TextInput,
  Alert,
  ActivityIndicator,
  FlatList,
  Linking,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { getLikedTracks } from "../services/operations/user";
import SongItem from "../components/SongItem";
import { PlayerContext } from "../context/PlayerContext";
import CurrentTrack from "../components/CurrentTrack";
import PlayerModal from "../components/PlayerModal";

const LikedSongsScreen = () => {
  const [input, setInput] = useState("");
  const [likedTracks, savedLikedTracks] = useState([]);
  const navigation = useNavigation();
  const [searchedTracks, setSearchedTracks] = useState([]);
  const { setCurrentTrack } = useContext(PlayerContext);
  const [modalVisible, setModalVisible] = useState(false);

  function handleSearch(text) {
    const filteredTracks = likedTracks.filter((item) =>
      item.track.name.toLowerCase().includes(text.toLowerCase())
    );
    setSearchedTracks(filteredTracks);
  }
  const handleInputChange = (text) => {
    setInput(text);
    handleSearch(text);
  };

  async function playTrack() {
    if (likedTracks.length > 0) {
      setCurrentTrack(likedTracks[0]);
    }
    await play(likedTracks[0]);
  }

  const play = async (nextTrack) => {
    // Linking.openURL(`spotify:track:${nextTrack.track.id}`);
  };

  useEffect(() => {
    const fetchLikedTracks = async () => {
      try {
        const result = await getLikedTracks();

        if (result) {
          savedLikedTracks(result);
          setSearchedTracks(result);
        }
      } catch (err) {
        Alert.alert("Error", err.message);
      }
    };

    fetchLikedTracks();
  }, []);

  return (
    <>
      <LinearGradient colors={["#614385", "#516395"]} style={{ flex: 1 }}>
        <ScrollView className="flex-1 mt-[50px]">
          {/* Back Button */}
          <Pressable onPress={() => navigation.goBack()} className="mx-[10px]">
            <Ionicons name="arrow-back" size={24} color="white" />
          </Pressable>

          {/* Search Bar and Sort Button */}
          <View className="flex-row items-center justify-between mx-[10px] mt-[9px]">
            {/* Search Input Container */}
            <View className="flex-row items-center bg-[#42275a] p-[9px] flex-1 rounded-[3px] h-[38px] gap-[10px]">
              <AntDesign name="search1" size={20} color="white" />
              <TextInput
                style={{
                  height: 100,
                  width: 230,
                  marginTop: 55,
                  paddingTop: 10,
                  textAlignVertical: "top",
                  color: "white",
                }}
                onChangeText={handleInputChange}
                placeholder="Find in Liked songs"
                placeholderTextColor="white"
              />
            </View>

            {/* Sort Button */}
            <Pressable className="mx-[10px] bg-[#42275a] p-[10px] rounded-[3px] h-[38px] justify-center">
              <Text className="text-white">Sort</Text>
            </Pressable>
          </View>

          <View style={{ height: 50 }} />
          <View style={{ marginHorizontal: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", color: "white" }}>
              Liked Songs
            </Text>
            <Text style={{ color: "white", fontSize: 13, marginTop: 5 }}>
              {likedTracks.length} songs
            </Text>
          </View>

          <Pressable className="flex-row items-center justify-between mx-[10px]">
            {/* Arrow Down Button */}
            <Pressable className="w-[30px] h-[30px] rounded-[15px] bg-[#1DB954] justify-center items-center">
              <AntDesign name="arrowdown" size={20} color="white" />
            </Pressable>

            {/* Play Button and Cross Icon */}
            <View className="flex-row items-center gap-[10px]">
              <Pressable
                onPress={playTrack}
                className="w-[60px] h-[60px] rounded-[30px] justify-center items-center bg-[#1DB954]"
              >
                <Entypo name="controller-play" size={24} color="white" />
              </Pressable>
            </View>
          </Pressable>

          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {searchedTracks.length === 0 ? (
              <ActivityIndicator size="large" color="gray" />
            ) : searchedTracks.length < likedTracks.length ? (
              <FlatList
                data={searchedTracks}
                renderItem={({ item }) => <SongItem item={item} />}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
              />
            ) : (
              <FlatList
                data={likedTracks}
                renderItem={({ item }) => <SongItem item={item} />}
                showsVerticalScrollIndicator={false}
                scrollEnabled={false}
              />
            )}
          </ScrollView>
        </ScrollView>
      </LinearGradient>

      <CurrentTrack
        setModalVisible={setModalVisible}
        modalVisible={modalVisible}
      />

      {modalVisible && (
        <PlayerModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      )}
    </>
  );
};

export default LikedSongsScreen;
