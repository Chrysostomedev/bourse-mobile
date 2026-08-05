import React, { useRef } from "react";
import { View, Text, Pressable, Animated, StyleSheet } from "react-native";
import { Image } from "expo-image";
import Svg, { Path } from "react-native-svg";
import { Badge } from "@/components/ui/badge";
import { colors, fonts, radius, shadow } from "@/lib/theme";

export type BourseCardProps = {
  title: string;
  organism: string;
  countryFlag: string;
  countryName: string;
  level: string;
  deadline: Date;
  coverImageUrl?: string | null;
  isSaved?: boolean;
  fullWidth?: boolean;
  compact?: boolean;
  onToggleSave?: () => void;
  onPress?: () => void;
};

function daysLeft(deadline: Date) {
  const diff = Math.ceil(
    (deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
  return diff;
}

export function BourseCard({
  title,
  organism,
  countryFlag,
  countryName,
  level,
  deadline,
  coverImageUrl,
  isSaved = false,
  fullWidth = false,
  compact = false,
  onToggleSave,
  onPress,
}: BourseCardProps) {
  const bookmarkScale = useRef(new Animated.Value(1)).current;
  const remaining = daysLeft(deadline);
  const isUrgent = remaining <= 7 && remaining >= 0;

  const handleToggleSave = () => {
    Animated.sequence([
      Animated.spring(bookmarkScale, {
        toValue: 1.3,
        speed: 30,
        useNativeDriver: true,
      }),
      Animated.spring(bookmarkScale, {
        toValue: 1,
        speed: 20,
        bounciness: 10,
        useNativeDriver: true,
      }),
    ]).start();
    onToggleSave?.();
  };

  return (
    <Pressable 
      onPress={onPress} 
      style={[
        styles.card, 
        fullWidth && styles.cardFull, 
        compact && styles.cardCompact
      ]}
    >
      <View style={styles.thumbWrap}>
        {coverImageUrl ? (
          <Image
            source={{ uri: coverImageUrl }}
            style={styles.thumb}
            contentFit="cover"
            placeholder="#F1E9FA"
          />
        ) : (
          <View style={[styles.thumb, styles.thumbFallback]}>
            <Text style={styles.thumbFlag}>{countryFlag}</Text>
          </View>
        )}
        
        <View style={styles.flagChip}>
          <Text style={styles.flagChipText}>
            {countryFlag} {countryName}
          </Text>
        </View>

        {isUrgent && (
          <View style={styles.urgentBadge}>
            <Text style={styles.urgentText}>URGENT</Text>
          </View>
        )}
      </View>

      <View style={styles.body}>
        <View style={styles.tagsRow}>
          <Badge label="Gratuit" tone="success" />
          <Badge label={level} tone="primary" />
        </View>

        <Text numberOfLines={2} style={styles.title}>
          {title}
        </Text>
        
        <Text numberOfLines={1} style={styles.organism}>
          Par {organism}
        </Text>

        <View style={styles.footer}>
          <Text
            style={[
              styles.deadline,
              isUrgent && styles.deadlineUrgent,
            ]}
          >
            {remaining >= 0
              ? `Clôture dans ${remaining} j`
              : "Candidatures closes"}
          </Text>

          <Pressable onPress={handleToggleSave} hitSlop={10}>
            <Animated.View style={{ transform: [{ scale: bookmarkScale }] }}>
              <BookmarkIcon filled={isSaved} />
            </Animated.View>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}

function BookmarkIcon({ filled }: { filled: boolean }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24">
      <Path
        d="M6 4h12v17l-6-4-6 4Z"
        stroke={colors.primary}
        strokeWidth={2}
        strokeLinejoin="round"
        fill={filled ? colors.primary : "none"}
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 240,
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    overflow: "hidden",
    ...shadow.card,
  },
  cardFull: {
    width: "100%" as any,
  },
  cardCompact: {
    width: undefined as any,
    flex: 1,
  },
  thumbWrap: {
    height: 130,
    position: "relative",
  },
  thumb: {
    width: "100%",
    height: "100%",
  },
  thumbFallback: {
    backgroundColor: "#F1E9FA",
    alignItems: "center",
    justifyContent: "center",
  },
  thumbFlag: {
    fontSize: 40,
  },
  flagChip: {
    position: "absolute",
    left: 10,
    bottom: 10,
    backgroundColor: "rgba(255,255,255,0.95)",
    borderRadius: radius.pill,
    paddingHorizontal: 10,
    paddingVertical: 4,
    ...shadow.card,
  },
  flagChipText: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 12,
    color: colors.ink,
  },
  urgentBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#FF3B30",
    borderRadius: radius.pill,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  urgentText: {
    fontFamily: fonts.headingBold,
    fontSize: 9,
    color: colors.white,
    letterSpacing: 0.5,
  },
  body: {
    padding: 14,
    gap: 8,
  },
  tagsRow: {
    flexDirection: "row",
    gap: 6,
  },
  title: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 15,
    color: colors.ink,
    lineHeight: 20,
  },
  organism: {
    fontFamily: fonts.body,
    fontSize: 12.5,
    color: colors.inkSoft,
  },
  footer: {
    marginTop: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  deadline: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 12,
    color: colors.primary,
  },
  deadlineUrgent: {
    color: "#FF3B30",
    fontFamily: fonts.headingBold,
  },
});

export default BourseCard;