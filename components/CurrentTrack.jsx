import { View, Text, Pressable, Image } from "react-native";
import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { AntDesign } from "@expo/vector-icons";

const CurrentTrack = ({ modalVisible, setModalVisible }) => {
  const { currentTrack } = useContext(PlayerContext);

  if (!currentTrack) {
    return;
  }
  return (
    <Pressable
      onPress={() => setModalVisible(!modalVisible)}
      style={{
        backgroundColor: "#5072A7",
        width: "95%",
        padding: 8,
        marginLeft: "auto",
        marginRight: "auto",
        marginBottom: 15,
        position: "absolute",
        borderRadius: 6,
        left: 10,
        bottom: 10,
        // justifyContent: "space-between",
        flexDirection: "row",
        // alignItems: "center",
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <Image
          style={{ width: 40, height: 40 }}
          source={{ uri: currentTrack?.track?.album?.images[0].url }}
        />
        <Text
          numberOfLines={1}
          style={{
            fontSize: 13,
            width: 220,
            color: "white",
            fontWeight: "bold",
          }}
        >
          {currentTrack?.track?.name} • {currentTrack?.track?.artists[0].name}
        </Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
        <AntDesign name="heart" size={24} color="#1DB954" />
        <Pressable>
          <AntDesign name="pausecircle" size={24} color="white" />
        </Pressable>
      </View>
    </Pressable>
  );
};

export default CurrentTrack;
