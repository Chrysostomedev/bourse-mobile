import React, { useEffect, useRef } from "react";
import { View, Text, Pressable, StyleSheet, Dimensions, Animated, Platform } from "react-native";
import { router } from "expo-router";
import { colors, fonts } from "@/lib/theme";

const { width } = Dimensions.get("window");

type OnboardingLayoutProps = {
  step: 1 | 2 | 3 | 4;
  totalSteps?: number;
  illustration: React.ReactNode;
  title: string;
  description: string;
  isLast?: boolean;
  onSkip?: () => void;
  onNext?: () => void;
};

export function OnboardingLayout({
  step,
  totalSteps = 4,
  illustration,
  title,
  description,
  isLast = false,
  onSkip,
  onNext,
}: OnboardingLayoutProps) {
  // Animation refs
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(60)).current;
  const illuScale = useRef(new Animated.Value(0.85)).current;
  const logoFade = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Run animations on mount
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        friction: 8,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.spring(illuScale, {
        toValue: 1,
        friction: 7,
        tension: 30,
        useNativeDriver: true,
      }),
      Animated.timing(logoFade, {
        toValue: 1,
        duration: 600,
        delay: 200,
        useNativeDriver: true,
      }),
    ]).start();
  }, [step]);

  return (
    <Animated.View style={[styles.screen, { opacity: fadeAnim }]}>
      {/* Premium Logo Header */}
      <Animated.View style={[styles.logoHeader, { opacity: logoFade }]}>
        <View style={styles.logoBadge}>
          <Text style={styles.logoLetter}>B</Text>
        </View>
        <Text style={styles.logoTitle}>Bourse Pour Tous</Text>
      </Animated.View>

      <Pressable onPress={onSkip} style={styles.skip} hitSlop={10}>
        <Text style={styles.skipText}>Passer</Text>
      </Pressable>

      <Animated.View style={[styles.illustrationZone, { transform: [{ scale: illuScale }] }]}>
        {illustration}
      </Animated.View>

      <Animated.View style={[styles.sheet, { transform: [{ translateY: slideAnim }] }]}>
        <View style={styles.dots}>
          {Array.from({ length: totalSteps }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                i === step - 1 ? styles.dotActive : styles.dotIdle,
              ]}
            />
          ))}
        </View>

        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>

        <Pressable style={styles.cta} onPress={onNext}>
          <Text style={styles.ctaText}>
            {isLast ? "Créer mon compte" : "Suivant"}
          </Text>
        </Pressable>

        {isLast && (
          <Pressable hitSlop={8} onPress={() => router.push("/login/connexion")}>
            <Text style={styles.loginLink}>J'ai déjà un compte</Text>
          </Pressable>
        )}
      </Animated.View>
    </Animated.View>
  );
}

const SHEET_RADIUS = 32;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  logoHeader: {
    position: "absolute",
    top: Platform.OS === "ios" ? 56 : 40,
    left: 20,
    zIndex: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  logoBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "rgba(255, 255, 255, 0.4)",
  },
  logoLetter: {
    color: colors.white,
    fontFamily: fonts.headingBold,
    fontSize: 18,
  },
  logoTitle: {
    color: colors.white,
    fontFamily: fonts.headingBold,
    fontSize: 16,
    letterSpacing: 0.5,
  },
  skip: {
    position: "absolute",
    top: Platform.OS === "ios" ? 56 : 40,
    right: 20,
    zIndex: 10,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "rgba(255,255,255,0.18)",
  },
  skipText: {
    color: colors.white,
    fontFamily: fonts.bodySemiBold,
    fontSize: 13,
  },
  illustrationZone: {
    height: "52%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 40,
  },
  sheet: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: SHEET_RADIUS,
    borderTopRightRadius: SHEET_RADIUS,
    paddingHorizontal: 28,
    paddingTop: 28,
    alignItems: "center",
    marginTop: -SHEET_RADIUS,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  dots: {
    flexDirection: "row",
    gap: 6,
    marginBottom: 20,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  dotActive: {
    width: 22,
    backgroundColor: colors.primary,
  },
  dotIdle: {
    width: 6,
    backgroundColor: colors.border,
  },
  title: {
    fontFamily: fonts.headingBold,
    fontSize: 22,
    color: colors.ink,
    textAlign: "center",
    marginBottom: 10,
    maxWidth: width * 0.85,
  },
  description: {
    fontFamily: fonts.body,
    fontSize: 14.5,
    lineHeight: 21,
    color: colors.inkSoft,
    textAlign: "center",
    maxWidth: width * 0.85,
  },
  cta: {
    marginTop: "auto",
    marginBottom: 20,
    width: "100%",
    backgroundColor: colors.primary,
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 4,
  },
  ctaText: {
    color: colors.white,
    fontFamily: fonts.headingSemiBold,
    fontSize: 15.5,
  },
  loginLink: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 13,
    color: colors.primary,
    marginBottom: 24,
  },
});

export default OnboardingLayout;