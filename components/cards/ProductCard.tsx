import React from "react";
import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
import { Badge } from "@/components/ui/badge";
import { colors, fonts, radius, shadow } from "@/lib/theme";

export type ProductCardProps = {
  title: string;
  category: string; // "E-book", "Guide PDF", "Modèle de lettre"...
  priceLabel: string; // "3 000 FCFA" ou "Gratuit"
  coverUri?: string;
  rating?: number; // 0-5
  onPress?: () => void; // ouvre la fiche produit
  onPressLink?: () => void; // ouvre le lien externe direct (achat/téléchargement)
};

/**
 * ProductCard — e-books, guides et documents de préparation de dossier.
 * Format vertical type "vignette librairie", avec un lien direct
 * (télécharger / acheter) sans quitter le fil.
 */
export function ProductCard({
  title,
  category,
  priceLabel,
  coverUri,
  rating,
  onPress,
  onPressLink,
}: ProductCardProps) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.cover}>
        {coverUri ? (
          <Image source={{ uri: coverUri }} style={styles.coverImage} />
        ) : (
          <View style={[styles.coverImage, styles.coverFallback]}>
            <BookIcon />
          </View>
        )}
      </View>

      <View style={styles.body}>
        <Badge label={category} tone="neutral" />
        <Text numberOfLines={2} style={styles.title}>
          {title}
        </Text>

        {typeof rating === "number" && (
          <View style={styles.ratingRow}>
            {Array.from({ length: 5 }).map((_, i) => (
              <StarIcon key={i} filled={i < Math.round(rating)} />
            ))}
          </View>
        )}

        <View style={styles.footer}>
          <Text style={styles.price}>{priceLabel}</Text>
          <Pressable onPress={onPressLink} hitSlop={8} style={styles.linkButton}>
            <LinkIcon />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

function BookIcon() {
  return (
    <Svg width={28} height={28} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 4.5h9c1.7 0 3 1.3 3 3v12h-9c-1.7 0-3-1.3-3-3Z"
        stroke={colors.primary}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Path d="M16 4.5h4v14.5" stroke={colors.primary} strokeWidth={2} />
    </Svg>
  );
}

function StarIcon({ filled }: { filled: boolean }) {
  return (
    <Svg width={12} height={12} viewBox="0 0 24 24">
      <Path
        d="m12 3 2.6 5.8 6.2.6-4.6 4.3 1.3 6.3L12 17l-5.5 3 1.3-6.3-4.6-4.3 6.2-.6Z"
        fill={filled ? colors.gold : colors.border}
      />
    </Svg>
  );
}

function LinkIcon() {
  return (
    <Svg width={17} height={17} viewBox="0 0 24 24" fill="none">
      <Path
        d="M10 14a4 4 0 0 0 5.7.2l2.5-2.5a4 4 0 1 0-5.6-5.6l-1.2 1.1"
        stroke={colors.white}
        strokeWidth={2}
        strokeLinecap="round"
      />
      <Path
        d="M14 10a4 4 0 0 0-5.7-.2L5.8 12.3a4 4 0 1 0 5.6 5.6l1.1-1.1"
        stroke={colors.white}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 160,
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    overflow: "hidden",
    ...shadow.card,
  },
  cover: {
    height: 120,
  },
  coverImage: {
    width: "100%",
    height: "100%",
  },
  coverFallback: {
    backgroundColor: "#F1E9FA",
    alignItems: "center",
    justifyContent: "center",
  },
  body: {
    padding: 12,
    gap: 6,
  },
  title: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 13.5,
    color: colors.ink,
    lineHeight: 18,
  },
  ratingRow: {
    flexDirection: "row",
    gap: 2,
  },
  footer: {
    marginTop: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  price: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 13,
    color: colors.primary,
  },
  linkButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.coral,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ProductCard;