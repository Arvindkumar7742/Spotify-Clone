import { Text, Alert, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { getUsersTopItems } from "../../services/operations/user";
import ArtistCard from "./ArtistCard";

const TopArtists = () => {
  const [topArtists, setTopArtists] = useState([]);

  useEffect(() => {
    async function fetchTopArtists() {
      try {
        const type = "artists";
        const result = await getUsersTopItems(type);

        if (result) {
          setTopArtists(
            result.length > 0
              ? result
              : [
                  {
                    images: [
                      {
                        url: "https://i.scdn.co/image/ab67616d00001e02ff9ca10b55ce82ae553c8228",
                        height: 300,
                        width: 300,
                      },
                    ],
                    name: "Dummy",
                  },
                ]
          );
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
          <ArtistCard item={item} key={index} />
        ))}
      </ScrollView>
    </>
  );
};

export default TopArtists;
