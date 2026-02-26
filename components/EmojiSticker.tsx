import { ImageSourcePropType } from "react-native";
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
  const scale = useSharedValue<number>(imageSize);
  const translateX = useSharedValue<number>(0);
  const translateY = useSharedValue<number>(0);

  const tap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      if (scale.value !== imageSize * 2) {
        scale.value = scale.value * 2;
      } else {
        scale.value = Math.round(scale.value / 2);
      }
    });

  const imageStyle = useAnimatedStyle(() => ({
    width: withSpring(scale.value),
    height: withSpring(scale.value),
  }));

  const drag = Gesture.Pan().onChange(({ changeX, changeY }) => {
    translateX.value += changeX;
    translateY.value += changeY;
  });

  const containerStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  const gesture = Gesture.Simultaneous(tap, drag);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[{ top: -350 }, containerStyle]}>
        <Animated.Image
          source={stickerSource}
          style={[imageStyle, { width: imageSize, height: imageSize }]}
        />
      </Animated.View>
    </GestureDetector>
  );
}
