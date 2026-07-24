import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Svg, { Circle, Path } from "react-native-svg";
import { BourseCard } from "@/components/cards/BourseCard";
import { BourseCardSkeleton } from "@/components/ui/skeleton";
import { mockBourses, Bourse } from "@/data/mock-bourses";
import { colors, fonts, radius } from "@/lib/theme";

const LEVEL_FILTERS = ["Tous", "Licence", "Master", "Doctorat"] as const;
type LevelFilter = (typeof LEVEL_FILTERS)[number];

export default function BoursesScreen() {
  const [query, setQuery] = useState("");
  const [activeLevel, setActiveLevel] = useState<LevelFilter>("Tous");
  const [isLoading, setIsLoading] = useState(true);
  const [bourses, setBourses] = useState<Bourse[]>([]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setBourses(mockBourses);
      setIsLoading(false);
    }, 900);
    return () => clearTimeout(timeout);
  }, []);

  const filteredBourses = useMemo(() => {
    return bourses.filter((bourse) => {
      const matchesQuery =
        query.trim().length === 0 ||
        bourse.title.toLowerCase().includes(query.toLowerCase()) ||
        bourse.organism.toLowerCase().includes(query.toLowerCase()) ||
        bourse.countryName.toLowerCase().includes(query.toLowerCase());
      const matchesLevel =
        activeLevel === "Tous" || bourse.level === activeLevel;
      return matchesQuery && matchesLevel;
    });
  }, [bourses, query, activeLevel]);

  // Pair up items for 2-column grid
  const pairedBourses = useMemo(() => {
    const pairs: (Bourse[])[] = [];
    for (let i = 0; i < filteredBourses.length; i += 2) {
      pairs.push(filteredBourses.slice(i, i + 2));
    }
    return pairs;
  }, [filteredBourses]);

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.pageTitle}>Bourses</Text>

        <View style={styles.searchBar}>
          <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
            <Circle cx="11" cy="11" r="6.5" stroke={colors.inkSoft} strokeWidth={2} />
            <Path d="M20 20L16 16" stroke={colors.inkSoft} strokeWidth={2} strokeLinecap="round" />
          </Svg>
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Rechercher un pays, un organisme..."
            placeholderTextColor={colors.inkSoft}
            style={styles.searchInput}
          />
        </View>

        <FlatList
          horizontal
          data={LEVEL_FILTERS}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersRow}
          renderItem={({ item }) => {
            const isActive = item === activeLevel;
            return (
              <Pressable
                onPress={() => setActiveLevel(item)}
                style={[styles.chip, isActive && styles.chipActive]}
              >
                <Text style={[styles.chipLabel, isActive && styles.chipLabelActive]}>
                  {item}
                </Text>
              </Pressable>
            );
          }}
        />
      </View>

      {isLoading ? (
        <View style={styles.list}>
          <View style={styles.gridRow}>
            <BourseCardSkeleton />
            <BourseCardSkeleton />
          </View>
          <View style={styles.gridRow}>
            <BourseCardSkeleton />
            <BourseCardSkeleton />
          </View>
        </View>
      ) : (
        <FlatList
          data={pairedBourses}
          keyExtractor={(_, index) => `row-${index}`}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>Aucune bourse trouvée</Text>
              <Text style={styles.emptyText}>
                Essaie un autre mot-clé ou change de filtre de niveau.
              </Text>
            </View>
          }
          renderItem={({ item: pair }) => (
            <View style={styles.gridRow}>
              {pair.map((bourse) => (
                <BourseCard
                  key={bourse.id}
                  compact
                  title={bourse.title}
                  organism={bourse.organism}
                  countryFlag={bourse.countryFlag}
                  countryName={bourse.countryName}
                  level={bourse.level}
                  deadline={new Date(bourse.applicationEnd)}
                  onPress={() => router.push(`/bourse/${bourse.id}`)}
                />
              ))}
              {pair.length === 1 && <View style={{ flex: 1 }} />}
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingTop: 8,
    paddingHorizontal: 20,
    gap: 14,
  },
  pageTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 24,
    color: colors.ink,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.surface,
    borderRadius: radius.pill,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  searchInput: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.ink,
  },
  filtersRow: {
    gap: 8,
    paddingBottom: 4,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipLabel: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 12.5,
    color: colors.inkSoft,
  },
  chipLabelActive: {
    color: colors.white,
  },
  list: {
    padding: 20,
    gap: 14,
    paddingBottom: 130,
  },
  gridRow: {
    flexDirection: "row",
    gap: 12,
  },
  emptyState: {
    alignItems: "center",
    paddingTop: 60,
    gap: 6,
  },
  emptyTitle: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 15,
    color: colors.ink,
  },
  emptyText: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.inkSoft,
    textAlign: "center",
    maxWidth: 240,
  },
});