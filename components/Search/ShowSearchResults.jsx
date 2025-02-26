import { View, Text, Pressable } from "react-native";
import React, { useContext, useState } from "react";

import Tracks from "./Tracks";
import Albums from "./Albums";
import Playlists from "./Playlists";
import Artists from "./Artists";
import { TranslationContext } from "../../context/TranslationContext";

const ShowSearchResults = ({ searchResults }) => {
  const [selected, setSelected] = useState("Tracks");
  const { langJsonData } = useContext(TranslationContext);

  const filters = [
    langJsonData["tracks"],
    langJsonData["artists"],
    langJsonData["albums"],
    langJsonData["playlists"],
  ];

  return (
    <>
      {Object.entries(searchResults).length > 0 && (
        <View>
          <View className="w-full flex-row justify-between p-2">
            {filters.map((filter) => {
              return (
                <Pressable
                  key={filter}
                  onPress={() => setSelected(filter)}
                  className={`${
                    selected == filter ? "bg-[#309635]" : "bg-[#282828]"
                  } p-2 rounded-full transition-all duration-200`}
                >
                  <Text className="text-white text-base pl-3 pr-3">
                    {filter}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          {selected === langJsonData["tracks"] && (
            <Tracks tracks={searchResults?.tracks?.items} />
          )}
          {selected === langJsonData["albums"] && (
            <Albums albums={searchResults?.albums?.items} />
          )}
          {selected === langJsonData["playlists"] && (
            <Playlists playlists={searchResults?.playlists?.items} />
          )}
          {selected === langJsonData["artists"] && (
            <Artists artists={searchResults?.artists?.items} />
          )}
        </View>
      )}
    </>
  );
};

export default ShowSearchResults;
