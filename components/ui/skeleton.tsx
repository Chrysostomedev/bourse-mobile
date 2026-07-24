import React, { useEffect, useRef } from "react";
import { View, Animated, Easing, StyleSheet, ViewStyle } from "react-native";
import { colors, radius } from "@/lib/theme";

type SkeletonProps = {
  width?: number | `${number}%`;
  height?: number;
  borderRadius?: number;
  style?: ViewStyle;
};

/**
 * Skeleton — bloc de chargement de base. Une opacité qui respire
 * (0.4 → 1 → 0.4) en boucle, plus discret et plus facile à décliner
 * qu'un dégradé qui se déplace — et ça évite une dépendance
 * supplémentaire (expo-linear-gradient) juste pour un effet de loading.
 */
export function Skeleton({
  width = "100%",
  height = 16,
  borderRadius: rounding = 8,
  style,
}: SkeletonProps) {
  const opacity = useRef(new Animated.Value(0.4)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 650,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.4,
          duration: 650,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        {
          width,
          height,
          borderRadius: rounding,
          backgroundColor: colors.border,
          opacity,
        },
        style,
      ]}
    />
  );
}

/**
 * BourseCardSkeleton — reprend exactement la géométrie de BourseCard
 * (même hauteur d'image, mêmes zones de texte) pour que le passage
 * skeleton → contenu réel ne "saute" pas visuellement.
 */
export function BourseCardSkeleton({ fullWidth = false }: { fullWidth?: boolean }) {
  return (
    <View
      style={[
        styles.card,
        fullWidth ? styles.cardFullWidth : styles.cardFixed,
      ]}
    >
      <Skeleton height={110} borderRadius={0} />
      <View style={styles.body}>
        <View style={styles.tagsRow}>
          <Skeleton width={64} height={20} borderRadius={radius.pill} />
          <Skeleton width={70} height={20} borderRadius={radius.pill} />
        </View>
        <Skeleton height={15} style={{ marginTop: 2 }} />
        <Skeleton width="70%" height={15} />
        <Skeleton width="50%" height={12} style={{ marginTop: 6 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    overflow: "hidden",
  },
  cardFixed: {
    width: 240,
  },
  cardFullWidth: {
    width: "100%",
  },
  body: {
    padding: 14,
    gap: 8,
  },
  tagsRow: {
    flexDirection: "row",
    gap: 6,
  },
});

export default Skeleton;