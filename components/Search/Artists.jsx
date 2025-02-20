import { View, Text, FlatList, Image, Pressable } from "react-native";
import React from "react";
import user from "../../assets/user.png";
import { useNavigation } from "@react-navigation/native";

const Artists = ({ artists }) => {
  const navigation = useNavigation();
  return (
    <FlatList
      className="mt-5"
      data={artists}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => {
            navigation.navigate("ArtistScreen", {
              item: item,
            });
          }}
          style={{
            width: "100%",
          }}
          className="mb-2 flex-row items-center gap-2 mx-2 my-2 rounded-md shadow-md p-2"
        >
          <Image
            className="w-[55px] h-[55px] rounded-full"
            source={
              item.images[0]?.url
                ? {
                    uri: item.images[0]?.url,
                  }
                : user
            }
          />
          <View>
            <Text
              style={{
                width: "106px",
              }}
              className="text-white text-[22px] pl-2 font-bold "
            >
              {item?.name.length < 30
                ? item?.name
                : item?.name.slice(0, 30) + "..."}
            </Text>
          </View>
        </Pressable>
      )}
      contentContainerStyle={{ paddingBottom: 250 }} // Prevent last item from getting cut off
      ListEmptyComponent={
        <View className="flex items-center justify-center h-40">
          <Text className="text-white text-lg font-semibold">
            No Artists Found
          </Text>
        </View>
      }
    />
  );
};

export default Artists;
