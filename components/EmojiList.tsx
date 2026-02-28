import { Image } from "expo-image";
import { theme } from "@/constants/theme";
import { useState } from "react";
import {
  FlatList,
  ImageSourcePropType,
  Platform,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

type Props = {
  onSelect: (image: ImageSourcePropType) => void;
  onCloseModal: () => void;
};

export default function EmojiList({ onSelect, onCloseModal }: Props) {
  const [emoji] = useState([
    { id: "spark", source: require("../assets/images/emoji1.png") },
    { id: "blush", source: require("../assets/images/emoji2.png") },
    { id: "party", source: require("../assets/images/emoji3.png") },
    { id: "hype", source: require("../assets/images/emoji4.png") },
    { id: "cool", source: require("../assets/images/emoji5.png") },
    { id: "shine", source: require("../assets/images/emoji6.png") },
  ]);

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === "web"}
      data={emoji}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContainer}
      renderItem={({ item }) => (
        <Pressable
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
          onPress={() => {
            onSelect(item.source);
            onCloseModal();
          }}
        >
          <View style={styles.imageWrap}>
            <Image source={item.source} style={styles.image} />
          </View>
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 6,
    alignItems: "center",
  },
  card: {
    width: 100,
    padding: 10,
    borderRadius: 22,
    backgroundColor: theme.colors.surfaceElevated,
    borderWidth: 1,
    borderColor: theme.colors.line,
    alignItems: "center",
    marginRight: 14,
  },
  cardPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.98 }],
  },
  imageWrap: {
    width: "100%",
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    paddingVertical: 10,
    alignItems: "center",
  },
  image: {
    width: 68,
    height: 68,
  },
});
