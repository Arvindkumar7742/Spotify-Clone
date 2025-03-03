import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import Entypo from "@expo/vector-icons/Entypo";
import AntDesign from "@expo/vector-icons/AntDesign";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Feather from "@expo/vector-icons/Feather";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StatusBar } from "react-native";

import LoginScreen from "./screens/LoginScreen";
import LikedSongsScreen from "./screens/LikedSongsScreen";
import SearchScreen from "./screens/SearchScreen";
import LibraryScreen from "./screens/LibraryScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ArtistScreen from "./screens/ArtistScreen";
import SongInfo from "./screens/SongInfo";
import AlbumScreen from "./screens/AlbumScreen";
import PlaylistScreen from "./screens/PlaylistScreen";
import SettingScreen from "./screens/SettingScreen";
import { useSelector } from "react-redux";
import * as Linking from "expo-linking";

const Tab = createBottomTabNavigator();

// create the bottom tabs
function BottomTabs() {
  const { langJsonData } = useSelector((state) => state.lang);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: "rgba(0,0,0,0.5)",
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          shadowOpacity: 4,
          shadowRadius: 4,
          elevation: 0.1,
          shadowOffset: {
            width: 0,
            height: -4,
          },
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: langJsonData["home"] ? langJsonData["home"] : "Home",
          headerShown: false,
          tabBarLabelStyle: {
            color: "white",
          },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Entypo name="home" size={24} color="white" />
            ) : (
              <AntDesign name="home" size={24} color="white" />
            ),
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarLabel: langJsonData["search"]
            ? langJsonData["search"]
            : "Search",
          headerShown: false,
          tabBarLabelStyle: {
            color: "white",
          },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Feather name="search" size={28} color="white" />
            ) : (
              <EvilIcons name="search" size={30} color="white" />
            ),
        }}
      />
      <Tab.Screen
        name="Your Library"
        component={LibraryScreen}
        options={{
          tabBarLabel: langJsonData["your_library"]
            ? langJsonData["your_library"]
            : "Your library",
          headerShown: false,
          tabBarLabelStyle: {
            color: "white",
          },
          tabBarIcon: ({ focused }) =>
            focused ? (
              <Ionicons name="library" size={24} color="white" />
            ) : (
              <Ionicons name="library-outline" size={24} color="white" />
            ),
        }}
      />
    </Tab.Navigator>
  );
}

const Stack = createNativeStackNavigator();

// function to create the Navigation to be used in home
function Navigation() {
  const linking = {
    prefixes: [
      Linking.createURL(""),
      "https://mini-page-builder-smoky.vercel.app/app",
    ],
    config: {
      screens: {
        SongInfo: {
          path: "SongInfo/:id",
        },
        Profile: {
          path: "Profile",
        },
      },
    },
  };
  console.log("Printing the::==>>>", Linking.createURL(""));
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <NavigationContainer linking={linking}>
        <Stack.Navigator>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Main"
            component={BottomTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Liked"
            component={LikedSongsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Profile"
            component={ProfileScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ArtistScreen"
            component={ArtistScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SongInfo"
            component={SongInfo}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AlbumPage"
            component={AlbumScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PlaylistPage"
            component={PlaylistScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="settings"
            component={SettingScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

export default Navigation;
