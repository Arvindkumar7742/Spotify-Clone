import { Text, Alert, ScrollView, ActivityIndicator, View } from "react-native";
import React, { useEffect, useState } from "react";
import { getUsersTopItems } from "../../services/operations/user";
import HorizontalCards from "../Common/HorizontalCards";
import HorizontalLoader from "../Common/HorizontalLoader";

const TopArtists = () => {
  const [topArtists, setTopArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTopArtists() {
      setLoading(true);
      try {
        const type = "artists";
        const result = await getUsersTopItems(type);

        if (result) {
          setTopArtists(result);
        }
      } catch (err) {
        Alert.alert("Error", err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTopArtists();
  }, []);

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
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {loading ? (
          <HorizontalLoader />
        ) : (
          topArtists.map((item, index) => (
            <HorizontalCards
              imageSrc={item?.images[0]?.url}
              path="ArtistScreen"
              name={item.name}
              key={index}
              item={item}
            />
          ))
        )}
      </ScrollView>
    </>
  );
};

export default TopArtists;
