import React, { useEffect, useRef } from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
  Easing,
  ScrollView,
  Dimensions,
} from "react-native";
import Svg, { Path, Circle, Line } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, fonts, shadow } from "@/lib/theme";

// Rayon dédié aux coins du panneau — distinct de radius.pill (pensé pour
// des formes en capsule/cercle) qui produisait un arrondi disproportionné.
const SHEET_CORNER_RADIUS = 28;

export type NotificationType = "bourse" | "candidature" | "communaute" | "info";

export type NotificationItem = {
  id: string;
  type: NotificationType;
  title: string;
  subtitle?: string;
  time: string; // ex. "2h", "Hier"
  unread?: boolean;
};

type NotificationsSheetProps = {
  visible: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onPressItem?: (item: NotificationItem) => void;
  onMarkAllRead?: () => void;
};

const TYPE_GRADIENT: Record<NotificationType, [string, string]> = {
  bourse: [colors.primary, colors.primaryLight],
  candidature: [colors.coral, colors.primary],
  communaute: [colors.primaryLight, colors.coral],
  info: [colors.inkSoft, colors.primary],
};

const { height: SCREEN_H } = Dimensions.get("window");

/**
 * NotificationsSheet — panneau de notifications.
 *
 * Signature : prolongement vertical du "fil constellation" du NavBar.
 * Chaque notification est un nœud du fil ; un segment pointillé relie
 * chaque nœud au suivant, comme une frise chronologique vivante plutôt
 * qu'une liste plate. Le nœud non lu porte un halo dégradé, le nœud lu
 * redevient sobre — la lecture visuelle remplace le badge générique.
 */
export function NotificationsSheet({
  visible,
  onClose,
  notifications,
  onPressItem,
  onMarkAllRead,
}: NotificationsSheetProps) {
  const translateY = useRef(new Animated.Value(SCREEN_H)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 1,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          speed: 14,
          bounciness: 4,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(backdropOpacity, {
          toValue: 0,
          duration: 180,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: SCREEN_H,
          duration: 220,
          easing: Easing.in(Easing.cubic),
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, translateY, backdropOpacity]);

  const unreadCount = notifications.filter((n) => n.unread).length;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View style={styles.root}>
        <Animated.View style={[styles.backdrop, { opacity: backdropOpacity }]}>
          <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
        </Animated.View>

        <Animated.View
          style={[
            styles.sheet,
            { paddingBottom: 20 + insets.bottom, transform: [{ translateY }] },
          ]}
        >
          <View style={styles.handle} />

          <View style={styles.header}>
            <View>
              <Text style={styles.headerTitle}>Notifications</Text>
              <Text style={styles.headerSubtitle}>
                {unreadCount > 0
                  ? `${unreadCount} nouvelle${unreadCount > 1 ? "s" : ""} sur le fil`
                  : "Tout est à jour"}
              </Text>
            </View>
            {unreadCount > 0 && onMarkAllRead && (
              <Pressable onPress={onMarkAllRead} hitSlop={8}>
                <Text style={styles.markAllText}>Tout marquer lu</Text>
              </Pressable>
            )}
          </View>

          {notifications.length === 0 ? (
            <EmptyThread />
          ) : (
            <ScrollView
              style={styles.list}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
            >
              {notifications.map((item, index) => (
                <ThreadRow
                  key={item.id}
                  item={item}
                  isLast={index === notifications.length - 1}
                  onPress={() => onPressItem?.(item)}
                />
              ))}
            </ScrollView>
          )}

          <Pressable
            onPress={onClose}
            style={({ pressed }) => [
              styles.closeButton,
              pressed && styles.closeButtonPressed,
            ]}
          >
            <Text style={styles.closeButtonText}>Fermer</Text>
          </Pressable>
        </Animated.View>
      </View>
    </Modal>
  );
}

function ThreadRow({
  item,
  isLast,
  onPress,
}: {
  item: NotificationItem;
  isLast: boolean;
  onPress: () => void;
}) {
  const [gradFrom, gradTo] = TYPE_GRADIENT[item.type];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.rowPressed]}
    >
      <View style={styles.threadCol}>
        <View style={item.unread ? styles.nodeHaloWrap : undefined}>
          <LinearGradient
            colors={item.unread ? [gradFrom, gradTo] : [colors.border, colors.border]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.node}
          >
            <TypeGlyph type={item.type} muted={!item.unread} />
          </LinearGradient>
        </View>
        {!isLast && (
          <Svg width={2} height={30} style={styles.connector}>
            <Line
              x1="1"
              y1="0"
              x2="1"
              y2="30"
              stroke={colors.border}
              strokeWidth={1.5}
              strokeDasharray="1, 5"
              strokeLinecap="round"
            />
          </Svg>
        )}
      </View>

      <View style={styles.rowContent}>
        <View style={styles.rowTopLine}>
          <Text
            style={[styles.rowTitle, item.unread && styles.rowTitleUnread]}
            numberOfLines={1}
          >
            {item.title}
          </Text>
          <Text style={styles.rowTime}>{item.time}</Text>
        </View>
        {item.subtitle && (
          <Text style={styles.rowSubtitle} numberOfLines={2}>
            {item.subtitle}
          </Text>
        )}
      </View>
    </Pressable>
  );
}

