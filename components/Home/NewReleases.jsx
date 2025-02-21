import { View, Text, FlatList, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { getNewReleases } from "../../services/operations/album";
import HorizontalCards from "../Common/HorizontalCards";
import HorizontalLoader from "../Common/HorizontalLoader";

const NewReleases = () => {
  const [newReleases, setNewReleases] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNewReleases = async () => {
      setLoading(true);
      try {
        const result = await getNewReleases();

        if (result) {
          setNewReleases(result);
        }
      } catch (err) {
        Alert.alert(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNewReleases();
  }, []);
  return (
    <>
      <View className="h-[10px]" />
      <Text className="text-white text-[19px] font-bold mx-2 mt-2">
        New Releases
      </Text>

      {loading ? (
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
