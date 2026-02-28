import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { theme } from "@/constants/theme";
import { PropsWithChildren } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

type Props = PropsWithChildren<{
  isVisible: boolean;
  onClose: () => void;
}>;

export default function EmojiPicker({ isVisible, children, onClose }: Props) {
  return (
    <Modal animationType="fade" transparent visible={isVisible}>
      <View style={styles.overlay}>
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        <View style={styles.modalContent}>
          <View style={styles.grabber} />
          <View style={styles.titleContainer}>
            <View style={styles.titleCopy}>
              <Text style={styles.eyebrow}>Sticker Drawer</Text>
              <Text style={styles.title}>Choose a sticker</Text>
            </View>
            <Pressable onPress={onClose} style={styles.closeButton}>
              <MaterialIcons name="close" color={theme.colors.text} size={22} />
            </Pressable>
          </View>
          {children}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: theme.colors.overlay,
  },
  modalContent: {
    width: "100%",
    minHeight: 300,
    backgroundColor: theme.colors.surface,
    borderTopRightRadius: 28,
    borderTopLeftRadius: 28,
    paddingTop: 14,
    paddingBottom: 28,
    borderTopWidth: 1,
    borderColor: theme.colors.line,
  },
  grabber: {
    width: 54,
    height: 5,
    borderRadius: theme.radius.pill,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    alignSelf: "center",
    marginBottom: 18,
  },
  titleContainer: {
    paddingHorizontal: 20,
    paddingBottom: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleCopy: {
    gap: 6,
  },
  eyebrow: {
    color: theme.colors.accentAlt,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  title: {
    color: theme.colors.text,
    fontSize: 22,
    fontWeight: "800",
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
});
