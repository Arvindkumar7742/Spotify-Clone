import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { getNewReleases } from "../../services/operations/album";
import HorizontalCards from "../Common/HorizontalCards";

const NewReleases = () => {
  const [newReleases, setNewReleases] = useState([]);
  useEffect(() => {
    const fetchNewReleases = async () => {
      try {
        const result = await getNewReleases();

        if (result) {
          setNewReleases(result);
        }
      } catch (err) {}
    };

    fetchNewReleases();
  }, []);
  return (
    <>
      <View className="h-[10px]" />
      <Text className="text-white text-[19px] font-bold mx-2 mt-2">
        New Releases
      </Text>
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
    </>
  );
};

export default NewReleases;
