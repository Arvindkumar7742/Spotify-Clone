import React from "react";

import "../global.css";
import Navigation from "../StackNavigator";
import { UserContextProvider } from "../context/UserContext";
import { LikedSongsContextProvider } from "../context/LikedSongsContext";
import { FollowedPlayListContextProvider } from "../context/FollowedPlaylistContext";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";

const RootLayout = () => {
  let presistor = persistStore(store, { timeout: 10000 });

  return (
    <>
      <Provider store={store}>
        <PersistGate persistor={presistor}>
          <UserContextProvider>
            <LikedSongsContextProvider>
              <FollowedPlayListContextProvider>
                <Navigation />
              </FollowedPlayListContextProvider>
            </LikedSongsContextProvider>
          </UserContextProvider>
        </PersistGate>
      </Provider>
    </>
  );
};

export default RootLayout;
