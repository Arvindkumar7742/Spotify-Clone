import { createContext, useEffect, useState } from "react";
import { getLikedTracks } from "../services/operations/user";

const LikedSongsContext = createContext();

const LikedSongsContextProvider = ({ children }) => {
  const [likedTracks, setLikedTracks] = useState([]);

  const fetchLikedSongs = async () => {
    try {
      const result = await getLikedTracks();

      if (result) {
        setLikedTracks(result);
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
      value={{ likedTracks, setLikedTracks, fetchLikedSongs }}
    >
      {children}
    </LikedSongsContext.Provider>
  );
};

export { LikedSongsContext, LikedSongsContextProvider };
