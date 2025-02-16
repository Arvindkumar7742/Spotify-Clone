import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Linking,
  SafeAreaView,
} from "react-native";

const albumData = [
  {
    id: "6mHNMtHrXIdUWWuZD9njsG",
    name: "Leon",
    artist: "Leon Bridges",
    release_date: "2024-10-04",
    image: "https://i.scdn.co/image/ab67616d0000b273b7ac31cd8650b673ed24ea71",
    spotify_url: "https://open.spotify.com/album/6mHNMtHrXIdUWWuZD9njsG",
  },
];

const AlbumList = () => {
  return (
    <SafeAreaView className="flex-1 bg-gray-900">
      <View className="p-4">
        <Text className="text-white text-2xl font-bold mb-4">
          Feature Playlists
        </Text>
      </View>
      <FlatList
        data={albumData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View className="bg-gray-800 p-4 m-4 rounded-lg shadow-lg">
            <Image
              source={{ uri: item.image }}
              className="w-full h-60 rounded-lg mb-4"
            />
            <Text className="text-white text-lg font-semibold">
              {item.name}
            </Text>
            <Text className="text-gray-400 text-sm">By {item.artist}</Text>
            <Text className="text-gray-400 text-sm">
              Released: {item.release_date}
            </Text>
            <TouchableOpacity
              className="mt-3 bg-blue-500 p-2 rounded-lg"
              onPress={() => Linking.openURL(item.spotify_url)}
            >
              <Text className="text-white text-center font-semibold">
                Open in Spotify
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default AlbumList;
