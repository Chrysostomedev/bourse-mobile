import React from "react";
import { View, StyleSheet } from "react-native";
import { router } from "expo-router";
import Svg, { Path, Circle, Line, Rect } from "react-native-svg";
import { OnboardingLayout } from "@/components/onboarding/onboarding-layout";
import { colors } from "@/lib/theme";

const BG = "#FF6F5E";

export default function OnboardingStepTwo() {
  return (
    <View style={[styles.root, { backgroundColor: BG }]}>
      <OnboardingLayout
        step={2}
        totalSteps={4}
        illustration={<ShieldIllustration />}
        title="On te protège des arnaques."
        description="Une bourse ne se paie jamais. Si on te demande de l'argent, c'est suspect. Notre équipe veille au grain."
        imageSource={require("@/assets/img/bourse (2).jpg")}
        onSkip={() => router.replace("/login/inscription")}
        onNext={() => router.push("/(onboarding)/step-3")}
      />
    </View>
  );
}

/**
 * Illustration : un bouclier avec coche, et un billet barré juste à
 * côté — message visuel immédiat : "protection" + "zéro paiement".
 * Même traitement graphique (à-plats, traits épais) que l'écran 1.
 */
function ShieldIllustration() {
  return (
    <Svg width={260} height={260} viewBox="0 0 260 260">
      <Circle cx="130" cy="130" r="108" fill="rgba(255,255,255,0.10)" />
      <Circle cx="130" cy="130" r="82" fill="rgba(255,255,255,0.12)" />

      {/* Bouclier */}
      <Path
        d="M130 58 L182 78 C182 122 168 158 130 182 C92 158 78 122 78 78 Z"
        fill="#FFFFFF"
      />
      <Path
        d="M130 58 L182 78 C182 122 168 158 130 182 Z"
        fill="#FDEDE9"
      />
      <Path
        d="M108 122 L124 140 L156 104"
        stroke={colors.primary}
        strokeWidth={7}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Billet barré, en suspension à droite */}
      <Rect
        x="170"
        y="150"
        width="52"
        height="34"
        rx="6"
        fill={colors.gold}
        opacity={0.95}
      />
      <Circle cx="196" cy="167" r="8" fill="#FFFFFF" opacity={0.85} />
      <Line
        x1="164"
        y1="146"
        x2="228"
        y2="188"
        stroke={colors.alert}
        strokeWidth={5}
        strokeLinecap="round"
      />

      {/* Fil constellation */}
      <Line
        x1="50"
        y1="76"
        x2="86"
        y2="60"
        stroke="#FFFFFF"
        strokeWidth={1.4}
        strokeDasharray="1,6"
        strokeLinecap="round"
        opacity={0.8}
      />
      <Circle cx="50" cy="76" r="4" fill="#FFFFFF" />
      <Circle cx="86" cy="60" r="3" fill={colors.primary} />

      <Line
        x1="70"
        y1="196"
        x2="46"
        y2="176"
        stroke="#FFFFFF"
        strokeWidth={1.4}
        strokeDasharray="1,6"
        strokeLinecap="round"
        opacity={0.8}
      />
      <Circle cx="70" cy="196" r="3" fill="#FFFFFF" opacity={0.7} />
      <Circle cx="46" cy="176" r="4" fill="#FFFFFF" />
    </Svg>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});