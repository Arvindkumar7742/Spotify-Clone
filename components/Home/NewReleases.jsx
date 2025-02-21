import { View, Text, FlatList } from "react-native";
import React from "react";

import HorizontalCards from "../Common/HorizontalCards";
import HorizontalLoader from "../Common/HorizontalLoader";

const NewReleases = ({ newReleases, loading, refreshing }) => {
  return (
    <>
      <View className="h-[10px]" />
      <Text className="text-white text-[19px] font-bold mx-2 mt-2">
        New Releases
      </Text>

      {loading && !refreshing ? (
        <HorizontalLoader />
      ) : (
        <FlatList
          data={newReleases}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <HorizontalCards
              imageSrc={item.images[0].url}
              item={item}
              name={item.name}
              key={index}
              path="AlbumPage"
            />
          )}
        />
      )}
    </>
  );
};

export default NewReleases;
