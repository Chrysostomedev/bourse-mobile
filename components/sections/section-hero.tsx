import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import Svg, { Circle, Line } from "react-native-svg";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { colors, fonts, radius } from "@/lib/theme";

type SectionHeroProps = {
  studentFirstName?: string;
  activeBoursesCount: number;
  onPressExplore?: () => void;
};

/**
 * SectionHero — premier bloc de l'onglet Accueil. Pas de bannière photo
 * générique : la mascotte B (statique ici, pour ne pas concurrencer le
 * CTA) et un chiffre concret ("128 bourses ouvertes en ce moment")
 * plutôt qu'un slogan vague.
 */
export function SectionHero({
  studentFirstName,
  activeBoursesCount,
  onPressExplore,
}: SectionHeroProps) {
return (
    <ImageBackground
      source={require("@/assets/img/hero-bg.jpg")}
      style={styles.card}
      imageStyle={styles.cardImage}
      resizeMode="cover"
    >
      <View style={styles.thread}>
        <Svg height="100%" width="100%" viewBox="0 0 340 130">
          <Line
            x1="10"
            y1="20"
            x2="330"
            y2="110"
            stroke="rgba(255,255,255,0.25)"
            strokeWidth={1.4}
            strokeDasharray="1,7"
          />
          <Circle cx="10" cy="20" r="3" fill="#FFFFFF" opacity={0.6} />
          <Circle cx="330" cy="110" r="3" fill={colors.gold} opacity={0.9} />
        </Svg>
      </View>

      <View style={styles.content}>
        <Text style={styles.eyebrow}>
          {studentFirstName ? `Salut ${studentFirstName} —` : "Bienvenue —"}
        </Text>
        <Text style={styles.headline}>
          {activeBoursesCount} bourses ouvertes en ce moment
        </Text>
        <Text style={styles.subtext}>
          Toutes vérifiées. Toutes gratuites. Filtre par pays et candidate en
          quelques minutes.
        </Text>

        <View style={styles.ctaRow}>
          <Button label="Explorer les bourses" size="sm" variant="coral" onPress={onPressExplore} />
        </View>
      </View>

      <View style={styles.mascot}>
        <Logo size="lg" animated={false} color={colors.white} />
      </View>
        </ImageBackground>
);
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginBottom: 24,
    borderRadius: radius.card,
    backgroundColor: colors.primary,
    padding: 20,
    overflow: "hidden",
    minHeight: 150,
  },
  thread: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    maxWidth: "72%",
    gap: 6,
  },
  eyebrow: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 12.5,
    color: "rgba(255,255,255,0.75)",
  },

cardImage: {
  borderRadius: radius.card,
},

  headline: {
    fontFamily: fonts.headingBold,
    fontSize: 20,
    lineHeight: 26,
    color: colors.white,
  },
  subtext: {
    fontFamily: fonts.body,
    fontSize: 12.5,
    lineHeight: 18,
    color: "rgba(255,255,255,0.85)",
  },
  ctaRow: {
    marginTop: 10,
    flexDirection: "row",
  },
  mascot: {
    position: "absolute",
    right: 16,
    bottom: 14,
    opacity: 0.9,
  },
});

export default SectionHero;