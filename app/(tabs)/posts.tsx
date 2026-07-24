import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { PostCard } from "@/components/cards/PostCard";
import { mockPosts } from "@/data/mock-posts";
import { colors, fonts, radius } from "@/lib/theme";

const FILTERS = ["Tous", "Bourses", "Conseils", "Témoignages"];

export default function PostsScreen() {
  const [activeFilter, setActiveFilter] = useState("Tous");

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Communauté</Text>
          <Text style={styles.subtitle}>12 847 membres</Text>
        </View>
      </View>

      <View style={styles.filtersWrapper}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={FILTERS}
          keyExtractor={(item) => item}
          contentContainerStyle={styles.filters}
          renderItem={({ item }) => (
            <Pressable
              style={[
                styles.chip,
                activeFilter === item && styles.chipActive
              ]}
              onPress={() => setActiveFilter(item)}
            >
              <Text style={[
                styles.chipText,
                activeFilter === item && styles.chipTextActive
              ]}>{item}</Text>
            </Pressable>
          )}
        />
      </View>

      <FlatList
        data={mockPosts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <PostCard
            authorName={item.authorName}
            authorAvatarUri={item.authorAvatarUri}
            isVerified={item.isVerified}
            timeAgo={item.timeAgo}
            content={item.content}
            imageUri={item.imageUri}
            videoUri={item.videoUri}
            likeCount={item.likeCount}
            commentCount={item.commentCount}
            onPressComment={() => router.push(`/posts/${item.id}`)}
          />
        )}
      />
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
