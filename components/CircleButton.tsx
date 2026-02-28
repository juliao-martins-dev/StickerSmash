import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { theme } from "@/constants/theme";
import { Pressable, StyleSheet, Text, View } from "react-native";

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
        <MaterialIcons name="add-reaction" size={30} color={theme.colors.page} />
      </Pressable>
      <Text style={styles.circleLabel}>Sticker</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  circleButtonContainer: {
    alignItems: "center",
    gap: 10,
  },
  circleButton: {
    width: 92,
    height: 92,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 46,
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
  circleLabel: {
    color: theme.colors.text,
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});
