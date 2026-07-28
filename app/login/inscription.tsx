import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Svg, { Path, Circle } from "react-native-svg";
import { colors, fonts, radius, shadow } from "@/lib/theme";
import { useAuth } from "@/hooks/useAuth";
import { SuccessToast } from "@/components/ui/SuccessToast";

export default function InscriptionScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { register, isLoading, error } = useAuth();

  const handleRegister = async () => {
    const name = `${firstName.trim()} ${lastName.trim()}`.trim();
    if (!name || !email.trim() || !password || password !== confirmPassword) return;
    try {
      await register({ name, email: email.trim(), password, password_confirmation: confirmPassword, phone: null });
      setShowSuccess(true);
      setTimeout(() => router.replace("/(tabs)"), 900);
    } catch {}
  };

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <SuccessToast visible={showSuccess} title="Compte créé !" subtitle="Bienvenue sur Bourse Pour Tous" onHide={() => setShowSuccess(false)} />
      <KeyboardAvoidingView style={styles.keyboardView} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.header}><View style={styles.logoWrap}><Text style={styles.logoText}>B</Text></View></View>
          <View style={styles.titleSection}><Text style={styles.title}>Crée ton compte</Text><Text style={styles.subtitle}>Gratuit. Toujours.</Text></View>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <View style={styles.form}>
            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1 }]}><Text style={styles.label}>Prénom</Text><TextInput style={styles.input} placeholder="Ex: Kader" placeholderTextColor={colors.inkSoft} value={firstName} onChangeText={setFirstName} /></View>
              <View style={[styles.inputGroup, { flex: 1 }]}><Text style={styles.label}>Nom</Text><TextInput style={styles.input} placeholder="Ex: Touré" placeholderTextColor={colors.inkSoft} value={lastName} onChangeText={setLastName} /></View>
            </View>
            <View style={styles.inputGroup}><Text style={styles.label}>Adresse e-mail</Text><TextInput style={styles.input} placeholder="kader@exemple.com" placeholderTextColor={colors.inkSoft} keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} /></View>
            <View style={styles.inputGroup}><Text style={styles.label}>Mot de passe</Text><View style={styles.passwordWrap}><TextInput style={styles.inputPassword} placeholder="••••••••" placeholderTextColor={colors.inkSoft} secureTextEntry={!showPassword} value={password} onChangeText={setPassword} /><Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>{showPassword ? <EyeOffIcon /> : <EyeIcon />}</Pressable></View></View>
            <View style={styles.inputGroup}><Text style={styles.label}>Confirmer le mot de passe</Text><View style={styles.passwordWrap}><TextInput style={styles.inputPassword} placeholder="••••••••" placeholderTextColor={colors.inkSoft} secureTextEntry={!showPassword} value={confirmPassword} onChangeText={setConfirmPassword} /></View></View>
            <Pressable style={[styles.cta, isLoading && { opacity: 0.7 }]} onPress={handleRegister} disabled={isLoading}>{isLoading ? <ActivityIndicator color={colors.white} /> : <Text style={styles.ctaText}>Créer mon compte</Text>}</Pressable>
          </View>
          <View style={styles.footerLinks}><Pressable onPress={() => router.push("/login/connexion")} style={styles.linkWrap}><Text style={styles.linkText}>J'ai déjà un compte</Text></Pressable><Pressable onPress={() => router.replace("/(tabs)")} style={styles.linkWrap}><Text style={styles.skipText}>Passer pour l'instant</Text></Pressable></View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
function EyeIcon(){return (<Svg width={20} height={20} viewBox="0 0 24 24" fill="none"><Path d="M1 12s4-8 11-8 11 8-4 8-11 8-11-8z" stroke={colors.inkSoft} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /><Circle cx="12" cy="12" r="3" stroke={colors.inkSoft} strokeWidth={2} /></Svg>);}
function EyeOffIcon(){return (<Svg width={20} height={20} viewBox="0 0 24 24" fill="none"><Path d="M17.94 17.94A10.07 0 0112 20c-7 0-11-8-11-8a18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" stroke={colors.inkSoft} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></Svg>);}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background }, keyboardView: { flex: 1 }, scrollContent: { padding: 24, paddingBottom: 40 },
  header: { alignItems: "center", marginBottom: 24, marginTop: 10 }, logoWrap: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center" },
  logoText: { fontFamily: fonts.headingBold, fontSize: 24, color: colors.white }, titleSection: { marginBottom: 32, alignItems: "center" }, title: { fontFamily: fonts.headingBold, fontSize: 26, color: colors.ink, marginBottom: 6 },
  subtitle: { fontFamily: fonts.bodySemiBold, fontSize: 14, color: colors.coral }, errorText: { fontFamily: fonts.bodyMedium, fontSize: 13, color: colors.coral, marginBottom: 16, textAlign: "center" },
  form: { gap: 20 }, row: { flexDirection: "row", gap: 16 }, inputGroup: { gap: 8 }, label: { fontFamily: fonts.bodySemiBold, fontSize: 13, color: colors.ink },
  input: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.card, paddingHorizontal: 16, height: 52, fontFamily: fonts.body, fontSize: 15, color: colors.ink },
  passwordWrap: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.card, flexDirection: "row", alignItems: "center" },
  inputPassword: { flex: 1, height: 52, paddingHorizontal: 16, fontFamily: fonts.body, fontSize: 15, color: colors.ink }, eyeBtn: { padding: 14 },
  cta: { backgroundColor: colors.primary, height: 54, borderRadius: radius.pill, alignItems: "center", justifyContent: "center", marginTop: 12,...shadow.card }, ctaText: { fontFamily: fonts.headingSemiBold, fontSize: 16, color: colors.white },
  footerLinks: { marginTop: 32, alignItems: "center", gap: 20 }, linkWrap: { padding: 8 }, linkText: { fontFamily: fonts.headingSemiBold, fontSize: 14, color: colors.primary }, skipText: { fontFamily: fonts.bodyMedium, fontSize: 13, color: colors.inkSoft },
});