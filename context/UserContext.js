import { createContext, useEffect, useState } from "react";
import { getCurrentUser } from "../services/operations/user";

const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // function to fetch the current user by calling the api
  const fetchCurrentUser = async () => {
    try {
      const result = await getCurrentUser();

      if (result) {
        setUser(result);
      }
    } catch (err) {
      Alert.alert("Error", err.message);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser, fetchCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserContextProvider };
