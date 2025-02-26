import { View, Text, Pressable } from "react-native";
import React, { useContext, useState } from "react";

import TopSongs from "./TopSongs";
import ShowArtistAlbum from "./ShowArtistAlbum";
import { TranslationContext } from "../../context/TranslationContext";

const ShowArtistInfo = ({ artistId }) => {
  const { langJsonData } = useContext(TranslationContext);
  const [selected, setSelected] = useState(langJsonData["top_songs"]);
  const filters = [langJsonData["top_songs"], langJsonData["albums"]];

  return (
    <View>
      <View className="flex-row w-full gap-6 p-3">
        {filters.map((filter, index) => {
          return (
            <Pressable key={index} onPress={() => setSelected(filter)}>
              <Text
                className={`text-white ${
                  selected === filter && "font-bold"
                } text-lg`}
              >
                {filter}
              </Text>
              {selected == filter && (
                <View
                  style={{
                    marginTop: 9,
                    width: "auto",
                    height: 2,
                    backgroundColor: "green",
                  }}
                />
              )}
            </Pressable>
          );
        })}
      </View>

      {selected === langJsonData["top_songs"] && (
        <TopSongs artistId={artistId} />
      )}
      {selected === langJsonData["albums"] && (
        <ShowArtistAlbum artistId={artistId} />
      )}
    </View>
  );
};

export default ShowArtistInfo;
