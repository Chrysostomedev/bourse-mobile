import React from "react";
import { View, StyleSheet } from "react-native";
import { router } from "expo-router";
import Svg, { Path, Circle, Line, Rect, Polygon } from "react-native-svg";
import { OnboardingLayout } from "@/components/onboarding/onboarding-layout";
import { colors } from "@/lib/theme";

const BG = "#4B1F73"; // violet foncé pour le step 4 (dernier)

export default function OnboardingStepFour() {
  return (
    <View style={[styles.root, { backgroundColor: BG }]}>
      <OnboardingLayout
        step={4}
        totalSteps={4}
        illustration={<CoachingIllustration />}
        title="Un dossier béton, ça s'apprend."
        description="Formations, coaching personnalisé et e-books. On te donne toutes les clés pour décrocher la bourse de tes rêves."
        imageSource={require("@/assets/img/bourse (4).jpg")}
        isLast
        onSkip={() => router.replace("/login/inscription")}
        onNext={() => router.replace("/login/inscription")}
      />
    </View>
  );
}

/**
 * Illustration : un personnage devant un dossier/CV avec un coach
 * qui l'oriente — ambiance coaching premium.
 */
function CoachingIllustration() {
  return (
    <Svg width={260} height={260} viewBox="0 0 260 260">
      {/* Halos */}
      <Circle cx="130" cy="130" r="108" fill="rgba(255,255,255,0.07)" />
      <Circle cx="130" cy="130" r="80" fill="rgba(255,255,255,0.10)" />

      {/* Bureau / Table */}
      <Rect x="50" y="168" width="160" height="12" rx="6" fill={colors.primaryLight} opacity={0.6} />

      {/* Feuille CV */}
      <Rect x="100" y="100" width="60" height="76" rx="8" fill="#FFFFFF" />
      <Line x1="112" y1="116" x2="148" y2="116" stroke={colors.border} strokeWidth={4} strokeLinecap="round" />
      <Line x1="112" y1="126" x2="148" y2="126" stroke={colors.border} strokeWidth={3} strokeLinecap="round" />
      <Line x1="112" y1="136" x2="140" y2="136" stroke={colors.border} strokeWidth={3} strokeLinecap="round" />
      <Line x1="112" y1="146" x2="148" y2="146" stroke={colors.border} strokeWidth={3} strokeLinecap="round" />
      <Line x1="112" y1="156" x2="135" y2="156" stroke={colors.border} strokeWidth={3} strokeLinecap="round" />

      {/* Coche verte sur le CV */}
      <Circle cx="148" cy="106" r="10" fill={colors.like} />
      <Path
        d="M143 106 L147 110 L153 102"
        stroke="#FFFFFF"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Étudiant (silhouette gauche) */}
      <Circle cx="82" cy="100" r="16" fill="#FDEDE9" />
      <Circle cx="82" cy="93" r="9" fill={colors.coral} />
      <Rect x="66" y="116" width="32" height="28" rx="8" fill="#FDEDE9" />

      {/* Coach (silhouette droite) */}
      <Circle cx="178" cy="100" r="16" fill="#EDE9FD" />
      <Circle cx="178" cy="93" r="9" fill={colors.primaryLight} />
      <Rect x="162" y="116" width="32" height="28" rx="8" fill="#EDE9FD" />

      {/* Flèche du coach vers le CV */}
      <Path
        d="M162 130 L155 130"
        stroke={colors.gold}
        strokeWidth={2.5}
        strokeLinecap="round"
      />
      <Polygon
        points="155,126 148,130 155,134"
        fill={colors.gold}
      />

      {/* Bulle coaching */}
      <Path
        d="M178 64 h30 a6 6 0 0 1 6 6 v14 a6 6 0 0 1 -6 6 h-6 l-5 5 v-5 h-19 a6 6 0 0 1 -6-6 V70 a6 6 0 0 1 6-6Z"
        fill={colors.gold}
      />
      <Circle cx="186" cy="77" r="3" fill="#FFFFFF" />
      <Circle cx="196" cy="77" r="3" fill="#FFFFFF" />
      <Circle cx="206" cy="77" r="3" fill="#FFFFFF" />

      {/* Fil constellation */}
      <Line x1="46" y1="80" x2="68" y2="64" stroke="#FFFFFF" strokeWidth={1.4} strokeDasharray="1,6" strokeLinecap="round" opacity={0.8} />
      <Circle cx="46" cy="80" r="4" fill="#FFFFFF" />
      <Circle cx="68" cy="64" r="3" fill={colors.coral} />

      <Line x1="50" y1="196" x2="38" y2="178" stroke="#FFFFFF" strokeWidth={1.4} strokeDasharray="1,6" strokeLinecap="round" opacity={0.7} />
      <Circle cx="38" cy="178" r="4" fill="#FFFFFF" />
      <Circle cx="50" cy="196" r="3" fill={colors.gold} opacity={0.9} />
    </Svg>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
});
