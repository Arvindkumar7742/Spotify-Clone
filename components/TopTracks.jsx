import { View, Text, FlatList, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { getUsersTopItems } from "../services/operations/user";

const TopTracks = () => {
  const [topTrack, setTopTracks] = useState([]);

  useEffect(() => {
    const fetchTopTrack = async () => {
      try {
        const type = "tracks";
        const result = await getUsersTopItems(type);

        if (result) {
          setTopTracks(result);
        }
      } catch (err) {
        Alert.alert("Error", err.message);
      }
    };

    fetchTopTrack();
  }, []);
  return (
    <>
      <View className="w-full">
        <Text className="text-white m-2 font-bold text-xl">Top Tracks</Text>
        <FlatList
          data={topTrack}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  width: "47%",
                }}
                className="mb-2 flex-row w-1/2 items-center gap-2 f mx-2 my-2 bg-[#202020] rounded-md shadow-md"
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
              </View>
            );
          }}
        />
      </View>
    </>
  );
};

export default TopTracks;
