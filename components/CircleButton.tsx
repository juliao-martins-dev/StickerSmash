import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { theme } from "@/constants/theme";
import { Pressable, StyleSheet, View } from "react-native";

type Props = {
  onPress: () => void;
};

export default function CircleButton({ onPress }: Props) {
  return (
    <View style={styles.circleButtonContainer}>
      <Pressable
        style={({ pressed }) => [
          styles.circleButton,
          pressed && styles.circleButtonPressed,
        ]}
        onPress={onPress}
      >
        <MaterialIcons name="add-reaction" size={28} color={theme.colors.page} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  circleButtonContainer: {
    alignItems: "center",
  },
  circleButton: {
    width: 84,
    height: 84,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 42,
    backgroundColor: theme.colors.accent,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.14)",
    shadowColor: theme.colors.shadow,
    shadowOpacity: 0.3,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
  circleButtonPressed: {
    opacity: 0.94,
    transform: [{ scale: 0.98 }],
  },
});
