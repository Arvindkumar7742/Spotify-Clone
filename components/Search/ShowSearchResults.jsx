import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";

import Tracks from "./Tracks";
import Albums from "./Albums";
import Playlists from "./Playlists";
import Artists from "./Artists";

const ShowSearchResults = ({ searchResults }) => {
  const [selected, setSelected] = useState("Tracks");
  const filters = ["Tracks", "Artists", "Albums", "Playlists"];
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
          {selected === "Tracks" && (
            <Tracks tracks={searchResults?.tracks?.items} />
          )}
          {selected === "Albums" && (
            <Albums albums={searchResults?.albums?.items} />
          )}
          {selected === "Playlists" && (
            <Playlists playlists={searchResults?.playlists?.items} />
          )}
          {selected === "Artists" && (
            <Artists artists={searchResults?.artists?.items} />
          )}
        </View>
      )}
    </>
  );
};

export default ShowSearchResults;
