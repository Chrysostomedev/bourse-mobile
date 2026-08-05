import React, { useRef, useState } from "react";
import { View, Text, Pressable, Animated, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { VideoView, useVideoPlayer } from "expo-video";
import Svg, { Path, Circle } from "react-native-svg";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { colors, fonts, radius, shadow } from "@/lib/theme";

export type PostCardProps = {
  id?: number;
  slug?: string;
  authorName: string;
  authorAvatarUri?: string;
  isVerified?: boolean;
  timeAgo: string;
  content: string;
  imageUri?: any;
  videoUri?: any;
  likeCount: number;
  commentCount: number;
  isLiked?: boolean;
  onToggleLike?: (postId: number, nextState: boolean) => Promise<void>;
  onPressComment?: () => void;
  onPressShare?: () => void;
  onPressAuthor?: () => void;
  isLoadingLike?: boolean;
};

export function PostCard({
  id = 0,
  slug = "",
  authorName,
  authorAvatarUri,
  isVerified = false,
  timeAgo,
  content,
  imageUri,
  videoUri,
  likeCount,
  commentCount,
  isLiked = false,
  onToggleLike,
  onPressComment,
  onPressShare,
  onPressAuthor,
  isLoadingLike = false,
}: PostCardProps) {
  const [liked, setLiked] = useState(isLiked);
  const [displayLikeCount, setDisplayLikeCount] = useState(likeCount);
  const heartScale = useRef(new Animated.Value(1)).current;

  const videoSource = typeof videoUri === "string" ? { uri: videoUri } : videoUri;
  const player = useVideoPlayer(videoUri ? videoSource : null, (p) => {
    p.loop = true;
  });

  const handleLike = async () => {
    if (isLoadingLike || !onToggleLike) return;

    const next = !liked;
    setLiked(next);
    setDisplayLikeCount((prev) => prev + (next ? 1 : -1));

    Animated.sequence([
      Animated.spring(heartScale, {
        toValue: 1.35,
        speed: 30,
        useNativeDriver: true,
      }),
      Animated.spring(heartScale, {
        toValue: 1,
        speed: 18,
        bounciness: 12,
        useNativeDriver: true,
      }),
    ]).start();

    try {
      await onToggleLike(id, next);
    } catch (err) {
      // Rollback on error
      setLiked(!next);
      setDisplayLikeCount((prev) => prev + (next ? -1 : 1));
      console.error("❌ Like toggle failed:", err);
    }
  };

  return (
    <View style={styles.card}>
      {/* ── Header ── */}
      <Pressable style={styles.header} onPress={onPressAuthor}>
        <Avatar uri={authorAvatarUri} fallback={authorName} size="sm" />
        <View style={styles.identity}>
          <View style={styles.nameRow}>
            <Text style={styles.author} numberOfLines={1}>
              {authorName}
            </Text>
            {isVerified && (
              <View style={styles.verifiedBadge}>
                <VerifiedIcon />
              </View>
            )}
          </View>
          <Text style={styles.time}>{timeAgo}</Text>
        </View>
      </Pressable>

      {/* ── Content ── */}
      <Text style={styles.content} numberOfLines={5}>
        {content}
      </Text>

      {/* ── Media ── */}
      {videoUri ? (
        <View style={styles.mediaWrap}>
          <VideoView
            style={styles.postMedia}
            player={player}
            nativeControls
            contentFit="cover"
          />
          <PlayButton />
        </View>
      ) : imageUri ? (
        <View style={styles.mediaWrap}>
          <Image
            source={
              typeof imageUri === "string" ? { uri: imageUri } : imageUri
            }
            style={styles.postMedia}
            contentFit="cover"
          />
        </View>
      ) : null}

      {/* ── Stats ── */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statCount}>{displayLikeCount}</Text>
          <Text style={styles.statLabel}>J'aime</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statCount}>{commentCount}</Text>
          <Text style={styles.statLabel}>Commentaires</Text>
        </View>
      </View>

      {/* ── Actions ── */}
      <View style={styles.actions}>
        <Pressable
          onPress={handleLike}
          style={styles.actionItem}
          hitSlop={8}
          disabled={isLoadingLike}
        >
          <Animated.View style={{ transform: [{ scale: heartScale }] }}>
            <HeartIcon filled={liked} />
          </Animated.View>
          <Text
            style={[
              styles.actionLabel,
              liked && { color: colors.coral },
            ]}
          >
            J'aime
          </Text>
        </Pressable>

        <Pressable
          onPress={onPressComment}
          style={styles.actionItem}
          hitSlop={8}
        >
          <CommentIcon />
          <Text style={styles.actionLabel}>Commenter</Text>
        </Pressable>

        <Pressable
          onPress={onPressShare}
          style={styles.actionItem}
          hitSlop={8}
        >
          <ShareIcon />
          <Text style={styles.actionLabel}>Partager</Text>
        </Pressable>
      </View>
    </View>
  );
}

function VerifiedIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill={colors.primary}>
      <Circle cx="12" cy="12" r="10" />
      <Path
        d="M9 12l2 2 4-4"
        stroke={colors.white}
        strokeWidth="2.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24">
      <Path
        d="M12 20s-7-4.4-9.3-9C1.2 7.6 3 4 6.7 4c2 0 3.6 1.2 4.3 2.7C11.7 5.2 13.3 4 15.3 4 19 4 20.8 7.6 19.3 11 17 15.6 12 20 12 20Z"
        stroke={filled ? colors.coral : colors.inkSoft}
        strokeWidth={2}
        fill={filled ? colors.coral : "none"}
      />
    </Svg>
  );
}

function CommentIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 5h16v11H9l-5 4Z"
        stroke={colors.inkSoft}
        strokeWidth={2}
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function ShareIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path
        d="M4 12v7h16v-7M12 3v13M7 8l5-5 5 5"
        stroke={colors.inkSoft}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function PlayButton() {
  return (
    <View style={styles.playButton}>
      <Svg width={48} height={48} viewBox="0 0 24 24" fill={colors.white}>
        <Path d="M5 3l14 9-14 9V3z" />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    overflow: "hidden",
    ...shadow.card,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 16,
    paddingBottom: 12,
  },
  identity: { flex: 1 },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  author: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 14.5,
    color: colors.ink,
    flex: 1,
  },
  verifiedBadge: {
    width: 16,
    height: 16,
  },
  time: {
    fontFamily: fonts.body,
    fontSize: 11.5,
    color: colors.inkSoft,
    marginTop: 3,
  },
  content: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 20,
    color: colors.ink,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  mediaWrap: {
    width: "100%",
    height: 240,
    backgroundColor: colors.border,
    position: "relative",
    overflow: "hidden",
  },
  postMedia: {
    width: "100%",
    height: "100%",
  },
  playButton: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -24,
    marginLeft: -24,
    backgroundColor: "rgba(0,0,0,0.4)",
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
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
    fontSize: 13,
    color: colors.ink,
  },
  statLabel: {
    fontFamily: fonts.body,
    fontSize: 11,
    color: colors.inkSoft,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: colors.border,
  },
  actions: {
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingVertical: 8,
    gap: 4,
  },
  actionItem: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 10,
    borderRadius: radius.button,
    marginHorizontal: 4,
  },
  actionLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    color: colors.inkSoft,
  },
});