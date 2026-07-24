import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, StyleSheet, Pressable, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router, useLocalSearchParams } from "expo-router";
import Svg, { Path } from "react-native-svg";
import { PostCard } from "@/components/cards/PostCard";
import { Avatar } from "@/components/ui/avatar";
import { getPostById, Post } from "@/data/mock-posts";
import { StatusScreen } from "@/components/ui/status-screen";
import { colors, fonts, radius } from "@/lib/theme";

export default function PostDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const postId = Array.isArray(id) ? id[0] : id;

  const [post, setPost] = useState<Post | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "notFound">("loading");
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    if (!postId) {
      setStatus("notFound");
      return;
    }

    const found = getPostById(postId);
    if (found) {
      setPost(found);
      setStatus("ready");
    } else {
      setStatus("notFound");
    }
  }, [postId]);

  if (status === "notFound" || (!post && status !== "loading")) {
    return (
      <StatusScreen
        code={404}
        title="Post introuvable"
        description="Ce post a peut-être été supprimé."
        actionLabel="Retour"
        onPressAction={() => router.back()}
      />
    );
  }

  if (status === "loading") {
    return <View style={styles.screen} />; // On pourrait mettre un skeleton ici
  }

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <BackIcon />
        </Pressable>
        <Text style={styles.headerTitle}>Post</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <PostCard {...post!} />
        
        <View style={styles.commentsSection}>
          <Text style={styles.commentsTitle}>Commentaires ({post?.comments?.length || 0})</Text>
          
          {post?.comments?.map((comment) => (
            <View key={comment.id} style={styles.commentRow}>
              <Avatar fallback={comment.authorName} size="sm" />
              <View style={styles.commentBubble}>
                <View style={styles.commentHeader}>
                  <Text style={styles.commentAuthor}>{comment.authorName}</Text>
                  <Text style={styles.commentTime}>{comment.timeAgo}</Text>
                </View>
                <Text style={styles.commentText}>{comment.content}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.inputArea}>
        <Avatar fallback="Moi" size="sm" />
        <TextInput
          style={styles.input}
          placeholder="Ajouter un commentaire..."
          placeholderTextColor={colors.inkSoft}
          value={commentText}
          onChangeText={setCommentText}
        />
        <Pressable style={styles.sendButton} disabled={!commentText.trim()}>
          <Text style={[styles.sendText, !commentText.trim() && { color: colors.inkSoft }]}>Envoyer</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function BackIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M15 18l-6-6 6-6" stroke={colors.ink} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.surface,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 16,
    color: colors.ink,
  },
  content: {
    padding: 20,
    gap: 24,
  },
  commentsSection: {
    gap: 16,
  },
  commentsTitle: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 16,
    color: colors.ink,
  },
  commentRow: {
    flexDirection: "row",
    gap: 12,
  },
  commentBubble: {
    flex: 1,
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: radius.card,
    borderTopLeftRadius: 4,
  },
  commentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  commentAuthor: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 13,
    color: colors.ink,
  },
  commentTime: {
    fontFamily: fonts.body,
    fontSize: 11,
    color: colors.inkSoft,
  },
  commentText: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.ink,
    lineHeight: 20,
  },
  inputArea: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: 12,
  },
  input: {
    flex: 1,
    height: 40,
    backgroundColor: colors.background,
    borderRadius: radius.pill,
    paddingHorizontal: 16,
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.ink,
  },
  sendButton: {
    padding: 8,
  },
  sendText: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 14,
    color: colors.primary,
  }
});
