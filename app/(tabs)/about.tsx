import { theme } from "@/constants/theme";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function About() {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <View pointerEvents="none" style={styles.background}>
        <View style={styles.glowOne} />
        <View style={styles.glowTwo} />
      </View>

      <View style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.eyebrow}>About</Text>
          <Text style={styles.title}>Sticker Smash</Text>
          <Text style={styles.description}>
            A simple photo and sticker editor with a cleaner visual style.
          </Text>
          <Link href="/" style={styles.link}>
            Back to studio
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.page,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  glowOne: {
    position: "absolute",
    top: -60,
    left: -40,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "rgba(255, 138, 61, 0.16)",
  },
  glowTwo: {
    position: "absolute",
    bottom: 160,
    right: -40,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: "rgba(103, 232, 249, 0.14)",
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 120,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    width: "100%",
    maxWidth: 420,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.line,
    padding: 24,
    gap: 12,
  },
  eyebrow: {
    color: theme.colors.accentAlt,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.6,
    textTransform: "uppercase",
  },
  title: {
    color: theme.colors.text,
    fontSize: 30,
    lineHeight: 34,
    fontWeight: "800",
  },
  description: {
    color: theme.colors.muted,
    fontSize: 15,
    lineHeight: 24,
  },
  link: {
    color: theme.colors.page,
    fontSize: 15,
    fontWeight: "800",
    backgroundColor: theme.colors.accent,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: theme.radius.pill,
    alignSelf: "flex-start",
    marginTop: 6,
  },
});
