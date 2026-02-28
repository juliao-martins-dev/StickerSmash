import { theme } from "@/constants/theme";
import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function About() {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
      <View pointerEvents="none" style={styles.background}>
        <View style={styles.glowOne} />
        <View style={styles.glowTwo} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>About</Text>
          <Text style={styles.title}>A compact sticker studio for quick edits.</Text>
          <Text style={styles.description}>
            Sticker Smash keeps the flow intentionally short: load a photo, add
            a sticker, move it into place, and save the result.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>What this build focuses on</Text>
          <View style={styles.featureList}>
            <View style={styles.featureItem}>
              <Text style={styles.featureLabel}>Fast composition</Text>
              <Text style={styles.featureText}>
                The editor is built for one-screen editing without hunting
                through menus.
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureLabel}>Tactile controls</Text>
              <Text style={styles.featureText}>
                Stickers can be dragged and scaled directly on the canvas.
              </Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureLabel}>Cross-platform export</Text>
              <Text style={styles.featureText}>
                Save the final artwork to your device on native or download it
                on the web.
              </Text>
            </View>
          </View>
        </View>

        <Link href="/" style={styles.link}>
          Back to studio
        </Link>
      </ScrollView>
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
    bottom: 120,
    right: -40,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: "rgba(103, 232, 249, 0.14)",
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 22,
    paddingBottom: 138,
    gap: 22,
  },
  hero: {
    gap: 10,
  },
  eyebrow: {
    color: theme.colors.accentAlt,
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  title: {
    color: theme.colors.text,
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "800",
  },
  description: {
    color: theme.colors.muted,
    fontSize: 15,
    lineHeight: 24,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.line,
    padding: 20,
    gap: 16,
  },
  cardTitle: {
    color: theme.colors.text,
    fontSize: 22,
    fontWeight: "800",
  },
  featureList: {
    gap: 16,
  },
  featureItem: {
    padding: 16,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
    gap: 8,
  },
  featureLabel: {
    color: theme.colors.accentSoft,
    fontSize: 16,
    fontWeight: "700",
  },
  featureText: {
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 22,
  },
  link: {
    color: theme.colors.page,
    fontSize: 15,
    fontWeight: "800",
    backgroundColor: theme.colors.accent,
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderRadius: theme.radius.pill,
    alignSelf: "flex-start",
  },
});
