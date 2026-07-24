import React, { useRef, useState } from "react";
import { View, Text, Pressable, Animated, StyleSheet } from "react-native";
import { Image } from "expo-image";
import { VideoView, useVideoPlayer } from "expo-video";
import Svg, { Path } from "react-native-svg";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { colors, fonts, radius, shadow } from "@/lib/theme";

export type PostCardProps = {
  authorName: string;
  authorAvatarUri?: string;
  isVerified?: boolean;
  timeAgo: string;
  content: string;
  imageUri?: any; // changed to any to accept require()
  videoUri?: any; // changed to any to accept require()
  likeCount: number;
  commentCount: number;
  isLiked?: boolean;
  onToggleLike?: (nextState: boolean) => void;
  onPressComment?: () => void;
  onPressShare?: () => void;
};

export function PostCard({
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
}: PostCardProps) {
  const [liked, setLiked] = useState(isLiked);
  const heartScale = useRef(new Animated.Value(1)).current;

  const videoSource = typeof videoUri === "string" ? { uri: videoUri } : videoUri;
  const player = useVideoPlayer(videoUri ? videoSource : null, (p) => {
    p.loop = true;
  });

  const handleLike = () => {
    const next = !liked;
    setLiked(next);
    onToggleLike?.(next);
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
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Avatar uri={authorAvatarUri} fallback={authorName} size="sm" />
        <View style={styles.identity}>
          <View style={styles.nameRow}>
            <Text style={styles.author}>{authorName}</Text>
            {isVerified && <Badge label="Organisme" tone="primary" />}
          </View>
          <Text style={styles.time}>{timeAgo}</Text>
        </View>
      </View>

      <Text style={styles.content}>{content}</Text>

      {videoUri ? (
        <View style={styles.mediaWrap}>
          <VideoView
            style={styles.postMedia}
            player={player}
            nativeControls
            contentFit="cover"
          />
        </View>
      ) : imageUri ? (
        <View style={styles.mediaWrap}>
          <Image 
            source={typeof imageUri === "string" ? { uri: imageUri } : imageUri} 
            style={styles.postMedia} 
            contentFit="cover" 
          />
        </View>
      ) : null}

      <View style={styles.actions}>
        <Pressable onPress={handleLike} style={styles.actionItem} hitSlop={8}>
          <Animated.View style={{ transform: [{ scale: heartScale }] }}>
            <HeartIcon filled={liked} />
          </Animated.View>
          <Text style={styles.actionCount}>
            {likeCount + (liked && !isLiked ? 1 : 0)}
          </Text>
        </Pressable>

        <Pressable onPress={onPressComment} style={styles.actionItem} hitSlop={8}>
          <CommentIcon />
          <Text style={styles.actionCount}>{commentCount}</Text>
        </Pressable>

        <Pressable onPress={onPressShare} style={styles.actionItem} hitSlop={8}>
          <ShareIcon />
        </Pressable>
      </View>
    </View>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <Svg width={21} height={21} viewBox="0 0 24 24">
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
    <Svg width={21} height={21} viewBox="0 0 24 24" fill="none">
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
    <Svg width={21} height={21} viewBox="0 0 24 24" fill="none">
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

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: 16,
    gap: 12,
    ...shadow.card,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
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
  },
  time: {
    fontFamily: fonts.body,
    fontSize: 11.5,
    color: colors.inkSoft,
    marginTop: 1,
  },
  content: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 20,
    color: colors.ink,
  },
  mediaWrap: {
    width: "100%",
    height: 200,
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: colors.border,
  },
  postMedia: {
    width: "100%",
    height: "100%",
  },
  actions: {
    flexDirection: "row",
    gap: 22,
    paddingTop: 4,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingTop: 10,
  },
  actionCount: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12.5,
    color: colors.inkSoft,
  },
});