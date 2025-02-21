import { View, Text, FlatList, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { getUsersTopItems } from "../services/operations/user";
import { useNavigation } from "@react-navigation/native";
import HorizontalLoader from "./Common/HorizontalLoader";

const TopTracks = () => {
  const navigation = useNavigation();
  const [topTrack, setTopTracks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTopTrack = async () => {
      setLoading(true);
      try {
        const type = "tracks";
        const result = await getUsersTopItems(type);

        if (result) {
          setTopTracks(result);
        }
      } catch (err) {
        Alert.alert("Error", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTopTrack();
  }, []);
  return (
    <>
      <View className="w-full">
        <Text className="text-white m-2 font-bold text-xl">Top Tracks</Text>
        {loading ? (
          <HorizontalLoader flag="top-track" />
        ) : (
          <FlatList
            data={topTrack}
            keyExtractor={(item) => item.id}
            numColumns={2}
            columnWrapperStyle={{ justifyContent: "space-between" }}
            renderItem={({ item }) => {
              return (
                <Pressable
                  onPress={() => {
                    navigation.navigate("SongInfo", {
                      item: item,
                    });
                  }}
                  style={{
                    width: "47%",
                  }}
                  className="mb-2 flex flex-row w-1/2 items-center gap-2 f mx-2 my-2 bg-[#202020] rounded-md shadow-md"
                >
                  <Image
                    className="w-[55px] h-[55px] rounded-md"
                    source={{ uri: item.album.images[0].url }}
                  />
                  <View>
                    <Text
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      className="text-white text-wrap text-[20px] font-bold w-[106px]"
                    >
                      {`${item?.name}`.slice(0, 15)}
                    </Text>
                    <Text
                      ellipsizeMode="tail"
                      numberOfLines={1}
                      className="text-white text-wrap text-xs font-semi-bold w-[106px]"
                    >
                      {`${item.album.artists[0]?.name}`.slice(0, 15)}
                    </Text>
                  </View>
                </Pressable>
              );
            }}
          />
        )}
      </View>
    </>
  );
};

export default TopTracks;
