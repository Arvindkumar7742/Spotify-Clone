import { View, Text, FlatList, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import RecentlyPlayedCard from "./RecentlyPlayedCard";
import { getRecentlyPlayed } from "../../services/operations/user";

const RecentlyPlayed = () => {
  const [recentlyPlayed, setRecentlyPlayed] = useState([]);

  useEffect(() => {
    const fetchRecentlyPlayed = async () => {
      try {
        const result = await getRecentlyPlayed();

        if (result) {
          setRecentlyPlayed(result);
        }
      } catch (err) {
        Alert.alert("Error", err.message);
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
      <FlatList
        data={recentlyPlayed}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <RecentlyPlayedCard item={item} key={index} />
        )}
        contentContainerStyle={{ paddingBottom: 60 }}
      />
    </>
  );
};

export default RecentlyPlayed;
