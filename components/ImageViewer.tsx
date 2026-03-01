import { Image } from "expo-image";
import { theme } from "@/constants/theme";
import { ImageSourcePropType, StyleSheet, View } from "react-native";

type Props = {
  source: ImageSourcePropType;
  sourceKey: string;
  width: number;
  height: number;
};

export default function ImageViewer({ source, sourceKey, width, height }: Props) {
  return (
    <View style={[styles.frame, { width, height }]}>
      <Image
        key={sourceKey}
        source={source}
        cachePolicy="memory-disk"
        contentFit="cover"
        transition={180}
        style={styles.image}
      />
      <View pointerEvents="none" style={styles.overlay} />
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    flex: 1,
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: theme.colors.pageAlt,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.14)",
  },
});
