import { Text, FlatList } from "react-native";
import React, { useContext } from "react";

import HorizontalCards from "../Common/HorizontalCards";
import HorizontalLoader from "../Common/HorizontalLoader";
import { useSelector } from "react-redux";

const TopArtists = ({ loading, refreshing, topArtists }) => {
  const { langJsonData } = useSelector((state) => state.lang);

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
        {langJsonData["top_artist_heading"]}
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
