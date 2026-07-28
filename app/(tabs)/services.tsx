import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Path, Circle, Rect } from "react-native-svg";
import { useServices } from "@/hooks/useServices";
import type { Service } from "@/types/service.types";
import { colors, fonts, radius, shadow } from "@/lib/theme";

const CATEGORIES = [
  { id: "tous", label: "Tout" },
  { id: "coaching", label: "Coaching" },
  { id: "formation", label: "Formations" },
  { id: "dossier", label: "Dossiers" },   // aligné avec le backend
  // tu pourras rajouter ebook / produit plus tard si le backend les supporte
];

// Mapping kind → icône (pour ne pas casser ServiceCard)
const KIND_ICON: Record<string, string> = {
  coaching: "briefcase",
  formation: "video",
  dossier: "document",
  ebook: "book",
  produit: "briefcase",
};

function mapService(raw: Service): Service {
  return {
    ...raw,
    category: raw.kind,
    icon: KIND_ICON[raw.kind] ?? "briefcase",
    popular: false,                         // le backend n’a pas ce champ pour l’instant
    priceTag: null,
    // price reste tel quel (number ou string)
  };
}

export default function ServicesScreen() {
  const [activeCategory, setActiveCategory] = useState("tous");

  // On charge tout, on filtre côté client pour rester simple
  // (tu pourras plus tard passer kind= à l’API via refetch)
  const { data: rawServices, isLoading, error } = useServices();

  const services = useMemo(
    () => rawServices.map(mapService),
    [rawServices]
  );

  const filteredServices = useMemo(() => {
    if (activeCategory === "tous") return services;
    return services.filter((s) => s.category === activeCategory || s.kind === activeCategory);
  }, [services, activeCategory]);

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Services Premium</Text>
        <Text style={styles.headerSubtitle}>Mets toutes les chances de ton côté</Text>
      </View>

      <View style={styles.filtersWrapper}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filters}
        >
          {CATEGORIES.map((cat) => (
            <Pressable
              key={cat.id}
              style={[
                styles.filterChip,
                activeCategory === cat.id && styles.filterChipActive,
              ]}
              onPress={() => setActiveCategory(cat.id)}
            >
              <Text
                style={[
                  styles.filterLabel,
                  activeCategory === cat.id && styles.filterLabelActive,
                ]}
              >
                {cat.label}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {isLoading ? (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
          <View style={styles.list}>
            {filteredServices.length === 0 ? (
              <View style={{ padding: 40, alignItems: "center" }}>
                <Text style={{ fontFamily: fonts.body, color: colors.inkSoft, textAlign: "center" }}>
                  {error ?? "Aucun service disponible pour le moment"}
                </Text>
              </View>
            ) : (
              filteredServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))
            )}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const handlePress = () => {
    router.push(`/service/${service.id}` as any);
  };

  // Formatage du prix
  const priceLabel =
    service.price == null
      ? "Sur devis"
      : typeof service.price === "number"
      ? `${service.price.toLocaleString("fr-FR")} FCFA`
      : String(service.price);

  return (
    <Pressable onPress={handlePress} style={styles.card}>
      <LinearGradient
        colors={
          service.popular
            ? [colors.primary, colors.coral]
            : [colors.surface, colors.surface]
        }
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.cardBg, !service.popular && styles.cardBgRegular]}
      >
        <View style={styles.cardHeader}>
          <View style={styles.iconWrap}>
            <ServiceIcon name={service.icon ?? "briefcase"} />
          </View>
          {service.priceTag && (
            <View style={styles.tag}>
              <Text style={styles.tagText}>{service.priceTag}</Text>
            </View>
          )}
          {service.popular && !service.priceTag && (
            <View style={styles.tag}>
              <Text style={styles.tagText}>Populaire</Text>
            </View>
          )}
        </View>

        <View style={styles.cardBody}>
          <Text style={[styles.title, service.popular && { color: colors.white }]}>
            {service.title}
          </Text>
          <Text
            style={[
              styles.description,
              service.popular && { color: "rgba(255,255,255,0.8)" },
            ]}
          >
            {service.description}
          </Text>
        </View>

        <View style={styles.cardFooter}>
          <Text style={[styles.price, service.popular && { color: colors.white }]}>
            {priceLabel}
          </Text>
          <View style={[styles.btn, service.popular && styles.btnPopular]}>
            <Text style={[styles.btnText, service.popular && styles.btnTextPopular]}>
              Découvrir
            </Text>
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  );
}

