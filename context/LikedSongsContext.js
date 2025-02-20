import { createContext, useEffect, useState } from "react";
import { getLikedTracks } from "../services/operations/user";

const LikedSongsContext = createContext();

const LikedSongsContextProvider = ({ children }) => {
  const [likedTracks, savedLikedTracks] = useState([]);

  const fetchLikedSongs = async () => {
    try {
      const result = await getLikedTracks();

      if (result) {
        savedLikedTracks(result);
      }
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  useEffect(() => {
    fetchLikedSongs();
  }, []);
  return (
    <LikedSongsContext.Provider
      value={{ likedTracks, savedLikedTracks, fetchLikedSongs }}
    >
      {children}
    </LikedSongsContext.Provider>
  );
};

export { LikedSongsContext, LikedSongsContextProvider };
