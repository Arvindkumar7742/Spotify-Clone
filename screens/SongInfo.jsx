import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable,
  Alert,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import {
  Ionicons,
  MaterialCommunityIcons,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";
import { ProgressBar } from "react-native-paper";
import { useContext, useState } from "react";
import { LikedSongsContext } from "../context/LikedSongsContext";
import {
  removeTrackFromCurrentUser,
  saveTrackForCurrentUser,
} from "../services/operations/user";

const SongInfo = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;
  const [toggle, setToggle] = useState(true);
  const { likedTracks, setLikedTracks } = useContext(LikedSongsContext);
  const [isLiked, setIsLiked] = useState(
    likedTracks.map((item) => item.track.id).includes(item.id)
  );

  async function handleSongLike() {
    try {
      if (isLiked) {
        const result = await removeTrackFromCurrentUser(item.id);
        if (result) {
          setLikedTracks((prev) =>
            prev.filter((it) => it.track.id !== item.id)
          );
          setIsLiked((pev) => !pev);
        }
      } else {
        const result = await saveTrackForCurrentUser(item.id);
        if (result) {
          setLikedTracks((prev) => [{ track: item }, ...prev]);
          setIsLiked((pev) => !pev);
        }
      }
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  }
  return (
    <LinearGradient
      colors={["#F3FF33", "black"]}
      start={{ x: 0.2, y: -0.7 }} // Start at the top
      end={{ x: 0.2, y: 0.85 }} // End at the bottom
      className="flex-1 justify-end items-center"
    >
      <View className="flex w-[85%] h-full">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mt-4">
          <Ionicons name="arrow-back-outline" size={28} color="white" />
        </TouchableOpacity>
        <View className="items-center mt-18">
          <Image
            source={{
              uri: item?.album?.images?.[0]?.url
                ? item?.album?.images?.[0]?.url
                : "https://static.vecteezy.com/system/resources/previews/002/249/673/non_2x/music-note-icon-song-melody-tune-flat-symbol-free-vector.jpg",
            }}
            className="w-[100%] h-72 rounded-md mt-10"
            resizeMode="cover"
          />
        </View>

        <View className="flex flex-row justify-between mt-10">
          <View className="mt-6">
            <Text className="text-white text-xl font-bold">
              {item?.name.length > 20
                ? item?.name.slice(0, 20) + "..."
                : item?.name}
            </Text>
            <View className="flex flex-row items-center gap-1">
              <Ionicons
                name="sparkles-sharp"
                size={10}
                color="#1dd661"
                className="mt-1"
              />
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                className="text-gray-400 text-sm mt-1 w-[180px]"
              >
                {item?.artists?.map((artist) => artist.name).join(", ")}
              </Text>
            </View>
            <View className="flex flex-row items-center gap-1 mt-2">
              <MaterialCommunityIcons name="album" size={20} color="#1dd661" />
              <Text className="text-gray-400 text-sm ">
                {item?.album?.name.length > 25
                  ? item?.album?.name.slice(0, 25) + "..."
                  : item?.album?.name}
              </Text>
            </View>
          </View>
          <View className="flex flex-row gap-6 items-center">
            <Ionicons name="add-circle-outline" size={35} color="white" />
            <Pressable onPress={handleSongLike}>
              <AntDesign
                name="heart"
                size={24}
                color={isLiked ? "#1DB954" : "white"}
              />
            </Pressable>
          </View>
        </View>

        <View className="mt-8">
          <ProgressBar
            progress={Math.random()}
            color="#1dd661"
            className="h-1 rounded-full"
          />
          <View className="flex-row justify-between mt-1">
            <Text className="text-gray-400 text-xs">3:06</Text>
            <Text className="text-gray-400 text-xs">3:44</Text>
          </View>
        </View>

        <View className="flex flex-row w-[100%] items-center justify-center gap-8">
          <MaterialCommunityIcons
            name="skip-previous"
            size={40}
            color="white"
          />
          <TouchableOpacity onPress={() => setToggle(!toggle)}>
            {toggle ? (
              <Ionicons name="play-circle-sharp" size={75} color="white" />
            ) : (
              <Ionicons name="pause-circle" size={75} color="white" />
            )}
          </TouchableOpacity>
          <MaterialIcons name="skip-next" size={40} color="white" />
        </View>
      </View>
    </LinearGradient>
  );
};

export default SongInfo;
