import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Svg, { Path } from "react-native-svg";
import { colors, fonts } from "@/lib/theme";

export default function PolitiqueScreen() {
  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <BackIcon />
        </Pressable>
        <Text style={styles.headerTitle}>Politique de confidentialité</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.alertBox}>
          <Text style={styles.alertText}>
            TL;DR : Nous ne vendons pas tes données personnelles. Nous les utilisons uniquement pour te recommander des bourses adaptées.
          </Text>
        </View>

        <Text style={styles.h2}>1. Collecte des données</Text>
        <Text style={styles.p}>
          Nous collectons les informations que tu nous fournis lors de l'inscription (nom, e-mail, pays) ainsi que tes interactions avec l'application (bourses enregistrées, likes) afin de personnaliser ton expérience.
        </Text>

        <Text style={styles.h2}>2. Utilisation des données</Text>
        <Text style={styles.p}>
          Ces données nous permettent de t'alerter lorsqu'une bourse pertinente est sur le point d'expirer et d'améliorer nos services.
        </Text>

        <Text style={styles.h2}>3. Protection de tes informations</Text>
        <Text style={styles.p}>
          Toutes tes données sont stockées de manière sécurisée (base de données cryptée) et ne sont jamais partagées avec des tiers sans ton consentement explicite.
        </Text>

        <Text style={styles.h2}>4. Tes droits</Text>
        <Text style={styles.p}>
          Tu peux à tout moment supprimer ton compte et l'intégralité de tes données depuis la page Paramètres.
        </Text>
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

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.surface },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 12, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border },
  backBtn: { padding: 8, marginLeft: -8 },
  headerTitle: { fontFamily: fonts.headingSemiBold, fontSize: 16, color: colors.ink },
  content: { padding: 24, paddingBottom: 60 },
  alertBox: { backgroundColor: "#FFF5F2", padding: 16, borderRadius: 12, borderWidth: 1, borderColor: colors.coral, marginBottom: 32 },
  alertText: { fontFamily: fonts.bodySemiBold, fontSize: 14, color: colors.coral, lineHeight: 22 },
  h2: { fontFamily: fonts.headingBold, fontSize: 18, color: colors.ink, marginBottom: 12, marginTop: 16 },
  p: { fontFamily: fonts.body, fontSize: 15, color: colors.inkSoft, lineHeight: 24, marginBottom: 24 },
});
