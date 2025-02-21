import { Text, Alert, FlatList, RefreshControl } from "react-native";
import React from "react";

import HorizontalCards from "../Common/HorizontalCards";
import HorizontalLoader from "../Common/HorizontalLoader";

const TopArtists = ({ loading, refreshing, topArtists }) => {
  return (
    <>
      <Text
        style={{
          color: "white",
          fontSize: 19,
          fontWeight: "bold",
          marginHorizontal: 10,
          marginTop: 10,
        }}
      >
        Your Top Artists
      </Text>

      {loading && !refreshing ? (
        <HorizontalLoader />
      ) : (
        <FlatList
          data={topArtists}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <HorizontalCards
              imageSrc={item?.images[0]?.url}
              path="ArtistScreen"
              name={item.name}
              key={index}
              item={item}
            />
          )}
        />
      )}
    </>
  );
};

export default TopArtists;
