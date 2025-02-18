import { View, Text, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { getArtistTopSongs } from "../../services/operations/artist";
const TopSongs = ({ artistId }) => {
  const [topSongs, setTopSongs] = useState([]);

  useEffect(() => {
    const fetchArtistsTopSongs = async () => {
      try {
        const result = await getArtistTopSongs(artistId);

        if (result) {
          setTopSongs(result);
        }
      } catch (err) {
        Alert.alert("Error", err.message);
      }
    };

    fetchArtistsTopSongs();
  }, []);
  return <></>;
};

export default TopSongs;
