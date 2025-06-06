import { View, Text, FlatList, Image, Pressable } from "react-native";
import React, { useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";

const Albums = ({ albums }) => {
  const navigation = useNavigation();
  const { langJsonData } = useSelector((state) => state.lang);

  return (
    <SafeAreaView>
      <FlatList
        className="mt-5 pb-[100px]"
        data={albums}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => {
              navigation.navigate("AlbumPage", {
                item: item,
              });
            }}
            style={{
              width: "100%",
            }}
            className="mb-2 flex-row items-center gap-2 mx-2 my-2 rounded-md shadow-md p-2"
          >
            <Image
              className="w-[55px] h-[55px] rounded-md"
              source={{
                uri: item.images[0]?.url,
              }}
            />
            <View>
              <Text
                style={{
                  width: "106px",
                }}
                className="text-white text-[22px] pl-2 font-bold"
              >
                {item?.name.length < 30
                  ? item?.name
                  : item?.name.slice(0, 30) + "..."}
              </Text>
              <Text
                className="text-white text-sm pl-2 font-semibold w-[106px]"
                style={{
                  color: "gray",
                }}
              >
                {item?.artists.length > 0 &&
                  (item?.artists[0]?.name.length < 30
                    ? item?.artists[0]?.name
                    : item?.artists[0]?.name.slice(0, 30) + "...")}
              </Text>
            </View>
          </Pressable>
        )}
        contentContainerStyle={{ paddingBottom: 800 }} // Prevent last item from getting cut off
        ListEmptyComponent={
          <View className="flex items-center justify-center h-40">
            <Text className="text-white text-lg font-semibold">
              {langJsonData["empty_albums"]}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default Albums;
