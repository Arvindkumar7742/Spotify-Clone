import { View, Text, Pressable, Image } from "react-native";
import React, { useContext } from "react";
import { AntDesign } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { PlayerContext } from "../context/PlayerContext";
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { BottomModal, ModalContent } from "react-native-modals";

const PlayerModal = ({
  modalVisible,
  setModalVisible,
  playPreviousTrack,
  playNextTrack,
  currentTime,
  totalDuration,
  handlePlayPause,
  isPlaying = true,
  styles,
  progress,
  circleSize,
  tracks,
}) => {
  const { currentTrack, setCurrentTrack } = useContext(PlayerContext);

  return (
    <>
      <BottomModal
        visible={modalVisible}
        onHardwareBackPress={() => setModalVisible(false)}
        swipeDirection={["up", "down"]}
        swipeThreshold={200}
      >
        <ModalContent
          style={{ height: "100%", width: "100%", backgroundColor: "#5072A7" }}
        >
          <View style={{ height: "100%", width: "100%", marginTop: 40 }}>
            <Pressable
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <AntDesign
                onPress={() => setModalVisible(!modalVisible)}
                name="down"
                size={24}
                color="white"
              />

              <Text
                style={{ fontSize: 14, fontWeight: "bold", color: "white" }}
              >
                {currentTrack?.track?.name}
              </Text>

              <Entypo name="dots-three-vertical" size={24} color="white" />
            </Pressable>

            <View style={{ height: 70 }} />

            <View style={{ padding: 10 }}>
              <Image
                style={{ width: "100%", height: 330, borderRadius: 4 }}
                source={{ uri: currentTrack?.track?.album?.images[0].url }}
              />
              <View
                style={{
                  marginTop: 20,
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text
                    style={{ fontSize: 18, fontWeight: "bold", color: "white" }}
                  >
                    {currentTrack?.track?.name}
                  </Text>
                  <Text style={{ color: "#D3D3D3", marginTop: 4 }}>
                    {currentTrack?.track?.artists[0].name}
                  </Text>
                </View>

                <AntDesign name="heart" size={24} color="#1DB954" />
              </View>

              <View style={{ marginTop: 10 }}>
                <View
                  style={{
                    width: "100%",
                    marginTop: 10,
                    height: 3,
                    backgroundColor: "gray",
                    borderRadius: 5,
                  }}
                >
                  <View
                  // style={[
                  //   styles.progressbar,
                  //   { width: `${progress * 100}%` },
                  // ]}
                  />
                  <View
                  // style={[
                  //   {
                  //     position: "absolute",
                  //     top: -5,
                  //     width: circleSize,
                  //     height: circleSize,
                  //     borderRadius: circleSize / 2,
                  //     backgroundColor: "white",
                  //   },
                  //   {
                  //     left: `${progress * 100}%`,
                  //     marginLeft: -circleSize / 2,
                  //   },
                  // ]}
                  />
                </View>
                <View
                  style={{
                    marginTop: 12,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{ color: "white", fontSize: 15, color: "#D3D3D3" }}
                  >
                    0:00 {/* {formatTime(currentTime)} */}
                  </Text>

                  <Text
                    style={{ color: "white", fontSize: 15, color: "#D3D3D3" }}
                  >
                    00:30{/* {formatTime(totalDuration)} */}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginTop: 17,
                }}
              >
                <Pressable>
                  <FontAwesome name="arrows" size={30} color="#03C03C" />
                </Pressable>
                <Pressable
                // onPress={playPreviousTrack}
                >
                  <Ionicons name="play-skip-back" size={30} color="white" />
                </Pressable>
                <Pressable
                // onPress={handlePlayPause}
                >
                  {isPlaying ? (
                    <AntDesign name="pausecircle" size={60} color="white" />
                  ) : (
                    <Pressable
                      // onPress={handlePlayPause}
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 30,
                        backgroundColor: "white",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Entypo name="controller-play" size={26} color="black" />
                    </Pressable>
                  )}
                </Pressable>
                <Pressable
                // onPress={playNextTrack}
                >
                  <Ionicons name="play-skip-forward" size={30} color="white" />
                </Pressable>
                <Pressable>
                  <Feather name="repeat" size={30} color="#03C03C" />
                </Pressable>
              </View>
            </View>
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default PlayerModal;
