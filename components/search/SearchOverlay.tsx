import React, { useState, useMemo } from "react";
import { View, Text, TextInput, FlatList, Pressable, StyleSheet, Modal } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";
import { router } from "expo-router";
import { mockBourses } from "@/data/mock-bourses";
import { mockPosts } from "@/data/mock-posts";
import { mockServices } from "@/data/mock-services";
import { colors, fonts, radius, shadow } from "@/lib/theme";

type SearchResult = {
  id: string;
  type: "bourse" | "post" | "service";
  title: string;
  subtitle: string;
};

type SearchOverlayProps = {
  visible: boolean;
  onClose: () => void;
};

export function SearchOverlay({ visible, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");

  const results = useMemo<SearchResult[]>(() => {
    if (query.trim().length < 2) return [];
    const q = query.toLowerCase();
    const items: SearchResult[] = [];

    mockBourses.forEach((b) => {
      if (b.title.toLowerCase().includes(q) || b.countryName.toLowerCase().includes(q) || b.organism.toLowerCase().includes(q)) {
        items.push({ id: b.id, type: "bourse", title: b.title, subtitle: `${b.countryName} · ${b.level}` });
      }
    });

    mockPosts.forEach((p) => {
      if (p.content.toLowerCase().includes(q) || p.authorName.toLowerCase().includes(q)) {
        items.push({ id: p.id, type: "post", title: p.authorName, subtitle: p.content.slice(0, 80) + "..." });
      }
    });

    mockServices.forEach((s) => {
      if (s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)) {
        items.push({ id: s.id, type: "service", title: s.title, subtitle: s.price });
      }
    });

    return items.slice(0, 15);
  }, [query]);

  const handlePress = (item: SearchResult) => {
    onClose();
    setQuery("");
    switch (item.type) {
      case "bourse": router.push(`/bourse/${item.id}` as any); break;
      case "post": router.push(`/posts/${item.id}` as any); break;
      case "service": router.push(`/service/${item.id}` as any); break;
    }
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.searchBar}>
            <SearchIcon />
            <TextInput
              autoFocus
              value={query}
              onChangeText={setQuery}
              placeholder="Rechercher une bourse, un post, un service..."
              placeholderTextColor={colors.inkSoft}
              style={styles.input}
            />
            {query.length > 0 && (
              <Pressable onPress={() => setQuery("")} hitSlop={10}>
                <CloseIcon />
              </Pressable>
            )}
          </View>
          <Pressable onPress={() => { onClose(); setQuery(""); }} style={styles.cancelBtn}>
            <Text style={styles.cancelText}>Annuler</Text>
          </Pressable>
        </View>

        {query.trim().length < 2 ? (
          <View style={styles.hintWrap}>
            <Text style={styles.hintText}>Tape au moins 2 caractères pour lancer la recherche</Text>
          </View>
        ) : results.length === 0 ? (
          <View style={styles.hintWrap}>
            <Text style={styles.hintText}>Aucun résultat pour « {query} »</Text>
          </View>
        ) : (
          <FlatList
            data={results}
            keyExtractor={(item) => `${item.type}-${item.id}`}
            contentContainerStyle={styles.list}
            renderItem={({ item }) => (
              <Pressable style={styles.resultItem} onPress={() => handlePress(item)}>
                <View style={[styles.typeBadge, item.type === "bourse" && styles.badgeBourse, item.type === "post" && styles.badgePost, item.type === "service" && styles.badgeService]}>
                  {item.type === "bourse" ? <CapMiniIcon /> : item.type === "post" ? <PostMiniIcon /> : <BriefcaseMiniIcon />}
                </View>
                <View style={styles.resultText}>
                  <Text numberOfLines={1} style={styles.resultTitle}>{item.title}</Text>
                  <Text numberOfLines={1} style={styles.resultSubtitle}>{item.subtitle}</Text>
                </View>
                <ChevronRight />
              </Pressable>
            )}
          />
        )}
      </View>
    </Modal>
  );
}

function SearchIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Circle cx="11" cy="11" r="6.5" stroke={colors.inkSoft} strokeWidth={2} />
      <Path d="M20 20L16 16" stroke={colors.inkSoft} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}
function CloseIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path d="M18 6L6 18M6 6l12 12" stroke={colors.inkSoft} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}
function ChevronRight() {
  return (
    <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
      <Path d="M9 18l6-6-6-6" stroke={colors.inkSoft} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
function CapMiniIcon() {
  return (
    <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
      <Path d="M12 5 2 9.5 12 14l10-4.5L12 5Z" stroke={colors.white} strokeWidth={2} />
    </Svg>
  );
}
function PostMiniIcon() {
  return (
    <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
      <Path d="M5 5h9l5 5v9H5z" stroke={colors.white} strokeWidth={2} />
    </Svg>
  );
}
function BriefcaseMiniIcon() {
  return (
    <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
      <Path d="M4 9.5h16v9H4zM9 9.5V7a2 2 0 012-2h2a2 2 0 012 2v2.5" stroke={colors.white} strokeWidth={2} />
    </Svg>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, paddingTop: 60 },
  header: { flexDirection: "row", alignItems: "center", paddingHorizontal: 16, gap: 12 },
  searchBar: { flex: 1, flexDirection: "row", alignItems: "center", backgroundColor: colors.surface, borderRadius: radius.pill, paddingHorizontal: 14, paddingVertical: 10, borderWidth: 1, borderColor: colors.border, gap: 8 },
  input: { flex: 1, fontFamily: fonts.body, fontSize: 15, color: colors.ink },
  cancelBtn: { paddingVertical: 8 },
  cancelText: { fontFamily: fonts.bodySemiBold, fontSize: 15, color: colors.primary },
  hintWrap: { flex: 1, alignItems: "center", justifyContent: "center" },
  hintText: { fontFamily: fonts.body, fontSize: 15, color: colors.inkSoft, textAlign: "center", paddingHorizontal: 40 },
  list: { paddingTop: 20, paddingHorizontal: 16, gap: 2 },
  resultItem: { flexDirection: "row", alignItems: "center", paddingVertical: 14, paddingHorizontal: 4, gap: 14, borderBottomWidth: 1, borderBottomColor: colors.border },
  typeBadge: { width: 32, height: 32, borderRadius: 16, alignItems: "center", justifyContent: "center" },
  badgeBourse: { backgroundColor: colors.primary },
  badgePost: { backgroundColor: colors.coral },
  badgeService: { backgroundColor: colors.like },
  resultText: { flex: 1 },
  resultTitle: { fontFamily: fonts.headingSemiBold, fontSize: 14, color: colors.ink },
  resultSubtitle: { fontFamily: fonts.body, fontSize: 12, color: colors.inkSoft, marginTop: 2 },
});
