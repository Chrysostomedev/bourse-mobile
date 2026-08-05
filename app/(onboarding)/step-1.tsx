import React from "react";
import { View, StyleSheet } from "react-native";
import { router } from "expo-router";
import Svg, { Path, Circle, Line, Polygon } from "react-native-svg";
import { OnboardingLayout } from "@/components/onboarding/onboarding-layout";
import { colors } from "@/lib/theme";

const BG = "#F0562E";

export default function OnboardingStepOne() {
  return (
    <View style={[styles.root, { backgroundColor: BG }]}>
      <OnboardingLayout
        step={1}
        totalSteps={4}
        illustration={<WelcomeIllustration />}
        title="Toutes les bourses, au même endroit."
        description="Fini les groupes WhatsApp et les pages douteuses. Chaque bourse est vérifiée avant d'arriver jusqu'à toi."
        imageSource={require("@/assets/img/bourse (1).jpg")}
        onSkip={() => router.replace("/login/inscription")}
        onNext={() => router.push("/(onboarding)/step-2")}
      />
    </View>
  );
}

/**
 * Illustration : un livre ouvert surmonté d'une toge, entouré du "fil
 * constellation" de la marque — les mêmes points reliés que dans le
 * NavBar et le TabBar. Traits épais, à-plats, aucun dégradé photo :
 * cohérent avec l'identité "papercut" du reste de l'appli.
 */
function WelcomeIllustration() {
  return (
    <Svg width={260} height={260} viewBox="0 0 260 260">
      {/* Halo doux */}
      <Circle cx="130" cy="130" r="108" fill="rgba(255,255,255,0.10)" />
      <Circle cx="130" cy="130" r="82" fill="rgba(255,255,255,0.12)" />

      {/* Livre ouvert */}
      <Path
        d="M40 150 C70 138, 100 138, 128 150 L128 190 C100 178, 70 178, 40 190 Z"
        fill="#FFFFFF"
      />
      <Path
        d="M216 150 C186 138, 156 138, 128 150 L128 190 C156 178, 186 178, 216 190 Z"
        fill="#FDEDE9"
      />
      <Path
        d="M128 150 L128 190"
        stroke={colors.coralDark}
        strokeWidth={2}
        opacity={0.3}
      />

      {/* Toge / mortarboard posée sur le livre */}
      <Polygon
        points="128,78 190,104 128,130 66,104"
        fill={colors.primary}
      />
      <Polygon
        points="128,130 66,104 66,112 128,138 190,112 190,104"
        fill={colors.primaryDark}
      />
      <Line
        x1="128"
        y1="130"
        x2="128"
        y2="150"
        stroke={colors.primaryDark}
        strokeWidth={2}
      />
      <Circle cx="128" cy="152" r="4" fill={colors.gold} />

      {/* Fil constellation autour de l'illustration */}
      <Line
        x1="46"
        y1="70"
        x2="90"
        y2="52"
        stroke="#FFFFFF"
        strokeWidth={1.4}
        strokeDasharray="1,6"
        strokeLinecap="round"
        opacity={0.8}
      />
      <Circle cx="46" cy="70" r="4" fill="#FFFFFF" />
      <Circle cx="90" cy="52" r="3" fill={colors.gold} />

      <Line
        x1="214"
        y1="66"
        x2="182"
        y2="46"
        stroke="#FFFFFF"
        strokeWidth={1.4}
        strokeDasharray="1,6"
        strokeLinecap="round"
        opacity={0.8}
      />
      <Circle cx="214" cy="66" r="4" fill="#FFFFFF" />
      <Circle cx="182" cy="46" r="3" fill="#FFFFFF" opacity={0.7} />
    </Svg>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});