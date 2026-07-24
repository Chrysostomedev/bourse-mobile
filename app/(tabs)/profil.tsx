import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Svg, { Path, Circle } from "react-native-svg";
import { colors, fonts, radius, shadow } from "@/lib/theme";

export default function ProfilScreen() {
  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Header Profil */}
        <View style={styles.header}>
          <View style={styles.avatarWrap}>
            <Text style={styles.avatarText}>KT</Text>
          </View>
          <Text style={styles.name}>Kader Touré</Text>
          <Text style={styles.bio}>Futur ingénieur 🎓</Text>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>3</Text>
              <Text style={styles.statLabel}>Bourses suivies</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>12</Text>
              <Text style={styles.statLabel}>Posts aimés</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>5</Text>
              <Text style={styles.statLabel}>Commentaires</Text>
            </View>
          </View>
        </View>

        {/* Sections */}
        <View style={styles.sections}>
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Mes bourses suivies</Text>
              <Pressable><Text style={styles.seeAll}>Voir tout</Text></Pressable>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
              {/* Fake mini cards */}
              <View style={styles.miniCard}>
                <View style={styles.badgeFlag}><Text style={styles.badgeFlagText}>CA</Text></View>
                <View>
                  <Text style={styles.miniCardTitle}>Bourse Vanier</Text>
                  <Text style={styles.miniCardSub}>Canada</Text>
                </View>
              </View>
              <View style={styles.miniCard}>
                <View style={styles.badgeFlag}><Text style={styles.badgeFlagText}>FR</Text></View>
                <View>
                  <Text style={styles.miniCardTitle}>Eiffel Excellence</Text>
                  <Text style={styles.miniCardSub}>France</Text>
                </View>
              </View>
            </ScrollView>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Mon compte</Text>
            </View>
            <View style={styles.settingsMenu}>
              <Pressable style={styles.menuItem} onPress={() => router.push("/profil-edit")}>
                <View style={styles.menuIconWrap}>
                  <EditIcon />
                </View>
                <Text style={styles.menuItemText}>Modifier le profil</Text>
                <ChevronRight />
              </Pressable>
              <View style={styles.menuDivider} />
              <Pressable style={styles.menuItem} onPress={() => router.push("/parametres")}>
                <View style={styles.menuIconWrap}>
                  <SettingsIcon />
                </View>
                <Text style={styles.menuItemText}>Paramètres</Text>
                <ChevronRight />
              </Pressable>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Informations</Text>
            </View>
            <View style={styles.settingsMenu}>
              <Pressable style={styles.menuItem} onPress={() => router.push("/a-propos")}>
                <View style={styles.menuIconWrap}>
                  <InfoIcon />
                </View>
                <Text style={styles.menuItemText}>À propos</Text>
                <ChevronRight />
              </Pressable>
              <View style={styles.menuDivider} />
              <Pressable style={styles.menuItem} onPress={() => router.push("/faq")}>
                <View style={styles.menuIconWrap}>
                  <HelpIcon />
                </View>
                <Text style={styles.menuItemText}>FAQ</Text>
                <ChevronRight />
              </Pressable>
              <View style={styles.menuDivider} />
              <Pressable style={styles.menuItem} onPress={() => router.push("/politique")}>
                <View style={styles.menuIconWrap}>
                  <ShieldIcon />
                </View>
                <Text style={styles.menuItemText}>Politique de confidentialité</Text>
                <ChevronRight />
              </Pressable>
              <View style={styles.menuDivider} />
              <Pressable style={styles.menuItem} onPress={() => router.push("/cgu")}>
                <View style={styles.menuIconWrap}>
                  <DocumentIcon />
                </View>
                <Text style={styles.menuItemText}>CGU</Text>
                <ChevronRight />
              </Pressable>
              <View style={styles.menuDivider} />
              <Pressable style={styles.menuItem} onPress={() => router.push("/contact")}>
                <View style={[styles.menuIconWrap, { backgroundColor: "#FFF5E1" }]}>
                  <MegaphoneIcon />
                </View>
                <Text style={styles.menuItemText}>Publicité & Contact</Text>
                <ChevronRight />
              </Pressable>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.settingsMenu}>
              <Pressable style={styles.menuItem} onPress={() => router.replace("/login/connexion")}>
                <View style={[styles.menuIconWrap, { backgroundColor: "#FDE9E9" }]}>
                  <LogoutIcon />
                </View>
                <Text style={[styles.menuItemText, { color: colors.alert }]}>Se déconnecter</Text>
              </Pressable>
            </View>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

function BellIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path d="M6 9a6 6 0 1 1 12 0c0 3.2 1 5 2 6H4c1-1 2-2.8 2-6Z" stroke={colors.primary} strokeWidth={2} strokeLinejoin="round" />
      <Path d="M10 19a2 2 0 0 0 4 0" stroke={colors.primary} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

function ShieldIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={colors.primary} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function LogoutIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" stroke={colors.alert} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function ChevronRight() {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
      <Path d="M9 18l6-6-6-6" stroke={colors.inkSoft} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function EditIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path d="M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" stroke={colors.primary} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function SettingsIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="3" stroke={colors.primary} strokeWidth={2} />
      <Path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" stroke={colors.primary} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function InfoIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" stroke={colors.primary} strokeWidth={2} />
      <Path d="M12 16v-4M12 8h.01" stroke={colors.primary} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function HelpIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01" stroke={colors.primary} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function DocumentIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke={colors.primary} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M14 2v6h6" stroke={colors.primary} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function MegaphoneIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path d="M18 8a3 3 0 0 0-3-3H5a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8z" stroke={colors.coral} strokeWidth={2} />
      <Path d="M22 6l-4 3v6l4 3V6z" stroke={colors.coral} strokeWidth={2} />
    </Svg>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 120,
  },
  header: {
    backgroundColor: colors.primary,
    alignItems: "center",
    paddingVertical: 32,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    marginBottom: 24,
  },
  avatarWrap: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    borderWidth: 3,
    borderColor: colors.primaryLight,
  },
  avatarText: {
    fontFamily: fonts.headingBold,
    fontSize: 28,
    color: colors.primary,
  },
  name: {
    fontFamily: fonts.headingBold,
    fontSize: 22,
    color: colors.white,
    marginBottom: 4,
  },
  bio: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    color: "rgba(255,255,255,0.8)",
    marginBottom: 24,
  },
  statsRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: radius.card,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  statItem: {
    alignItems: "center",
    paddingHorizontal: 12,
  },
  statValue: {
    fontFamily: fonts.headingBold,
    fontSize: 18,
    color: colors.white,
  },
  statLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: 11,
    color: "rgba(255,255,255,0.8)",
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  sections: {
    paddingHorizontal: 20,
    gap: 24,
  },
  section: {
    gap: 12,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    marginBottom: 4,
  },
  sectionTitle: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 18,
    color: colors.ink,
  },
  seeAll: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 13,
    color: colors.primary,
  },
  horizontalList: {
    gap: 12,
  },
  miniCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    padding: 12,
    borderRadius: radius.card,
    gap: 12,
    width: 200,
    ...shadow.card,
  },
  badgeFlag: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#E6F4F1",
    alignItems: "center",
    justifyContent: "center",
  },
  badgeFlagText: {
    fontFamily: fonts.headingBold,
    fontSize: 16,
    color: colors.primary,
  },
  miniCardTitle: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 14,
    color: colors.ink,
  },
  miniCardSub: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.inkSoft,
  },
  settingsMenu: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    ...shadow.card,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    gap: 12,
  },
  menuIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#F1E9FA",
    alignItems: "center",
    justifyContent: "center",
  },
  menuItemText: {
    flex: 1,
    fontFamily: fonts.bodySemiBold,
    fontSize: 15,
    color: colors.ink,
  },
  menuDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 64,
  }
});
