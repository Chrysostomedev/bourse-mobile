import React from "react";
import {
  View,
  Text,
  Pressable,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { Button } from "@/components/ui/button";
import { colors, fonts, radius } from "@/lib/theme";

export type PubCardProps = {
  sponsorName: string;
  headline: string;
  subheadline?: string;
  imageUri?: string;
  ctaLabel?: string;
  phone?: string;
  onPressCta?: () => void;
};

/**
 * PubCard — carte du carrousel publicitaire (bandeau "faites votre pub
 * ici" en haut de l'accueil). Toujours étiquetée "Sponsorisé" pour rester
 * honnête avec l'utilisateur — même logique de transparence que le
 * message anti-arnaque de l'onboarding.
 */
export function PubCard({
  sponsorName,
  headline,
  subheadline,
  imageUri,
  ctaLabel = "En savoir plus",
  phone,
  onPressCta,
}: PubCardProps) {
  return (
    <Pressable onPress={onPressCta} style={styles.wrap}>
      <ImageBackground
        source={imageUri ? { uri: imageUri } : undefined}
        style={styles.background}
        imageStyle={styles.image}
      >
        <View style={styles.overlay} />

        <View style={styles.sponsoredTag}>
          <Text style={styles.sponsoredText}>Sponsorisé · {sponsorName}</Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.headline}>{headline}</Text>
          {subheadline ? (
            <Text style={styles.subheadline}>{subheadline}</Text>
          ) : null}

          <View style={styles.bottomRow}>
            <Button
              label={ctaLabel}
              size="sm"
              variant="coral"
              onPress={onPressCta}
            />
            {phone ? <Text style={styles.phone}>{phone}</Text> : null}
          </View>
        </View>
      </ImageBackground>
    </Pressable>
  );
}

const HEIGHT = 150;

const styles = StyleSheet.create({
  wrap: {
    width: 320,
    height: HEIGHT,
    borderRadius: radius.card,
    overflow: "hidden",
  },
  background: {
    flex: 1,
    backgroundColor: colors.primary,
    justifyContent: "flex-end",
  },
  image: {
    borderRadius: radius.card,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(26,26,46,0.32)",
  },
  sponsoredTag: {
    position: "absolute",
    top: 12,
    left: 12,
    backgroundColor: "rgba(255,255,255,0.85)",
    borderRadius: radius.pill,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  sponsoredText: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 10,
    color: colors.ink,
  },
  content: {
    padding: 14,
    gap: 4,
  },
  headline: {
    fontFamily: fonts.headingBold,
    fontSize: 16,
    color: colors.white,
  },
  subheadline: {
    fontFamily: fonts.body,
    fontSize: 12.5,
    color: "rgba(255,255,255,0.9)",
  },
  bottomRow: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  phone: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 12,
    color: colors.white,
  },
});

export default PubCard;