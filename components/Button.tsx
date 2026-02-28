import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { theme } from "@/constants/theme";
import { Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  label: string;
  hint?: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
  theme?: "primary" | "secondary";
  onPress?: () => void;
};

export default function Button({
  label,
  hint,
  icon,
  theme: variant = "secondary",
  onPress,
}: Props) {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        variant === "primary" ? styles.buttonPrimary : styles.buttonSecondary,
        pressed && styles.buttonPressed,
      ]}
      onPress={onPress}
    >
      {icon ? (
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
      ) : null}

      <View style={styles.copyWrap}>
        <Text
          style={[
            styles.buttonLabel,
            variant === "primary"
              ? styles.buttonLabelPrimary
              : styles.buttonLabelSecondary,
          ]}
        >
          {label}
        </Text>
        {hint ? (
          <Text
            style={[
              styles.buttonHint,
              variant === "primary"
                ? styles.buttonHintPrimary
                : styles.buttonHintSecondary,
            ]}
          >
            {hint}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 84,
    borderRadius: 26,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    paddingHorizontal: 18,
    paddingVertical: 16,
    gap: 14,
    borderWidth: 1,
  },
  buttonPrimary: {
    backgroundColor: theme.colors.accent,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  buttonSecondary: {
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderColor: theme.colors.line,
  },
  buttonPressed: {
    opacity: 0.92,
    transform: [{ scale: 0.99 }],
  },
  iconWrap: {
    width: 46,
    height: 46,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapPrimary: {
    backgroundColor: "rgba(8, 17, 32, 0.14)",
  },
  iconWrapSecondary: {
    backgroundColor: "rgba(255, 138, 61, 0.14)",
  },
  copyWrap: {
    flex: 1,
    gap: 4,
  },
  buttonLabel: {
    fontSize: 17,
    fontWeight: "800",
  },
  buttonLabelPrimary: {
    color: theme.colors.page,
  },
  buttonLabelSecondary: {
    color: theme.colors.text,
  },
  buttonHint: {
    fontSize: 13,
    lineHeight: 18,
  },
  buttonHintPrimary: {
    color: "rgba(8, 17, 32, 0.72)",
  },
  buttonHintSecondary: {
    color: theme.colors.muted,
  },
});
