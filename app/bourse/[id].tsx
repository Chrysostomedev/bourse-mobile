import React, { useEffect, useState } from "react";
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
import { getBourseById, Bourse } from "@/data/mock-bourses";
import { colors, fonts, radius, shadow } from "@/lib/theme";

export default function BourseDetailScreen() {
  // -----------------------------------------------------------------
  // useLocalSearchParams() lit le segment dynamique [id] de l'URL.
  // Expo Router type ça en `string | string[]`, d'où le petit garde-fou
  // ci-dessous (utile si jamais le paramètre arrive en tableau).
  // -----------------------------------------------------------------
  const { id } = useLocalSearchParams<{ id: string }>();
  const bourseId = Array.isArray(id) ? id[0] : id;

  // "status" représente les différents états possibles de l'écran :
  // - "loading"  : en train de charger (skeleton affiché)
  // - "ready"    : données chargées avec succès
  // - "notFound" : id inconnu → réutilise StatusScreen code={404}
  // - "error"    : panne serveur → StatusScreen code={500} (exemple)
  const [status, setStatus] = useState<"loading" | "ready" | "notFound" | "error">(
    "loading"
  );
  const [bourse, setBourse] = useState<Bourse | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (!bourseId) {
      setStatus("notFound");
      return;
    }

    // Ici on simule un fetch avec un petit délai. Dans la vraie appli :
    //   try {
    //     const data = await bourseService.getById(bourseId);
    //     setBourse(data);
    //     setStatus("ready");
    //   } catch (err) {
    //     // Si l'API renvoie 401/500/503, on peut directement mapper
    //     // le code HTTP reçu sur <StatusScreen code={...} /> — pas besoin
    //     // de créer un écran par code d'erreur, StatusScreen gère les 4.
    //     setStatus("error");
    //   }
    const timeout = setTimeout(() => {
      const found = getBourseById(bourseId);
      if (found) {
        setBourse(found);
        setStatus("ready");
      } else {
        // Aucune bourse ne correspond à cet id : on retombe sur le
        // même écran 404 que app/+not-found.tsx, pour rester cohérent.
        setStatus("notFound");
      }
    }, 500);

    return () => clearTimeout(timeout);
  }, [bourseId]);

  // ---------- État : identifiant invalide / bourse introuvable ----------
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

  // ---------- État : erreur serveur (exemple d'utilisation du code 500) ----------
  if (status === "error") {
    return <StatusScreen code={500} onPressAction={() => setStatus("loading")} />;
  }

  // ---------- État : chargement ----------
  if (status === "loading" || !bourse) {
    return <DetailSkeleton />;
  }

  // Nombre de jours restants avant la clôture — même logique que sur
  // BourseCard, dupliquée volontairement ici (petit calcul, pas besoin
  // d'un hook partagé pour si peu ; à extraire dans lib/dates.ts si ça
  // se répète ailleurs).
  const daysRemaining = Math.ceil(
    (new Date(bourse.applicationEnd).getTime() - Date.now()) /
      (1000 * 60 * 60 * 24)
  );

  const handleOpenLink = () => {
    if (bourse.link) Linking.openURL(bourse.link);
  };

  return (
    <View style={styles.screen}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ---------- Bandeau supérieur : retour + favoris ---------- */}
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

        {/* ---------- Bloc pays / drapeau ---------- */}
        <View style={styles.flagBanner}>
          <Text style={styles.flagEmoji}>{bourse.countryFlag}</Text>
        </View>

        <View style={styles.content}>
          {/* ---------- Tags (niveau, type, gratuité) ---------- */}
          <View style={styles.tagsRow}>
            <Badge label="Gratuit" tone="success" />
            <Badge label={bourse.level} tone="primary" />
            <Badge label={bourse.type} tone="neutral" />
          </View>

          <Text style={styles.title}>{bourse.title}</Text>
          <Text style={styles.organism}>{bourse.organism}</Text>

          {/* ---------- Carte échéance : période de candidature ---------- */}
          <View style={styles.deadlineCard}>
            <Text style={styles.deadlineLabel}>Période de candidature</Text>
            <Text style={styles.deadlineDates}>
              {formatDate(bourse.applicationStart)} → {formatDate(bourse.applicationEnd)}
            </Text>
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
          </View>

          {/* ---------- Filières concernées ---------- */}
          <Section title="Filières concernées">
            <View style={styles.chipsWrap}>
              {bourse.fields.map((field) => (
                <Badge key={field} label={field} tone="primary" />
              ))}
            </View>
          </Section>

          {/* ---------- Objectif de la bourse ---------- */}
          <Section title="Objectif">
            <Text style={styles.paragraph}>{bourse.objective}</Text>
          </Section>

          {/* ---------- Conditions d'éligibilité ---------- */}
          <Section title="Conditions">
            <Text style={styles.paragraph}>{bourse.conditions}</Text>
          </Section>

          {/* ---------- Avantages, sous forme de liste à puces ---------- */}
          <Section title="Avantages">
            <View style={{ gap: 8 }}>
              {bourse.advantages.map((advantage) => (
                <View key={advantage} style={styles.bulletRow}>
                  <View style={styles.bulletDot} />
                  <Text style={styles.paragraph}>{advantage}</Text>
                </View>
              ))}
            </View>
          </Section>

          {/* ---------- Infos complémentaires (optionnel) ---------- */}
          {bourse.additionalInfo && (
            <Section title="Infos complémentaires">
              <Text style={styles.paragraph}>{bourse.additionalInfo}</Text>
            </Section>
          )}
        </View>
      </ScrollView>

      {/* ---------- CTA fixe en bas d'écran (au-dessus du scroll) ---------- */}
      <View style={styles.stickyFooter}>
        <Button
          label={bourse.link ? "Voir les détails officiels" : "Lien indisponible"}
          onPress={handleOpenLink}
          disabled={!bourse.link}
          fullWidth
        />
      </View>
    </View>
  );
}

/* ---------- Petits sous-composants locaux, propres à cet écran ---------- */

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

// Format simple JJ/MM/AAAA — suffisant ici ; passer par une lib type
// dayjs si le formatage doit gérer plusieurs langues plus tard.
function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short" });
}

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