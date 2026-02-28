import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { theme } from "@/constants/theme";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
  onPress: () => void;
  variant?: "primary" | "secondary";
};

export default function IconButton({
  icon,
  label,
  onPress,
  variant = "secondary",
}: Props) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.iconButton,
        variant === "primary"
          ? styles.iconButtonPrimary
          : styles.iconButtonSecondary,
        pressed && styles.iconButtonPressed,
      ]}
      onPress={onPress}
    >
      <View
        style={[
          styles.iconWrap,
          variant === "primary"
            ? styles.iconWrapPrimary
            : styles.iconWrapSecondary,
        ]}
      >
        <MaterialIcons
          name={icon}
          size={20}
          color={
            variant === "primary"
              ? theme.colors.page
              : theme.colors.accentSoft
          }
        />
      </View>
      <Text
        style={[
          styles.iconButtonLabel,
          variant === "primary"
            ? styles.iconButtonLabelPrimary
            : styles.iconButtonLabelSecondary,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 24,
    borderWidth: 1,
    gap: 8,
    minHeight: 92,
  },
  iconButtonPrimary: {
    backgroundColor: theme.colors.accent,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  iconButtonSecondary: {
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderColor: theme.colors.line,
  },
  iconButtonPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.99 }],
  },
  iconWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapPrimary: {
    backgroundColor: "rgba(8, 17, 32, 0.14)",
  },
  iconWrapSecondary: {
    backgroundColor: "rgba(255, 138, 61, 0.14)",
  },
  iconButtonLabel: {
    fontSize: 14,
    fontWeight: "800",
  },
  iconButtonLabelPrimary: {
    color: theme.colors.page,
  },
  iconButtonLabelSecondary: {
    color: theme.colors.text,
  },
});
