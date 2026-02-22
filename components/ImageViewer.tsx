import { Image } from "expo-image";
import { ImageSourcePropType, StyleSheet } from "react-native";

type props = {
  imageSource: ImageSourcePropType;
  selectedImage?: string | null;
};

export default function ImageViewer({ imageSource, selectedImage }: props) {
  const source = selectedImage ? { uri: selectedImage } : imageSource;
  return <Image source={source} style={styles.image} />;
}

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
