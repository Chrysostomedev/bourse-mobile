import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  TextInput,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Image } from "expo-image";
import { VideoView, useVideoPlayer } from "expo-video";
import Svg, { Path } from "react-native-svg";

import { usePostBySlug } from "@/hooks/usePosts";
import { useComments } from "@/hooks/useComments";
import { useLikes } from "@/hooks/useLikes";
import { CommentCard } from "@/components/cards/CommentCard";
import { Avatar } from "@/components/ui/avatar";
import { colors, fonts, radius, shadow } from "@/lib/theme";
import { useAuth } from "@/hooks/useAuth";

export default function PostDetailScreen() {
  const router = useRouter();
  const { slug } = useLocalSearchParams();
  const { user } = useAuth();

  const { data: post, isLoading: postLoading } = usePostBySlug(
    typeof slug === "string" ? slug : ""
  );
  const { comments, isLoading: commentsLoading, addComment, deleteComment } =
    useComments(post?.id ?? 0);
  const { isLiked, likesCount, toggleLike, isLoading: likeLoading } = useLikes(
    post?.id ?? 0,
    post?.is_liked ?? false,
    post?.likes_count ?? 0
  );

  const [commentText, setCommentText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (postLoading) {
    return (
      <SafeAreaView style={styles.screen} edges={["top"]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </SafeAreaView>
    );
  }

  if (!post) {
    return (
      <SafeAreaView style={styles.screen} edges={["top"]}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Post non trouvé</Text>
          <Pressable
            style={styles.button}
            onPress={() => router.back()}
          >
            <Text style={styles.buttonText}>Retour</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const handleAddComment = async () => {
    if (!commentText.trim()) {
      Alert.alert("Erreur", "Veuillez entrer un commentaire");
      return;
    }

    try {
      setIsSubmitting(true);
      await addComment(commentText);
      setCommentText("");
      Alert.alert("Succès", "Commentaire ajouté");
    } catch (err: any) {
      Alert.alert("Erreur", err.errorMessage ?? "Impossible d'ajouter le commentaire");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLike = async () => {
    try {
      await toggleLike(post.id);
    } catch (err: any) {
      Alert.alert("Erreur", err.errorMessage ?? "Impossible de liker le post");
    }
  };

  const handleDeleteComment = (commentId: number) => async () => {
    try {
      await deleteComment(commentId);
      Alert.alert("Succès", "Commentaire supprimé");
    } catch (err: any) {
      Alert.alert("Erreur", err.errorMessage ?? "Impossible de supprimer le commentaire");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={styles.screen}
    >
      <SafeAreaView style={styles.screen} edges={["top"]}>
        {/* ── Header ── */}
        <View style={styles.header}>
          <Pressable onPress={() => router.back()}>
            <BackIcon />
          </Pressable>
          <Text style={styles.headerTitle}>Post</Text>
          <View style={{ width: 24 }} />
        </View>

        <FlatList
          data={comments}
          keyExtractor={(item) => String(item.id)}
          contentContainerStyle={styles.content}
          ListHeaderComponent={
            <>
              {/* ── Post Info ── */}
              <View style={styles.postHeader}>
                <Avatar
                  uri={post.author?.avatar_url}
                  fallback={post.author?.name ?? "User"}
                  size="md"
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.authorName}>{post.author?.name}</Text>
                  <Text style={styles.timestamp}>{post.published_at}</Text>
                </View>
              </View>

              {/* ── Post Content ── */}
              <Text style={styles.postTitle}>{post.title}</Text>
              <Text style={styles.postContent}>{post.content}</Text>

              {/* ── Media ── */}
              {post.video_url ? (
                <View style={styles.mediaWrap}>
                  <VideoView
                    style={styles.media}
                    player={useVideoPlayer(
                      { uri: post.video_url },
                      (p) => (p.loop = true)
                    )}
                    nativeControls
                    contentFit="cover"
                  />
                </View>
              ) : post.cover_image_url ? (
                <View style={styles.mediaWrap}>
                  <Image
                    source={{ uri: post.cover_image_url }}
                    style={styles.media}
                    contentFit="cover"
                  />
                </View>
              ) : null}

              {/* ── Stats ── */}
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Text style={styles.statCount}>{likesCount}</Text>
                  <Text style={styles.statLabel}>J'aime</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.statItem}>
                  <Text style={styles.statCount}>{comments.length}</Text>
                  <Text style={styles.statLabel}>Commentaires</Text>
                </View>
              </View>

              {/* ── Like Button ── */}
              <Pressable
                onPress={handleLike}
                disabled={likeLoading}
                style={styles.likeButton}
              >
                <LikeIcon filled={isLiked} />
                <Text style={[styles.likeButtonText, isLiked && { color: colors.coral }]}>
                  {isLiked ? "Aimé" : "J'aime"}
                </Text>
              </Pressable>

              {/* ── Comments Section ── */}
              <View style={styles.commentsHeader}>
                <Text style={styles.commentsTitle}>
                  Commentaires ({comments.length})
                </Text>
              </View>

              {/* ── Add Comment Form ── */}
              <View style={styles.commentForm}>
                <Avatar
                  uri={user?.avatar_url}
                  fallback={user?.name ?? "Me"}
                  size="sm"
                />
                <TextInput
                  style={styles.commentInput}
                  placeholder="Ajouter un commentaire..."
                  placeholderTextColor={colors.inkSoft}
                  value={commentText}
                  onChangeText={setCommentText}
                  multiline
                  maxLength={500}
                />
                <Pressable
                  onPress={handleAddComment}
                  disabled={isSubmitting || !commentText.trim()}
                  style={styles.sendButton}
                >
                  {isSubmitting ? (
                    <ActivityIndicator size="small" color={colors.primary} />
                  ) : (
                    <SendIcon />
                  )}
                </Pressable>
              </View>
            </>
          }
          renderItem={({ item }) => (
            <CommentCard
              id={item.id}
              authorName={item.user.name}
              authorAvatarUri={item.user.avatar_url}
              content={item.content}
              createdAt={item.created_at}
              isAuthor={item.is_author}
              onDelete={
                item.is_author ? handleDeleteComment(item.id) : undefined
              }
            />
          )}
          ListEmptyComponent={
            !commentsLoading ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Aucun commentaire pour le moment</Text>
                <Text style={styles.emptySubtext}>Soyez le premier à commenter !</Text>
              </View>
            ) : (
              <ActivityIndicator size="large" color={colors.primary} />
            )
          }
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

function BackIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15 18l-6-6 6-6"
        stroke={colors.ink}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function LikeIcon({ filled }: { filled: boolean }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24">
      <Path
        d="M12 20s-7-4.4-9.3-9C1.2 7.6 3 4 6.7 4c2 0 3.6 1.2 4.3 2.7C11.7 5.2 13.3 4 15.3 4 19 4 20.8 7.6 19.3 11 17 15.6 12 20 12 20Z"
        stroke={filled ? colors.coral : colors.inkSoft}
        strokeWidth={2}
        fill={filled ? colors.coral : "none"}
      />
    </Svg>
  );
}

function SendIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 3l18 8-18 10V3z"
        stroke={colors.primary}
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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 18,
    color: colors.ink,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 16,
    color: colors.ink,
    marginBottom: 16,
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: radius.button,
  },
  buttonText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 14,
    color: colors.white,
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 120,
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 16,
    marginBottom: 12,
  },
  authorName: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 15,
    color: colors.ink,
  },
  timestamp: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.inkSoft,
    marginTop: 2,
  },
  postTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 18,
    color: colors.ink,
    marginBottom: 8,
  },
  postContent: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 21,
    color: colors.ink,
    marginBottom: 16,
  },
  mediaWrap: {
    width: "100%",
    height: 250,
    borderRadius: radius.card,
    overflow: "hidden",
    marginBottom: 16,
    backgroundColor: colors.border,
  },
  media: {
    width: "100%",
    height: "100%",
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statCount: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 14,
    color: colors.ink,
  },
  statLabel: {
    fontFamily: fonts.body,
    fontSize: 11,
    color: colors.inkSoft,
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: colors.border,
  },
  likeButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    marginBottom: 20,
    borderRadius: radius.button,
    backgroundColor: colors.surface,
  },
  likeButtonText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 14,
    color: colors.ink,
  },
  commentsHeader: {
    marginTop: 20,
    marginBottom: 16,
  },
  commentsTitle: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 16,
    color: colors.ink,
  },
  commentForm: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 10,
    marginBottom: 20,
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: 12,
  },
  commentInput: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.ink,
    maxHeight: 100,
    backgroundColor: colors.background,
    borderRadius: radius.button,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  sendButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: radius.button,
    backgroundColor: colors.primary,
  },
  emptyContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    color: colors.inkSoft,
    marginBottom: 4,
  },
  emptySubtext: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.inkSoft,
  },
});
