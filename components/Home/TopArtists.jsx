import { Text, Alert, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { getUsersTopItems } from "../../services/operations/user";
import HorizontalCards from "../Common/HorizontalCards";

const TopArtists = () => {
  const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    async function fetchTopArtists() {
      try {
        const type = "artists";
        const result = await getUsersTopItems(type);

        if (result) {
          setTopArtists(result);
        }
      } catch (err) {
        Alert.alert("Error", err.message);
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
        {topArtists.map((item, index) => (
          <HorizontalCards
            imageSrc={item?.images[0]?.url}
            path="ArtistScreen"
            name={item.name}
            key={index}
            item={item}
          />
        ))}
      </ScrollView>
    </>
  );
};

export default TopArtists;
