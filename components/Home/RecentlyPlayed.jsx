import { View, Text, FlatList, Alert } from "react-native";
import React, { useEffect, useState } from "react";

import { getRecentlyPlayed } from "../../services/operations/user";
import HorizontalCards from "../Common/HorizontalCards";
import HorizontalLoader from "../Common/HorizontalLoader";

const RecentlyPlayed = () => {
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecentlyPlayed = async () => {
      setLoading(true);
      try {
        const result = await getRecentlyPlayed();

        if (result) {
          setRecentlyPlayed(result);
        }
      } catch (err) {
        Alert.alert("Error", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentlyPlayed();
  }, []);

  return (
    <>
      <View className="h-[10px]" />
      <Text className="text-white text-[19px] font-bold mx-2 mt-2">
        Recently Played
      </Text>
      {loading ? (
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
