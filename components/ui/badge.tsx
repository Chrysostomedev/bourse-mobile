import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, fonts, radius } from "@/lib/theme";

type BadgeTone = "primary" | "coral" | "success" | "gold" | "neutral";
type BadgeVariant = "solid" | "soft";

type BadgeProps = {
  label: string;
  tone?: BadgeTone;
  variant?: BadgeVariant;
  icon?: React.ReactNode;
};

const TONES: Record<BadgeTone, { solidBg: string; softBg: string; solidText: string; softText: string }> = {
  primary: { solidBg: colors.primary, softBg: "#F1E9FA", solidText: colors.white, softText: colors.primary },
  coral: { solidBg: colors.coral, softBg: "#FDEDE9", solidText: colors.white, softText: colors.coralDark },
  success: { solidBg: colors.like, softBg: "#E5F9EE", solidText: colors.white, softText: "#1E9E5B" },
  gold: { solidBg: colors.gold, softBg: "#FFF5DC", solidText: colors.white, softText: "#A9760B" },
  neutral: { solidBg: colors.inkSoft, softBg: colors.border, solidText: colors.white, softText: colors.inkSoft },
};

export function Badge({ label, tone = "primary", variant = "soft", icon }: BadgeProps) {
  const palette = TONES[tone];
  const isSolid = variant === "solid";

  return (
    <View
      style={[
        styles.base,
        { backgroundColor: isSolid ? palette.solidBg : palette.softBg },
      ]}
    >
      {icon}
      <Text
        style={[
          styles.text,
          { color: isSolid ? palette.solidText : palette.softText },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radius.pill,
    alignSelf: "flex-start",
  },
  text: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 11,
  },
});

export default Badge;