import React, { useState } from "react";
import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Svg, { Path, Circle } from "react-native-svg";
import { mockNotifications, AppNotification } from "@/data/mock-notifications";
import { colors, fonts, radius, shadow } from "@/lib/theme";

export default function NotificationsScreen() {
  const [notifications, setNotifications] = useState<AppNotification[]>(mockNotifications);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const toggleRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, isRead: !n.isRead } : n))
    );
  };

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn} hitSlop={10}>
          <BackIcon />
        </Pressable>
        <Text style={styles.headerTitle}>Notifications</Text>
        <Pressable onPress={markAllRead} hitSlop={10}>
          <Text style={styles.markReadText}>Tout lire</Text>
        </Pressable>
      </View>

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Aucune notification</Text>
            <Text style={styles.emptyText}>Tu es à jour ! Reviens plus tard pour de nouvelles opportunités.</Text>
          </View>
        }
        renderItem={({ item }) => (
          <Pressable
            onPress={() => toggleRead(item.id)}
            style={[styles.notificationCard, !item.isRead && styles.unreadCard]}
          >
            <View style={[styles.iconWrap, item.type === "alert" && styles.iconAlert, item.type === "success" && styles.iconSuccess]}>
              {item.type === "alert" ? <AlertIcon /> : item.type === "success" ? <SuccessIcon /> : <InfoIcon />}
            </View>

            <View style={styles.textWrap}>
              <View style={styles.titleRow}>
                <Text style={[styles.cardTitle, !item.isRead && styles.boldText]}>{item.title}</Text>
                {!item.isRead && <View style={styles.unreadDot} />}
              </View>
              <Text style={styles.message}>{item.message}</Text>
              <Text style={styles.timeAgo}>{item.timeAgo}</Text>
            </View>
          </Pressable>
        )}
      />
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

function SuccessIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M20 6L9 17l-5-5" stroke={colors.like} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function AlertIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" stroke={colors.alert} strokeWidth={2.5} />
      <Path d="M12 8v4M12 16h.01" stroke={colors.alert} strokeWidth={2.5} strokeLinecap="round" />
    </Svg>
  );
}

function InfoIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" stroke={colors.primary} strokeWidth={2.5} />
      <Path d="M12 16v-4M12 8h.01" stroke={colors.primary} strokeWidth={2.5} strokeLinecap="round" />
    </Svg>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 14, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border },
  backBtn: { padding: 4, marginLeft: -4 },
  headerTitle: { fontFamily: fonts.headingSemiBold, fontSize: 16, color: colors.ink },
  markReadText: { fontFamily: fonts.bodySemiBold, fontSize: 13, color: colors.primary },
  list: { padding: 16, gap: 12 },
  notificationCard: { flexDirection: "row", backgroundColor: colors.surface, borderRadius: radius.card, padding: 16, gap: 14, ...shadow.card, borderWidth: 1, borderColor: "transparent" },
  unreadCard: { borderColor: colors.primaryLight + "33", backgroundColor: "#FAF8FD" },
  iconWrap: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#F1E9FA", alignItems: "center", justifyContent: "center" },
  iconSuccess: { backgroundColor: "#E9F9F0" },
  iconAlert: { backgroundColor: "#FDE9E9" },
  textWrap: { flex: 1, gap: 4 },
  titleRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 8 },
  cardTitle: { fontFamily: fonts.headingSemiBold, fontSize: 14, color: colors.ink },
  boldText: { fontFamily: fonts.headingBold },
  unreadDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary },
  message: { fontFamily: fonts.body, fontSize: 13, color: colors.inkSoft, lineHeight: 18 },
  timeAgo: { fontFamily: fonts.body, fontSize: 11, color: colors.inkSoft, marginTop: 2 },
  emptyState: { flex: 1, alignItems: "center", justifyContent: "center", paddingVertical: 120, gap: 8 },
  emptyTitle: { fontFamily: fonts.headingSemiBold, fontSize: 16, color: colors.ink },
  emptyText: { fontFamily: fonts.body, fontSize: 13, color: colors.inkSoft, textAlign: "center", paddingHorizontal: 40 },
});
