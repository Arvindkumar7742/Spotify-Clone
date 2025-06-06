import { View, Text, FlatList } from "react-native";
import React from "react";

import HorizontalCards from "../Common/HorizontalCards";
import HorizontalLoader from "../Common/HorizontalLoader";
import { useSelector } from "react-redux";

const RecentlyPlayed = ({ loading, refreshing, recentlyPlayed }) => {
  const { langJsonData } = useSelector((state) => state.lang);
  return (
    <>
      <View className="h-[10px]" />
      <Text className="text-white text-[19px] font-bold mx-2 mt-2">
        {langJsonData["recently_played"]}
      </Text>

      {loading && !refreshing ? (
        <HorizontalLoader />
      ) : (
        <FlatList
          data={recentlyPlayed}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <HorizontalCards
              imageSrc={item.track.album.images[0].url}
              item={item.track}
              name={item.track.name}
              key={index}
              path="SongInfo"
            />
          )}
          contentContainerStyle={{ paddingBottom: 60 }}
        />
      )}
    </>
  );
};

export default RecentlyPlayed;
