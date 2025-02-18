import React, { useEffect, useState } from "react";
import Albums from "../Search/Albums";
import { getArtistAlbums } from "../../services/operations/artist";

const ShowArtistAlbum = ({ artistId }) => {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchArtistsAlbums = async () => {
      try {
        const result = await getArtistAlbums(artistId);

        if (result) {
          setAlbums(result?.items);
        }
      } catch (err) {
        Alert.alert("Error", err.message);
      }
    };

    fetchArtistsAlbums();
  }, []);
  return <Albums albums={albums} />;
};

export default ShowArtistAlbum;
