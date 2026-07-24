import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { colors, fonts } from "@/lib/theme";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

const SIZES: Record<AvatarSize, number> = {
  xs: 28,
  sm: 36,
  md: 46,
  lg: 60,
  xl: 76,
};

type AvatarProps = {
  uri?: string;
  fallback?: string;
  size?: AvatarSize;
  ring?: "none" | "solid" | "gradient";
  ringColor?: string;
};

/**
 * Avatar — image ou initiale de repli. `ring="gradient"` reproduit le
 * halo violet → corail utilisé pour les stories de partenaires ;
 * `ring="solid"` sert pour un simple contour (ex: auteur d'un post).
 */
export function Avatar({
  uri,
  fallback = "?",
  size = "md",
  ring = "none",
  ringColor,
}: AvatarProps) {
  const dimension = SIZES[size];
  const ringPadding = ring === "none" ? 0 : 3;
  const outerSize = dimension + ringPadding * 2;

  return (
    <View
      style={[
        styles.ringWrap,
        {
          width: outerSize,
          height: outerSize,
          borderRadius: outerSize / 2,
          borderWidth: ring === "none" ? 0 : 2,
          borderColor:
            ring === "gradient"
              ? colors.coral
              : ringColor ?? colors.primaryLight,
        },
      ]}
    >
      <View
        style={[
          styles.inner,
          {
            width: dimension,
            height: dimension,
            borderRadius: dimension / 2,
          },
        ]}
      >
        {uri ? (
          <Image
            source={{ uri }}
            style={{ width: dimension, height: dimension }}
          />
        ) : (
          <Text
            style={{
              fontFamily: fonts.headingSemiBold,
              color: colors.white,
              fontSize: dimension * 0.38,
            }}
          >
            {fallback.charAt(0).toUpperCase()}
          </Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ringWrap: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface,
  },
  inner: {
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
});

export default Avatar;