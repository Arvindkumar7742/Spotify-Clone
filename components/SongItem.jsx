import { Text, View, Pressable, Image, Alert } from "react-native";
import React, { useContext } from "react";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { removeTrackFromCurrentUser } from "../services/operations/user";
import { LikedSongsContext } from "../context/LikedSongsContext";

const SongItem = ({ item, isPlaying = false }) => {
  const navigation = useNavigation();
  const { setLikedTracks } = useContext(LikedSongsContext);

  async function handleLikePress(e) {
    try {
      const result = await removeTrackFromCurrentUser(item.track.id);
      if (result) {
        Alert.alert("Success", "Video removed from Liked video.");
        setLikedTracks((prev) =>
          prev.filter((it) => it.track.id !== item.track.id)
        );
      }
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  }

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("SongInfo", {
          item: item?.track,
        });
      }}
      className={`flex-row items-center p-3 gap-2`}
    >
      <Image
        width={42}
        height={42}
        resizeMode="cover"
        className="rounded-md mr-5"
        source={{
          uri: item?.track?.album?.images[0].url
            ? item?.track?.album?.images[0].url
            : "https://static.vecteezy.com/system/resources/previews/002/249/673/non_2x/music-note-icon-song-melody-tune-flat-symbol-free-vector.jpg",
        }}
      />
      <View
        className={`flex-1`}
        style={{
          marginLeft: "20px",
        }}
      >
        <Text numberOfLines={1} className={`font-bold text-sm pl-5 text-white`}>
          {item?.track?.name}
        </Text>
        <Text className="mt-1 text-white font-light text-sm">
          {item?.track?.artists[0].name}
        </Text>
      </View>

      <View className={`flex-row items-center gap-2 mx-2`}>
        <AntDesign
          onPress={(e) => {
            e.stopPropagation(); // Prevent the parent Pressable from firing
            handleLikePress();
          }}
          name="heart"
          size={24}
          color="#1DB954"
        />
        <Entypo name="dots-three-vertical" size={24} color="#C0C0C0" />
      </View>
    </Pressable>
  );
};

export default SongItem;
