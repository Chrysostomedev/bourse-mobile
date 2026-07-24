import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Svg, { Path, Rect, Circle } from "react-native-svg";
import { colors, fonts, radius, shadow } from "@/lib/theme";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <KeyboardAvoidingView 
        style={styles.keyboardView} 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.content}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <BackIcon />
          </Pressable>

          <View style={styles.iconWrap}>
            <LockIcon />
          </View>

          <Text style={styles.title}>Mot de passe oublié ?</Text>
          <Text style={styles.subtitle}>
            Pas de panique ! Entre ton adresse e-mail et nous t'enverrons un lien pour le réinitialiser.
          </Text>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Adresse e-mail</Text>
              <TextInput
                style={styles.input}
                placeholder="kader@exemple.com"
                placeholderTextColor={colors.inkSoft}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <Pressable 
              style={styles.cta} 
              onPress={() => {
                router.replace("/(tabs)");
                // Simulation d'envoi de mail
              }}
            >
              <Text style={styles.ctaText}>Envoyer le lien</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
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

function LockIcon() {
  return (
    <Svg width={40} height={40} viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke={colors.primary} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M7 11V7a5 5 0 0110 0v4" stroke={colors.primary} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  keyboardView: { flex: 1 },
  content: { padding: 24 },
  backBtn: { width: 40, height: 40, justifyContent: "center", marginBottom: 24, marginLeft: -8 },
  iconWrap: { width: 80, height: 80, borderRadius: 40, backgroundColor: "#F1E9FA", alignItems: "center", justifyContent: "center", marginBottom: 24 },
  title: { fontFamily: fonts.headingBold, fontSize: 26, color: colors.ink, marginBottom: 12 },
  subtitle: { fontFamily: fonts.body, fontSize: 15, color: colors.inkSoft, lineHeight: 22, marginBottom: 32 },
  form: { gap: 24 },
  inputGroup: { gap: 8 },
  label: { fontFamily: fonts.bodySemiBold, fontSize: 13, color: colors.ink },
  input: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.card, paddingHorizontal: 16, height: 52, fontFamily: fonts.body, fontSize: 15, color: colors.ink },
  cta: { backgroundColor: colors.primary, height: 54, borderRadius: radius.pill, alignItems: "center", justifyContent: "center", ...shadow.card },
  ctaText: { fontFamily: fonts.headingSemiBold, fontSize: 16, color: colors.white },
});
