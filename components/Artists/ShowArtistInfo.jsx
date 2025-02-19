import { View, Text, Pressable } from "react-native";
import React, { useState } from "react";
import TopSongs from "./TopSongs";
import ShowArtistAlbum from "./ShowArtistAlbum";

const ShowArtistInfo = ({ artistId }) => {
  const [selected, setSelected] = useState("Top songs");
  const filters = ["Top songs", "Albums"];

  return (
    <View>
      <View className="flex-row w-full gap-6 p-3">
        {filters.map((filter) => {
          return (
            <Pressable key={filter} onPress={() => setSelected(filter)}>
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

      {selected === "Top songs" && <TopSongs artistId={artistId} />}
      {selected === "Albums" && <ShowArtistAlbum artistId={artistId} />}
    </View>
  );
};

export default ShowArtistInfo;
