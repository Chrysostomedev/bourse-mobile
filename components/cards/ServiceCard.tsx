import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";
import { Badge } from "@/components/ui/badge";
import { colors, fonts, radius, shadow } from "@/lib/theme";

export type ServiceKind = "coaching" | "formation" | "dossier";

export type ServiceCardProps = {
  kind: ServiceKind;
  title: string;
  description: string;
  priceLabel: string; // ex: "À partir de 5 000 FCFA" ou "Gratuit"
  onPress?: () => void;
};

const KIND_ICON: Record<ServiceKind, (color: string) => React.ReactNode> = {
  coaching: (c) => <CoachIcon color={c} />,
  formation: (c) => <FormationIcon color={c} />,
  dossier: (c) => <DossierIcon color={c} />,
};

/**
 * ServiceCard — coaching, formations et préparation de dossiers.
 * Format carré, pensé pour une grille 2 colonnes sur l'onglet Services.
 */
export function ServiceCard({
  kind,
  title,
  description,
  priceLabel,
  onPress,
}: ServiceCardProps) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.iconBadge}>{KIND_ICON[kind](colors.primary)}</View>

      <Text numberOfLines={2} style={styles.title}>
        {title}
      </Text>
      <Text numberOfLines={2} style={styles.description}>
        {description}
      </Text>

      <Badge label={priceLabel} tone="gold" />
    </Pressable>
  );
}

function CoachIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Circle cx="9" cy="8" r="3" stroke={color} strokeWidth={2} />
      <Path
        d="M4 19c.8-3 2.6-4.5 5-4.5s4.2 1.5 5 4.5"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M16 6.5c1.4.4 2.4 1.4 2.4 3s-1 2.6-2.4 3"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function FormationIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 5 3 9l9 4 9-4-9-4Z"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Path
        d="M7 11.5V16c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5v-4.5"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function DossierIcon({ color }: { color: string }) {
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 3.5h9l3 3v14H6Z"
        stroke={color}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Path d="M9 12h6M9 16h6" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: 14,
    gap: 8,
    ...shadow.card,
  },
  iconBadge: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: "#F1E9FA",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 14.5,
    color: colors.ink,
  },
  description: {
    fontFamily: fonts.body,
    fontSize: 12,
    lineHeight: 17,
    color: colors.inkSoft,
  },
});

export default ServiceCard;