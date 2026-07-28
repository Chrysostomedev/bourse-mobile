import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  Linking,
  StyleSheet,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Svg, { Path } from "react-native-svg";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { StatusScreen } from "@/components/ui/status-screen";
import { useScholarship } from "@/hooks/useScholarship";
import { colors, fonts, radius, shadow } from "@/lib/theme";

export default function BourseDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const slug = Array.isArray(id) ? id[0] : id;

  const { data: bourse, status, refetch } = useScholarship(slug);
  const [isSaved, setIsSaved] = useState(false);

  if (status === "notFound") {
    return (
      <StatusScreen
        code={404}
        title="Cette bourse n'existe plus"
        description="Elle a peut-être été retirée ou le lien est incorrect."
        onPressAction={() => router.back()}
        actionLabel="Revenir en arrière"
      />
    );
  }

  if (status === "error") {
    return (
      <StatusScreen
        code={500}
        onPressAction={refetch}
        actionLabel="Réessayer"
      />
    );
  }

  if (status === "loading" || !bourse) {
    return <DetailSkeleton />;
  }

  // Prochaine intake (période de candidature)
  const nextIntake = bourse.intakes
    ?.filter((i) => i.period_end && new Date(i.period_end) > new Date())
    ?.sort((a, b) => new Date(a.period_end!).getTime() - new Date(b.period_end!).getTime())[0];

  const daysRemaining = nextIntake?.period_end
    ? Math.ceil(
        (new Date(nextIntake.period_end).getTime() - Date.now()) /
          (1000 * 60 * 60 * 24)
      )
    : null;

  // advantages peut être string ou array selon la base
  const advantagesList: string[] = Array.isArray(bourse.advantages)
    ? bourse.advantages
    : typeof bourse.advantages === "string" && bourse.advantages.trim()
    ? bourse.advantages.split("\n").filter(Boolean)
    : [];

  const levelLabel =
    bourse.study_levels?.[0]?.name ?? "Tous niveaux";

  const typeLabel =
    bourse.scholarship_type?.name ?? bourse.funding_type ?? "Bourse";

  const handleOpenLink = () => {
    if (bourse.official_link) Linking.openURL(bourse.official_link);
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.topBar}>
          <Pressable onPress={() => router.back()} style={styles.roundButton}>
            <BackIcon />
          </Pressable>
          <Pressable
            onPress={() => setIsSaved((v) => !v)}
            style={styles.roundButton}
          >
            <BookmarkIcon filled={isSaved} />
          </Pressable>
        </View>

        <View style={styles.flagBanner}>
          <Text style={styles.flagEmoji}>
            {bourse.country?.flag_emoji ?? "🌍"}
          </Text>
        </View>

        <View style={styles.content}>
          <View style={styles.tagsRow}>
            <Badge label="Gratuit" tone="success" />
            <Badge label={levelLabel} tone="primary" />
            <Badge label={typeLabel} tone="neutral" />
          </View>

          <Text style={styles.title}>{bourse.title}</Text>
          <Text style={styles.organism}>{bourse.organism_name}</Text>

          {/* Période de candidature */}
          {nextIntake && (
            <View style={styles.deadlineCard}>
              <Text style={styles.deadlineLabel}>Période de candidature</Text>
              <Text style={styles.deadlineDates}>
                {formatDate(nextIntake.period_start)} →{" "}
                {formatDate(nextIntake.period_end)}
              </Text>
              {daysRemaining !== null && (
                <Text
                  style={[
                    styles.deadlineCountdown,
                    daysRemaining <= 7 && { color: colors.alert },
                  ]}
                >
                  {daysRemaining >= 0
                    ? `Clôture dans ${daysRemaining} jours`
                    : "Candidatures closes"}
                </Text>
              )}
            </View>
          )}

          {/* Filières */}
          {bourse.fields_of_study?.length > 0 && (
            <Section title="Filières concernées">
              <View style={styles.chipsWrap}>
                {bourse.fields_of_study.map((field) => (
                  <Badge key={field.id} label={field.name} tone="primary" />
                ))}
              </View>
            </Section>
          )}

          {bourse.objective && (
            <Section title="Objectif">
              <Text style={styles.paragraph}>{bourse.objective}</Text>
            </Section>
          )}

          {bourse.conditions && (
            <Section title="Conditions">
              <Text style={styles.paragraph}>{bourse.conditions}</Text>
            </Section>
          )}

          {advantagesList.length > 0 && (
            <Section title="Avantages">
              <View style={{ gap: 8 }}>
                {advantagesList.map((advantage, idx) => (
                  <View key={idx} style={styles.bulletRow}>
                    <View style={styles.bulletDot} />
                    <Text style={styles.paragraph}>{advantage}</Text>
                  </View>
                ))}
              </View>
            </Section>
          )}

          {bourse.additional_info && (
            <Section title="Infos complémentaires">
              <Text style={styles.paragraph}>
                {typeof bourse.additional_info === "string"
                  ? bourse.additional_info
                  : JSON.stringify(bourse.additional_info)}
              </Text>
            </Section>
          )}
        </View>
      </ScrollView>

      <View style={styles.stickyFooter}>
        <Button
          label={
            bourse.official_link
              ? "Voir les détails officiels"
              : "Lien indisponible"
          }
          onPress={handleOpenLink}
          disabled={!bourse.official_link}
          fullWidth
        />
      </View>
    </View>
  );
}

/* --- sous-composants identiques à avant --- */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function DetailSkeleton() {
  return (
    <View style={[styles.screen, { padding: 20, gap: 16 }]}>
      <Skeleton height={160} borderRadius={radius.card} />
      <Skeleton width="80%" height={22} />
      <Skeleton width="50%" height={16} />
      <Skeleton height={80} borderRadius={radius.card} />
      <Skeleton height={80} borderRadius={radius.card} />
      <Skeleton height={80} borderRadius={radius.card} />
    </View>
  );
}

function BackIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15 5 8 12l7 7"
        stroke={colors.ink}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function BookmarkIcon({ filled }: { filled: boolean }) {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24">
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

function formatDate(iso: string | null | undefined) {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short" });
}

// garde tes styles existants
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 110,
  },
  topBar: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    zIndex: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  roundButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: "rgba(255,255,255,0.9)",
    alignItems: "center",
    justifyContent: "center",
    ...shadow.card,
  },
  flagBanner: {
    height: 160,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  flagEmoji: {
    fontSize: 56,
  },
  content: {
    padding: 20,
    gap: 16,
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  title: {
    fontFamily: fonts.headingBold,
    fontSize: 21,
    color: colors.ink,
    lineHeight: 27,
  },
  organism: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.inkSoft,
  },
  deadlineCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: 16,
    gap: 4,
    ...shadow.card,
  },
  deadlineLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    color: colors.inkSoft,
  },
  deadlineDates: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 15,
    color: colors.ink,
  },
  deadlineCountdown: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 13,
    color: colors.primary,
    marginTop: 2,
  },
  chipsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
  },
  section: {
    gap: 8,
  },
  sectionTitle: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 15.5,
    color: colors.ink,
  },
  paragraph: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: 13.5,
    lineHeight: 20,
    color: colors.inkSoft,
  },
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  bulletDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.coral,
    marginTop: 7,
  },
  stickyFooter: {
    position: "absolute",
    left: 20,
    right: 20,
    bottom: 24,
    backgroundColor: colors.background,
  },
});