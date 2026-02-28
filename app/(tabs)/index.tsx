import Button from "@/components/Button";
import CircleButton from "@/components/CircleButton";
import EmojiList from "@/components/EmojiList";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiSticker from "@/components/EmojiSticker";
import IconButton from "@/components/IconButton";
import ImageViewer from "@/components/ImageViewer";
import { theme } from "@/constants/theme";

import domtoimage from "dom-to-image";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { useEffect, useRef, useState } from "react";
import {
  Alert,
  ImageSourcePropType,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { captureRef } from "react-native-view-shot";

const placeholderImage = require("@/assets/images/background-image.png");
const previewAspectRatio = 440 / 320;

export default function Index() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showAppOptions, setShowAppOptions] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pickedImage, setPickedImage] = useState<
    ImageSourcePropType | undefined
  >(undefined);
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const imageRef = useRef<View>(null);
  const { width } = useWindowDimensions();

  const previewWidth = Math.min(width - 48, 360);
  const previewHeight = Math.round(previewWidth * previewAspectRatio);
  const stickerSize = Math.max(68, Math.round(previewWidth * 0.2));

  useEffect(() => {
    if (!permissionResponse?.granted) {
      requestPermission();
    }
  }, [permissionResponse?.granted, requestPermission]);

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
      return;
    }

    Alert.alert("No photo selected", "Pick an image to start editing.");
  };

  const onReset = () => {
    setSelectedImage(null);
    setPickedImage(undefined);
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {
    if (Platform.OS !== "web") {
      try {
        const localUri = await captureRef(imageRef, {
          format: "png",
          quality: 1,
        });

        await MediaLibrary.saveToLibraryAsync(localUri);
        Alert.alert("Saved", "Your sticker composition is in the library.");
      } catch (error) {
        console.log(error);
      }

      return;
    }

    if (!imageRef.current) {
      return;
    }

    try {
      const dataUrl = await domtoimage.toJpeg(imageRef.current, {
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
    }
  };

  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaView style={styles.safeArea} edges={["top", "left", "right"]}>
        <View pointerEvents="none" style={styles.background}>
          <View style={styles.glowTop} />
          <View style={styles.glowBottom} />
        </View>

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.hero}>
            <Text style={styles.eyebrow}>Sticker Smash Studio</Text>
            <Text style={styles.heroTitle}>
              Turn any photo into a punchy sticker postcard.
            </Text>
            <Text style={styles.heroText}>
              Build a playful composition with a framed canvas, draggable
              stickers, and one-tap export.
            </Text>
          </View>

          <View style={styles.stageCard}>
            <View style={styles.stageHeader}>
              <View style={styles.stageCopy}>
                <Text style={styles.stageEyebrow}>Canvas</Text>
                <Text style={styles.stageTitle}>
                  {selectedImage
                    ? "Your photo is loaded and ready to style."
                    : "Start with the sample image or bring your own."}
                </Text>
              </View>
              <View style={styles.statusPill}>
                <View style={styles.statusDot} />
                <Text style={styles.statusText}>
                  {pickedImage ? "Sticker on" : "Ready"}
                </Text>
              </View>
            </View>

            <View style={styles.stageFrame}>
              <View
                ref={imageRef}
                collapsable={false}
                style={[
                  styles.captureArea,
                  { width: previewWidth, height: previewHeight },
                ]}
              >
                <ImageViewer
                  imageSource={placeholderImage}
                  selectedImage={selectedImage}
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

            <View style={styles.stageFooter}>
              <Text style={styles.stageFooterText}>
                Double tap a sticker to scale it. Drag to position it exactly
                where you want it.
              </Text>
              <Pressable onPress={onAddSticker} style={styles.inlineLink}>
                <Text style={styles.inlineLinkText}>Open sticker drawer</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.controlCard}>
            <Text style={styles.controlTitle}>
              {showAppOptions ? "Studio controls" : "Start with an image"}
            </Text>
            <Text style={styles.controlText}>
              {showAppOptions
                ? "Swap the artwork, add more personality, or export the final composition."
                : "Choose a photo from your library or jump in with the built-in artwork."}
            </Text>

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
                  hint="Import a shot from your gallery"
                  icon="photo-library"
                  theme="primary"
                  onPress={pickImageAsync}
                />
                <Button
                  label="Use sample artwork"
                  hint="Start editing with the built-in image"
                  icon="auto-awesome"
                  theme="secondary"
                  onPress={() => setShowAppOptions(true)}
                />
              </View>
            )}
          </View>
        </ScrollView>

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
    top: -80,
    right: -40,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: "rgba(103, 232, 249, 0.16)",
  },
  glowBottom: {
    position: "absolute",
    bottom: 120,
    left: -80,
    width: 280,
    height: 280,
    borderRadius: 140,
    backgroundColor: "rgba(255, 138, 61, 0.18)",
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 18,
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
    letterSpacing: 2.2,
    textTransform: "uppercase",
  },
  heroTitle: {
    color: theme.colors.text,
    fontSize: 34,
    lineHeight: 38,
    fontWeight: "800",
  },
  heroText: {
    color: theme.colors.muted,
    fontSize: 15,
    lineHeight: 24,
    maxWidth: 560,
  },
  stageCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.radius.lg,
    borderWidth: 1,
    borderColor: theme.colors.line,
    padding: 20,
    gap: 18,
    shadowColor: theme.colors.shadow,
    shadowOpacity: 0.28,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 16 },
    elevation: 10,
  },
  stageHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },
  stageCopy: {
    flex: 1,
    gap: 6,
  },
  stageEyebrow: {
    color: theme.colors.accent,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 1.3,
    textTransform: "uppercase",
  },
  stageTitle: {
    color: theme.colors.text,
    fontSize: 18,
    lineHeight: 26,
    fontWeight: "700",
  },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: theme.radius.pill,
    backgroundColor: theme.colors.surfaceSoft,
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
  stageFrame: {
    alignSelf: "center",
    padding: 10,
    borderRadius: 28,
    backgroundColor: theme.colors.pageAlt,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.06)",
  },
  captureArea: {
    borderRadius: 24,
    overflow: "hidden",
    backgroundColor: theme.colors.page,
  },
  stageFooter: {
    gap: 10,
  },
  stageFooterText: {
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 22,
  },
  inlineLink: {
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: theme.radius.pill,
    backgroundColor: "rgba(255, 255, 255, 0.04)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.08)",
  },
  inlineLinkText: {
    color: theme.colors.accentSoft,
    fontSize: 13,
    fontWeight: "700",
  },
  controlCard: {
    backgroundColor: theme.colors.surfaceElevated,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    borderColor: theme.colors.line,
    padding: 20,
    gap: 18,
  },
  controlTitle: {
    color: theme.colors.text,
    fontSize: 22,
    fontWeight: "800",
  },
  controlText: {
    color: theme.colors.muted,
    fontSize: 15,
    lineHeight: 22,
  },
  buttonStack: {
    gap: 14,
  },
  optionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 12,
  },
});
