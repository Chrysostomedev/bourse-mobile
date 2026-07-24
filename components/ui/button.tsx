import React, { useRef } from "react";
import {
  Pressable,
  Text,
  View,
  Animated,
  ActivityIndicator,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import { colors, fonts, radius } from "@/lib/theme";

type Variant = "primary" | "coral" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

type ButtonProps = {
  label: string;
  onPress?: (e: GestureResponderEvent) => void;
  variant?: Variant;
  size?: Size;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
};

const SIZE_STYLES: Record<Size, { paddingVertical: number; fontSize: number }> = {
  sm: { paddingVertical: 10, fontSize: 13 },
  md: { paddingVertical: 14, fontSize: 15 },
  lg: { paddingVertical: 17, fontSize: 16 },
};

export function Button({
  label,
  onPress,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
}: ButtonProps) {
  const scale = useRef(new Animated.Value(1)).current;
  const isDisabled = disabled || loading;

  const pressIn = () =>
    Animated.spring(scale, {
      toValue: 0.96,
      speed: 40,
      bounciness: 4,
      useNativeDriver: true,
    }).start();

  const pressOut = () =>
    Animated.spring(scale, {
      toValue: 1,
      speed: 20,
      bounciness: 6,
      useNativeDriver: true,
    }).start();

  const variantStyle = variantStyles[variant];
  const sizeStyle = SIZE_STYLES[size];

  return (
    <Animated.View
      style={[
        { transform: [{ scale }] },
        fullWidth && styles.fullWidth,
      ]}
    >
      <Pressable
        onPress={onPress}
        onPressIn={pressIn}
        onPressOut={pressOut}
        disabled={isDisabled}
        style={[
          styles.base,
          variantStyle.container,
          { paddingVertical: sizeStyle.paddingVertical },
          isDisabled && styles.disabled,
        ]}
      >
        {loading ? (
          <ActivityIndicator color={variantStyle.text.color as string} />
        ) : (
          <View style={styles.content}>
            {leftIcon}
            <Text
              style={[
                styles.label,
                variantStyle.text,
                { fontSize: sizeStyle.fontSize },
              ]}
            >
              {label}
            </Text>
            {rightIcon}
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
}

const variantStyles = {
  primary: {
    container: { backgroundColor: colors.primary },
    text: { color: colors.white },
  },
  coral: {
    container: { backgroundColor: colors.coral },
    text: { color: colors.white },
  },
  outline: {
    container: {
      backgroundColor: "transparent",
      borderWidth: 1.5,
      borderColor: colors.primary,
    },
    text: { color: colors.primary },
  },
  ghost: {
    container: { backgroundColor: "transparent" },
    text: { color: colors.primary },
  },
} as const;

const styles = StyleSheet.create({
  fullWidth: { width: "100%" },
  base: {
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 22,
  },
  disabled: {
    opacity: 0.5,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  label: {
    fontFamily: fonts.headingSemiBold,
  },
});

export default Button;