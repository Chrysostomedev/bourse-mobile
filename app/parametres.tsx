import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Switch } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Svg, { Path } from "react-native-svg";
import { colors, fonts, radius } from "@/lib/theme";

export default function ParametresScreen() {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [emailEnabled, setEmailEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <BackIcon />
        </Pressable>
        <Text style={styles.headerTitle}>Paramètres</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Push Notifications</Text>
              <Switch
                value={pushEnabled}
                onValueChange={setPushEnabled}
                trackColor={{ false: colors.border, true: colors.primaryLight }}
                thumbColor={pushEnabled ? colors.primary : colors.white}
              />
            </View>
            <View style={styles.divider} />
            <View style={styles.row}>
              <Text style={styles.rowLabel}>E-mails d'alerte (Bourses)</Text>
              <Switch
                value={emailEnabled}
                onValueChange={setEmailEnabled}
                trackColor={{ false: colors.border, true: colors.primaryLight }}
                thumbColor={emailEnabled ? colors.primary : colors.white}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Apparence</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Mode Sombre</Text>
              <Switch
                value={darkMode}
                onValueChange={setDarkMode}
                trackColor={{ false: colors.border, true: colors.primaryLight }}
                thumbColor={darkMode ? colors.primary : colors.white}
              />
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>À propos</Text>
          <View style={styles.card}>
            <Pressable style={styles.linkRow} onPress={() => router.push("/a-propos")}>
              <Text style={styles.rowLabel}>L'histoire de Bourse Pour Tous</Text>
              <ChevronRight />
            </Pressable>
            <View style={styles.divider} />
            <Pressable style={styles.linkRow} onPress={() => router.push("/faq")}>
              <Text style={styles.rowLabel}>Foire Aux Questions (FAQ)</Text>
              <ChevronRight />
            </Pressable>
            <View style={styles.divider} />
            <Pressable style={styles.linkRow} onPress={() => router.push("/politique")}>
              <Text style={styles.rowLabel}>Politique de confidentialité</Text>
              <ChevronRight />
            </Pressable>
          </View>
        </View>

      </ScrollView>
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

function ChevronRight() {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
      <Path d="M9 18l6-6-6-6" stroke={colors.inkSoft} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 12, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border },
  backBtn: { padding: 8, marginLeft: -8 },
  headerTitle: { fontFamily: fonts.headingSemiBold, fontSize: 16, color: colors.ink },
  content: { padding: 20, gap: 24 },
  section: { gap: 8 },
  sectionTitle: { fontFamily: fonts.headingBold, fontSize: 14, color: colors.inkSoft, marginLeft: 12, textTransform: "uppercase" },
  card: { backgroundColor: colors.surface, borderRadius: radius.card, paddingHorizontal: 16 },
  row: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 14 },
  linkRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 16 },
  rowLabel: { fontFamily: fonts.bodySemiBold, fontSize: 15, color: colors.ink },
  divider: { height: 1, backgroundColor: colors.border },
});
