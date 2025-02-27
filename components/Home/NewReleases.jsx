import { View, Text, FlatList } from "react-native";
import React, { useContext } from "react";

import HorizontalCards from "../Common/HorizontalCards";
import HorizontalLoader from "../Common/HorizontalLoader";
import { useSelector } from "react-redux";

const NewReleases = ({ newReleases, loading, refreshing }) => {
  const { langJsonData } = useSelector((state) => state.lang);
  return (
    <>
      <View className="h-[10px]" />
      <Text className="text-white text-[19px] font-bold mx-2 mt-2">
        {langJsonData["new_release_heading"]}
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
