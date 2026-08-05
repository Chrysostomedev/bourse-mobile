import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import { Avatar } from "@/components/ui/avatar";
import { colors, fonts, radius } from "@/lib/theme";
import Svg, { Path } from "react-native-svg";

export type CommentCardProps = {
  id: number;
  authorName: string;
  authorAvatarUri?: string | null;
  content: string;
  createdAt: string;
  isAuthor?: boolean;
  onDelete?: () => Promise<void>;
  onEdit?: () => void;
};

export function CommentCard({
  id,
  authorName,
  authorAvatarUri,
  content,
  createdAt,
  isAuthor = false,
  onDelete,
  onEdit,
}: CommentCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!onDelete) return;

    Alert.alert(
      "Supprimer le commentaire",
      "Êtes-vous sûr ? Cette action est irréversible.",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: async () => {
            try {
              setIsDeleting(true);
              await onDelete();
            } catch (err) {
              Alert.alert("Erreur", "Impossible de supprimer le commentaire");
            } finally {
              setIsDeleting(false);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Avatar uri={authorAvatarUri} fallback={authorName} size="xs" />
        <View style={styles.info}>
          <Text style={styles.authorName}>{authorName}</Text>
          <Text style={styles.timestamp}>{createdAt}</Text>
        </View>
        {isAuthor && (
          <View style={styles.actions}>
            {onEdit && (
              <Pressable onPress={onEdit} hitSlop={8}>
                <EditIcon />
              </Pressable>
            )}
            {onDelete && (
              <Pressable onPress={handleDelete} disabled={isDeleting} hitSlop={8}>
                <DeleteIcon />
              </Pressable>
            )}
          </View>
        )}
      </View>

      <Text style={styles.content}>{content}</Text>
    </View>
  );
}

function EditIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 17.25V21h3.75L17.81 9.94m-4.24-4.24l3.54-3.54a2 2 0 012.83 0l2.12 2.12a2 2 0 010 2.83L15.3 7.7m-4.24-4.24L7.3 11.7"
        stroke={colors.primary}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function DeleteIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19 6.4L6.4 19M19 19L6.4 6.4"
        stroke={colors.danger}
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
    gap: 8,
  },
  info: {
    flex: 1,
  },
  authorName: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 13,
    color: colors.ink,
  },
  timestamp: {
    fontFamily: fonts.body,
    fontSize: 11,
    color: colors.inkSoft,
    marginTop: 2,
  },
  content: {
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 18,
    color: colors.ink,
    marginLeft: 32,
  },
  actions: {
    flexDirection: "row",
    gap: 8,
  },
});
