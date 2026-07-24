import React, { useEffect, useRef } from "react";
import { View, Text, Animated, Easing, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import { colors, fonts } from "@/lib/theme";

type LogoSize = "sm" | "md" | "lg" | "xl";

const SIZES: Record<LogoSize, number> = { sm: 28, md: 40, lg: 56, xl: 88 };

type LogoProps = {
  size?: LogoSize;
  animated?: boolean;
  withWordmark?: boolean;
  color?: string;
};

/**
 * Logo — la mascotte "B" de Bourse Pour Tous.
 *
 * `animated` déclenche un petit trot : deux hops rapides avec une légère
 * bascule gauche/droite, puis une pause — comme un pas de danse discret
 * plutôt qu'un rebond continu qui fatiguerait l'œil. Une ombre au sol
 * s'écrase légèrement à chaque hop pour ancrer le mouvement.
 *
 * Utilisation : splash screen, écrans de chargement, états vides.
 * Pour le header/tabbar, préférer un usage statique (`animated={false}`).
 */
export function Logo({
  size = "md",
  animated = true,
  withWordmark = false,
  color = colors.primary,
}: LogoProps) {
  const dimension = SIZES[size];
  const hop = useRef(new Animated.Value(0)).current;
  const tilt = useRef(new Animated.Value(0)).current;
  const shadowScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!animated) return;

    const trot = (direction: 1 | -1) =>
      Animated.sequence([
        Animated.parallel([
          Animated.timing(hop, {
            toValue: -1,
            duration: 180,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(tilt, {
            toValue: direction,
            duration: 180,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(shadowScale, {
            toValue: 0.7,
            duration: 180,
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.spring(hop, {
            toValue: 0,
            speed: 14,
            bounciness: 10,
            useNativeDriver: true,
          }),
          Animated.timing(tilt, {
            toValue: 0,
            duration: 220,
            useNativeDriver: true,
          }),
          Animated.spring(shadowScale, {
            toValue: 1,
            speed: 14,
            bounciness: 10,
            useNativeDriver: true,
          }),
        ]),
      ]);

    const loop = Animated.loop(
      Animated.sequence([
        trot(1),
        trot(-1),
        Animated.delay(1800),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [animated, hop, tilt, shadowScale]);

  const translateY = hop.interpolate({
    inputRange: [-1, 0],
    outputRange: [-dimension * 0.22, 0],
  });
  const rotate = tilt.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ["-8deg", "0deg", "8deg"],
  });

  return (
    <View style={styles.row}>
      <View style={{ width: dimension, alignItems: "center" }}>
        <Animated.View
          style={{ transform: [{ translateY }, { rotate }] }}
        >
          <Svg width={dimension} height={dimension} viewBox="0 0 100 100">
            <Path
              d="M32 18 L32 82 M32 18 L58 18 C76 18 76 46 58 48 L32 48 M32 48 L60 48 C79 48 79 80 59 82 L32 82"
              stroke={color}
              strokeWidth={15}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          </Svg>
        </Animated.View>
        {animated && (
          <Animated.View
            style={[
              styles.shadow,
              {
                width: dimension * 0.5,
                transform: [{ scaleX: shadowScale }],
              },
            ]}
          />
        )}
      </View>

      {withWordmark && (
        <View style={styles.wordmarkBlock}>
          <Text style={[styles.wordmark, { color }]}>Bourse</Text>
          <Text style={[styles.wordmarkAccent]}>Pour Tous</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  shadow: {
    height: 6,
    marginTop: 4,
    borderRadius: 999,
    backgroundColor: "rgba(26,26,46,0.15)",
  },
  wordmarkBlock: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  wordmark: {
    fontFamily: fonts.headingBold,
    fontSize: 18,
  },
  wordmarkAccent: {
    fontFamily: fonts.headingBold,
    fontSize: 18,
    color: colors.coral,
    marginLeft: 4,
  },
});

export default Logo;