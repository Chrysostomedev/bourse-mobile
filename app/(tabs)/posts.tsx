import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { PostCard } from "@/components/cards/PostCard";
import { usePosts } from "@/hooks/usePosts";
import { colors, fonts, radius } from "@/lib/theme";
import Svg, { Path, Circle } from "react-native-svg";

export default function PostsScreen() {
  const [activeFilter, setActiveFilter] = useState("Tous");
  const { data: posts, isLoading, error } = usePosts();

  const filters = ["Tous", "Actualités", "Conseils", "Témoignages"];

  const handleToggleLike = async (postId: number, isLiked: boolean) => {
    // L'appel API se fait dans le hook useLikes du PostCard
    // Cette fonction est juste un placeholder pour les logs
    console.log(`🔥 Post ${postId} liked: ${isLiked}`);
  };

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Publications</Text>
          <Text style={styles.subtitle}>
            {posts.length} publication{posts.length > 1 ? "s" : ""}
          </Text>
        </View>
        <Pressable
          onPress={() => router.push("/notifications")}
          hitSlop={8}
        >
          <BellIcon />
        </Pressable>
      </View>

      {/* Filters */}
      <View style={styles.filtersWrapper}>
        <FlatList
          horizontal
          data={filters}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.filters}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => setActiveFilter(item)}
              style={[
                styles.chip,
                activeFilter === item && styles.chipActive,
              ]}
            >
              <Text
                style={[
                  styles.chipText,
                  activeFilter === item && styles.chipTextActive,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          )}
        />
      </View>

      {/* Posts List */}
      {isLoading ? (
        <View style={{ padding: 20 }}>
          <Text style={{ color: colors.inkSoft }}>Chargement des publications...</Text>
        </View>
      ) : (
        <FlatList
          data={posts}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.list}
          scrollEnabled={true}
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
              id={item.id}
              slug={item.slug}
              authorName={item.author?.name ?? "Admin"}
              authorAvatarUri={item.author?.avatar_url ?? undefined}
              isVerified={item.author?.role === "admin" || item.author?.role === "rédacteur"}
              timeAgo={item.published_at ?? item.created_at}
              content={item.content}
              imageUri={item.cover_image_url ?? undefined}
              videoUri={item.video_url ?? undefined}
              likeCount={item.likes_count ?? 0}
              commentCount={item.comments_count ?? 0}
              isLiked={item.is_liked ?? false}
              onToggleLike={handleToggleLike}
              onPressComment={() => router.push(`/posts/${item.slug}`)}
              onPressShare={() => {
                console.log("📤 Share post:", item.slug);
              }}
              onPressAuthor={() => {
                console.log("👤 Author:", item.author?.id);
              }}
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

function BellIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18 8a6 6 0 0 0-6-6 6 6 0 0 0-6 6c0 7-3 9-3 9h18s-3-2-3-9"
        stroke={colors.ink}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M13.73 21a2 2 0 0 1-3.46 0"
        stroke={colors.ink}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  title: {
    fontFamily: fonts.headingBold,
    fontSize: 28,
    color: colors.ink,
  },
  subtitle: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    color: colors.inkSoft,
    marginTop: 2,
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
