import React, { useEffect, useState } from "react";

import Albums from "../Search/Albums";
import { getArtistAlbums } from "../../services/operations/artist";
import HorizontalLoader from "../Common/HorizontalLoader";

const ShowArtistAlbum = ({ artistId }) => {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchArtistsAlbums = async () => {
      setLoading(true);
      try {
        const result = await getArtistAlbums(artistId);

        if (result) {
          setAlbums(result?.items);
        }
      } catch (err) {
        Alert.alert("Error", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArtistsAlbums();
  }, []);
  return (
    <>
      {loading ? (
        <HorizontalLoader flag="artist" />
      ) : (
        <Albums albums={albums} />
      )}
    </>
  );
};

export default ShowArtistAlbum;
