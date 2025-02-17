import { createContext, useState } from "react";

const PlayerContext = createContext();

const PlayerContextProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  return (
    <PlayerContext.Provider value={{ currentTrack, setCurrentTrack }}>
      {children}
    </PlayerContext.Provider>
  );
};

export { PlayerContext, PlayerContextProvider };