// ---- ServiceIcon reste identique à ton code actuel ----
function ServiceIcon({ name }: { name: string }) {
  const c = colors.primary;
  switch (name) {
    case "briefcase":
      return (
        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
          <Rect x="2" y="7" width="20" height="14" rx="2" stroke={c} strokeWidth={2} />
          <Path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" stroke={c} strokeWidth={2} />
        </Svg>
      );
    case "video":
      return (
        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
          <Rect x="2" y="6" width="14" height="12" rx="2" stroke={c} strokeWidth={2} />
          <Path d="M22 8l-6 3v2l6 3V8z" stroke={c} strokeWidth={2} strokeLinejoin="round" />
        </Svg>
      );
    case "book":
      return (
        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
          <Path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2V3z" stroke={c} strokeWidth={2} />
          <Path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7V3z" stroke={c} strokeWidth={2} />
        </Svg>
      );
    case "document":
      return (
        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
          <Path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke={c} strokeWidth={2} />
          <Path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke={c} strokeWidth={2} strokeLinecap="round" />
        </Svg>
      );
    default:
      return (
        <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
          <Circle cx="12" cy="12" r="10" stroke={c} strokeWidth={2} />
          <Path d="M12 8v4l3 3" stroke={c} strokeWidth={2} strokeLinecap="round" />
        </Svg>
      );
  }
}

// ---- garde tous tes styles existants ----
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  header: { paddingHorizontal: 20, paddingTop: 16, paddingBottom: 20 },
  headerTitle: { fontFamily: fonts.headingBold, fontSize: 24, color: colors.ink, marginBottom: 4 },
  headerSubtitle: { fontFamily: fonts.body, fontSize: 15, color: colors.inkSoft },
  filtersWrapper: { paddingBottom: 16 },
  filters: { paddingHorizontal: 20, gap: 10 },
  filterChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: radius.pill, backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  filterChipActive: { backgroundColor: colors.ink, borderColor: colors.ink },
  filterLabel: { fontFamily: fonts.bodySemiBold, fontSize: 13, color: colors.inkSoft },
  filterLabelActive: { color: colors.white },
  content: { paddingBottom: 120 },
  list: { paddingHorizontal: 20, gap: 16 },
  card: { borderRadius: radius.card, ...shadow.card, backgroundColor: colors.surface },
  cardBg: { borderRadius: radius.card, padding: 20 },
  cardBgRegular: { backgroundColor: colors.surface },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 },
  iconWrap: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.white, alignItems: "center", justifyContent: "center", ...shadow.card },
  icon: { fontSize: 20 },
  tag: { backgroundColor: "rgba(255,255,255,0.25)", paddingHorizontal: 10, paddingVertical: 4, borderRadius: radius.pill },
  tagText: { fontFamily: fonts.headingSemiBold, fontSize: 11, color: colors.white, textTransform: "uppercase" },
  cardBody: { gap: 6, marginBottom: 20 },
  title: { fontFamily: fonts.headingBold, fontSize: 18, color: colors.ink },
  description: { fontFamily: fonts.body, fontSize: 14, color: colors.inkSoft, lineHeight: 20 },
  cardFooter: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  price: { fontFamily: fonts.headingBold, fontSize: 16, color: colors.ink },
  btn: { backgroundColor: colors.primary, paddingHorizontal: 20, paddingVertical: 10, borderRadius: radius.pill },
  btnText: { fontFamily: fonts.headingSemiBold, fontSize: 14, color: colors.white },
  btnPopular: { backgroundColor: colors.white },
  btnTextPopular: { color: colors.primary },
});
