import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { PostCard } from "@/components/cards/PostCard";
import { mockPosts } from "@/data/mock-posts";
import { colors, fonts, radius } from "@/lib/theme";

import { usePosts } from "@/hooks/usePosts";
// ...

export default function PostsScreen() {
  const [activeFilter, setActiveFilter] = useState("Tous");
  const { data: posts, isLoading, error } = usePosts();

  // Tu pourras filtrer plus tard par catégorie si tu ajoutes un champ
  const filteredPosts = posts; // pour l'instant on affiche tout

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      {/* header + filtres identiques */}

      {isLoading ? (
        <View style={{ padding: 20 }}>
          <Text style={{ color: colors.inkSoft }}>Chargement...</Text>
        </View>
      ) : (
        <FlatList
          data={filteredPosts}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <View style={{ padding: 40, alignItems: "center" }}>
              <Text style={{ color: colors.inkSoft }}>
                {error ?? "Aucune publication pour le moment"}
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <PostCard
              authorName={item.author?.name ?? "Admin"}
              authorAvatarUri={item.author?.avatar_url ?? undefined}
              isVerified={true}
              timeAgo={item.published_at ?? item.created_at}
              content={item.content}
              imageUri={item.cover_image_url ?? undefined}
              videoUri={item.video_url ?? undefined}
              likeCount={item.likes_count ?? 0}
              commentCount={item.comments_count ?? 0}
              onPressComment={() => router.push(`/posts/${item.slug}`)}
            />
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
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  title: {
    fontFamily: fonts.headingBold,
    fontSize: 24,
    color: colors.ink,
  },
  subtitle: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    color: colors.inkSoft,
    marginTop: 4,
  },
  filtersWrapper: {
    marginBottom: 12,
  },
  filters: {
    paddingHorizontal: 20,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
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
  chipText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 13,
    color: colors.inkSoft,
  },
  chipTextActive: {
    color: colors.white,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 120,
    gap: 16,
  },
});
