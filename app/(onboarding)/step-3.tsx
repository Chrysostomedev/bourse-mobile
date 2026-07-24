import React from "react";
import { View, StyleSheet } from "react-native";
import { router } from "expo-router";
import Svg, { Path, Circle, Line, Ellipse } from "react-native-svg";
import { OnboardingLayout } from "@/components/onboarding/onboarding-layout";
import { colors } from "@/lib/theme";

const BG = "#6B2FA0"; // violet primaire pour la step 3

export default function OnboardingStepThree() {
  return (
    <View style={[styles.root, { backgroundColor: BG }]}>
      <OnboardingLayout
        step={3}
        totalSteps={4}
        illustration={<CommunityIllustration />}
        title="Like, commente, partage."
        description="Suis les bourses qui t'intéressent et échange avec d'autres candidats. Une communauté de 12 000+ étudiants t'attend."
        onSkip={() => router.replace("/login/inscription")}
        onNext={() => router.push("/(onboarding)/step-4")}
      />
    </View>
  );
}

/**
 * Illustration : trois silhouettes autour d'un fil-feed avec cœurs et
 * bulles de commentaires — le même motif "constellation" de la marque.
 */
function CommunityIllustration() {
  return (
    <Svg width={260} height={260} viewBox="0 0 260 260">
      {/* Halos */}
      <Circle cx="130" cy="130" r="108" fill="rgba(255,255,255,0.08)" />
      <Circle cx="130" cy="130" r="80" fill="rgba(255,255,255,0.10)" />

      {/* Carte feed centrale */}
      <Path
        d="M80 90 H180 a10 10 0 0 1 10 10 v70 a10 10 0 0 1 -10 10 H80 a10 10 0 0 1 -10-10 V100 a10 10 0 0 1 10-10Z"
        fill="#FFFFFF"
      />

      {/* Lignes de texte dans la carte feed */}
      <Line x1="100" y1="110" x2="170" y2="110" stroke={colors.border} strokeWidth={5} strokeLinecap="round" />
      <Line x1="100" y1="122" x2="155" y2="122" stroke={colors.border} strokeWidth={4} strokeLinecap="round" />
      <Line x1="100" y1="134" x2="163" y2="134" stroke={colors.border} strokeWidth={4} strokeLinecap="round" />

      {/* Séparateur */}
      <Line x1="90" y1="148" x2="170" y2="148" stroke={colors.border} strokeWidth={1} />

      {/* Like + commentaire */}
      <Path
        d="M98 162c-1-3.5 2-6 4.5-4 1.2-1.8 3-2 4 0C109 162 100 167 100 167s-8-5-2-5z"
        fill={colors.coral}
        strokeWidth={0}
      />
      <Path
        d="M120 158h14v8l-4-2h-10z"
        fill={colors.primary}
        strokeWidth={0}
      />

      {/* Silhouette gauche */}
      <Circle cx="58" cy="108" r="16" fill="#FDEDE9" />
      <Ellipse cx="58" cy="135" rx="14" ry="10" fill="#FDEDE9" />
      <Circle cx="58" cy="102" r="8" fill={colors.coral} />

      {/* Silhouette droite */}
      <Circle cx="202" cy="108" r="16" fill="#EDE9FD" />
      <Ellipse cx="202" cy="135" rx="14" ry="10" fill="#EDE9FD" />
      <Circle cx="202" cy="102" r="8" fill={colors.primaryLight} />

      {/* Bulle commentaire flottante */}
      <Path
        d="M170 58 h32 a6 6 0 0 1 6 6 v16 a6 6 0 0 1 -6 6 h-8 l-5 5 v-5 h-19 a6 6 0 0 1 -6-6 V64 a6 6 0 0 1 6-6Z"
        fill={colors.gold}
      />
      <Line x1="178" y1="70" x2="198" y2="70" stroke="#FFFFFF" strokeWidth={3} strokeLinecap="round" />
      <Line x1="178" y1="78" x2="192" y2="78" stroke="#FFFFFF" strokeWidth={2.5} strokeLinecap="round" />

      {/* Cœur flottant */}
      <Path
        d="M50 168c-2-6 4-10 8-6 2-3.5 6-3.5 8 0C68 168 58 175 58 175s-10-7-8-7z"
        fill={colors.like}
      />

      {/* Fil constellation */}
      <Line x1="58" y1="120" x2="80" y2="105" stroke="#FFFFFF" strokeWidth={1.4} strokeDasharray="1,6" strokeLinecap="round" opacity={0.7} />
      <Line x1="202" y1="120" x2="180" y2="105" stroke="#FFFFFF" strokeWidth={1.4} strokeDasharray="1,6" strokeLinecap="round" opacity={0.7} />
      <Circle cx="40" cy="70" r="4" fill="#FFFFFF" opacity={0.7} />
      <Circle cx="220" cy="180" r="3" fill={colors.coral} opacity={0.9} />
    </Svg>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
