import { useEffect } from "react";
import { ImageSourcePropType, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type Props = {
  imageSize: number;
  stickerSource: ImageSourcePropType;
};

export default function EmojiSticker({ imageSize, stickerSource }: Props) {
  const scale = useSharedValue(1);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  useEffect(() => {
    scale.value = 1;
    translateX.value = 0;
    translateY.value = 0;
  }, [imageSize, scale, stickerSource, translateX, translateY]);

  const tap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      scale.value = scale.value > 1 ? 1 : 2;
    });

  const drag = Gesture.Pan().onChange(({ changeX, changeY }) => {
    translateX.value += changeX;
    translateY.value += changeY;
  });

  const stickerStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: withSpring(scale.value) },
    ],
  }));

  return (
    <GestureDetector gesture={Gesture.Simultaneous(tap, drag)}>
      <Animated.View
        style={[
          styles.stickerContainer,
          { marginLeft: -imageSize / 2, marginTop: -imageSize / 2 },
          stickerStyle,
        ]}
      >
        <Animated.Image
          source={stickerSource}
          style={{ width: imageSize, height: imageSize }}
        />
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  stickerContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
  },
});