function TypeGlyph({ type, muted }: { type: NotificationType; muted: boolean }) {
  const c = muted ? colors.inkSoft : colors.white;
  switch (type) {
    case "bourse":
      return (
        <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
          <Path d="M12 5 2 9.5 12 14l10-4.5L12 5Z" stroke={c} strokeWidth={2} strokeLinejoin="round" />
          <Path d="M6 11.7v4c0 1.4 2.7 2.8 6 2.8s6-1.4 6-2.8v-4" stroke={c} strokeWidth={2} strokeLinecap="round" />
        </Svg>
      );
    case "candidature":
      return (
        <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
          <Path d="M4 9.5h16v9H4z" stroke={c} strokeWidth={2} strokeLinejoin="round" />
          <Path d="M9 9.5V7a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2.5" stroke={c} strokeWidth={2} strokeLinejoin="round" />
        </Svg>
      );
    case "communaute":
      return (
        <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
          <Circle cx="12" cy="8" r="3.4" stroke={c} strokeWidth={2} />
          <Path d="M5 20c1.2-3.6 4-5.4 7-5.4s5.8 1.8 7 5.4" stroke={c} strokeWidth={2} strokeLinecap="round" />
        </Svg>
      );
    default:
      return (
        <Svg width={14} height={14} viewBox="0 0 24 24" fill="none">
          <Path
            d="M6 9a6 6 0 1 1 12 0c0 3.2 1 5 2 6H4c1-1 2-2.8 2-6Z"
            stroke={c}
            strokeWidth={2}
            strokeLinejoin="round"
          />
          <Path d="M10 19a2 2 0 0 0 4 0" stroke={c} strokeWidth={2} strokeLinecap="round" />
        </Svg>
      );
  }
}

function EmptyThread() {
  return (
    <View style={styles.empty}>
      <Svg width={64} height={64} viewBox="0 0 64 64" fill="none">
        <Circle cx="16" cy="32" r="4" fill={colors.border} />
        <Circle cx="32" cy="20" r="4" fill={colors.border} />
        <Circle cx="48" cy="32" r="4" fill={colors.border} />
        <Line x1="16" y1="32" x2="32" y2="20" stroke={colors.border} strokeWidth={1.5} strokeDasharray="1,5" strokeLinecap="round" />
        <Line x1="32" y1="20" x2="48" y2="32" stroke={colors.border} strokeWidth={1.5} strokeDasharray="1,5" strokeLinecap="round" />
      </Svg>
      <Text style={styles.emptyTitle}>Le fil est calme</Text>
      <Text style={styles.emptySubtitle}>
        Les bourses, candidatures et échanges de la communauté apparaîtront ici.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(15,15,20,0.45)",
  },
  sheet: {
    maxHeight: SCREEN_H * 0.78,
    backgroundColor: colors.background,
    borderTopLeftRadius: SHEET_CORNER_RADIUS,
    borderTopRightRadius: SHEET_CORNER_RADIUS,
    paddingHorizontal: 20,
    paddingTop: 10,
    ...shadow.floating,
  },
  handle: {
    alignSelf: "center",
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
    marginBottom: 14,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  headerTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 18,
    color: colors.ink,
  },
  headerSubtitle: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.inkSoft,
    marginTop: 2,
  },
  markAllText: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 12,
    color: colors.primary,
  },
  list: {
    marginTop: 6,
  },
  listContent: {
    paddingBottom: 8,
  },
  row: {
    flexDirection: "row",
    gap: 12,
  },
  rowPressed: {
    opacity: 0.6,
  },
  threadCol: {
    alignItems: "center",
    width: 32,
  },
  nodeHaloWrap: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
    borderRadius: 16,
  },
  node: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  connector: {
    marginTop: 2,
  },
  rowContent: {
    flex: 1,
    paddingBottom: 18,
  },
  rowTopLine: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  rowTitle: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.inkSoft,
  },
  rowTitleUnread: {
    fontFamily: fonts.headingSemiBold,
    color: colors.ink,
  },
  rowTime: {
    fontFamily: fonts.body,
    fontSize: 11,
    color: colors.inkSoft,
  },
  rowSubtitle: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.inkSoft,
    marginTop: 2,
  },
  empty: {
    alignItems: "center",
    paddingVertical: 36,
    gap: 10,
  },
  emptyTitle: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 14,
    color: colors.ink,
  },
  emptySubtitle: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.inkSoft,
    textAlign: "center",
    paddingHorizontal: 24,
  },
  closeButton: {
    marginTop: 4,
    alignSelf: "center",
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  closeButtonPressed: {
    opacity: 0.6,
  },
  closeButtonText: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 13,
    color: colors.inkSoft,
  },
});

export default NotificationsSheet;