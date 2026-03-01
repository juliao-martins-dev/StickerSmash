import Button from "@/components/Button";
import CircleButton from "@/components/CircleButton";
import EmojiList from "@/components/EmojiList";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiSticker from "@/components/EmojiSticker";
import IconButton from "@/components/IconButton";
import ImageViewer from "@/components/ImageViewer";
import { theme } from "@/constants/theme";

import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { useRef, useState } from "react";
import {
  Alert,
  ImageSourcePropType,
  Platform,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { captureRef } from "react-native-view-shot";

const placeholderImage = require("@/assets/images/background-image.png");
const placeholderImageKey = "placeholder-image";
const previewAspectRatio = 440 / 320;

export default function Index() {
  const [baseImageUri, setBaseImageUri] = useState<string | null>(null);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [pickedImage, setPickedImage] = useState<
    ImageSourcePropType | undefined
  >(undefined);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions({
    writeOnly: true,
  });
  const imageRef = useRef<View>(null);
  const { width } = useWindowDimensions();

  const previewWidth = Math.max(220, Math.min(width - 56, 330));
  const previewHeight = Math.round(previewWidth * previewAspectRatio);
  const stickerSize = Math.max(68, Math.round(previewWidth * 0.2));
  const previewSource = baseImageUri ? { uri: baseImageUri } : placeholderImage;
  const previewSourceKey = baseImageUri ?? placeholderImageKey;

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setBaseImageUri(result.assets[0].uri);
      setShowAppOptions(true);
      return;
    }

    Alert.alert("No photo selected", "Pick an image to start editing.");
  };

  const onReset = () => {
    setBaseImageUri(null);
    setPickedImage(undefined);
    setIsModalVisible(false);
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    if (!showAppOptions) {
      return;
    }

    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {
    if (isSaving || !imageRef.current) {
      return;
    }

    setIsSaving(true);

    if (Platform.OS !== "web") {
      try {
        const needsMediaLibraryPermission =
          Platform.OS === "ios" ||
          (Platform.OS === "android" && Platform.Version < 33);

        if (needsMediaLibraryPermission) {
          const permission =
            permissionResponse?.granted ?? (await requestPermission()).granted;

          if (!permission) {
            Alert.alert(
              "Permission needed",
              "Allow photo library access to save your image."
            );
            return;
          }
        }

        const localUri = await captureRef(imageRef, {
          format: "jpg",
          quality: 0.92,
        });

        await MediaLibrary.saveToLibraryAsync(localUri);
        Alert.alert("Saved", "Your sticker composition is in the library.");
      } catch (error) {
        console.log(error);
        Alert.alert("Save failed", "The image could not be saved.");
      } finally {
        setIsSaving(false);
      }

      return;
    }

    try {
      const { default: domtoimage } = await import("dom-to-image");
      const dataUrl = await domtoimage.toJpeg(imageRef.current as unknown as Node, {
        quality: 0.95,
        width: previewWidth,
        height: previewHeight,
      });

      const link = document.createElement("a");
      link.download = "sticker-smash.jpeg";
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.log(error);
      Alert.alert("Save failed", "The image could not be downloaded.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <View pointerEvents="none" style={styles.background}>
          <View style={styles.glowTop} />
          <View style={styles.glowBottom} />
        </View>

        <View style={styles.container}>
          <View style={styles.stage}>
            <View style={[styles.stageHeader, { width: previewWidth }]}>
              <Text style={styles.badge}>Sticker Smash</Text>
              <View style={styles.statusPill}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>
                  {pickedImage ? "Sticker on" : "Ready"}
                </Text>
              </View>
            </View>

            <View style={styles.previewShell}>
              <View
                ref={imageRef}
                collapsable={false}
                style={[
                  styles.captureArea,
                  { width: previewWidth, height: previewHeight },
                ]}
              >
                <ImageViewer
                  source={previewSource}
                  sourceKey={previewSourceKey}
                  width={previewWidth}
                  height={previewHeight}
                />
                {pickedImage ? (
                  <EmojiSticker
                    imageSize={stickerSize}
                    stickerSource={pickedImage}
                  />
                ) : null}
              </View>
            </View>

            <Text style={styles.helperText}>
              {showAppOptions
                ? "Drag to move. Double tap to resize."
                : "Choose a photo or start with the sample."}
            </Text>
          </View>

          <View style={styles.controlsCard}>
            {showAppOptions ? (
              <View style={styles.optionsRow}>
                <IconButton
                  icon="refresh"
                  label="Reset"
                  onPress={onReset}
                  variant="secondary"
                />
                <CircleButton onPress={onAddSticker} />
                <IconButton
                  icon="save-alt"
                  label="Save"
                  onPress={onSaveImageAsync}
                  variant="primary"
                />
              </View>
            ) : (
              <View style={styles.buttonStack}>
                <Button
                  label="Choose a photo"
                  icon="photo-library"
                  theme="primary"
                  onPress={pickImageAsync}
                />
                <Button
                  label="Use this photo"
                  icon="auto-awesome"
                  theme="secondary"
                  onPress={() => {
                    setBaseImageUri(null);
                    setShowAppOptions(true);
                  }}
                />
              </View>
            )}
          </View>
        </View>

        <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
          <EmojiList onSelect={setPickedImage} onCloseModal={onModalClose} />
        </EmojiPicker>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: theme.colors.page,
  },
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.page,
  },
  background: {
    ...StyleSheet.absoluteFillObject,
  },
  glowTop: {
    position: "absolute",
    top: -70,
    right: -30,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: "rgba(103, 232, 249, 0.16)",
  },
  glowBottom: {
    position: "absolute",
    bottom: 140,
    left: -90,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: "rgba(255, 138, 61, 0.18)",
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 10,
    paddingBottom: 120,
    justifyContent: "space-between",
  },
  stage: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 16,
  },
  stageHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  badge: {
    color: theme.colors.accentSoft,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 1.6,
    textTransform: "uppercase",
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: theme.radius.pill,
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    borderWidth: 1,
    borderColor: theme.colors.line,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.accentAlt,
  },
  statusText: {
    color: theme.colors.text,
    fontSize: 12,
    fontWeight: "700",
  },
  previewShell: {
    padding: 10,
    borderRadius: 30,
    backgroundColor: theme.colors.surface,
    borderWidth: 1,
    borderColor: theme.colors.line,
    shadowColor: theme.colors.shadow,
    shadowOpacity: 0.26,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 16 },
    elevation: 10,
  },
  captureArea: {
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: theme.colors.pageAlt,
  },
  helperText: {
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  controlsCard: {
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.line,
    padding: 16,
  },
  buttonStack: {
    gap: 12,
  },
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
});
