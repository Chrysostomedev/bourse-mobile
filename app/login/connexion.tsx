import React, { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Svg, { Path, Circle } from "react-native-svg";
import { colors, fonts, radius, shadow } from "@/lib/theme";
import { useAuth } from "@/hooks/useAuth";
import { SuccessToast } from "@/components/ui/SuccessToast";

export default function ConnexionScreen() {
  const [email, setEmail] = useState("stomadev@gmail.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const { login, isLoading, error } = useAuth();

  const handleLogin = async () => {
    try {
      await login({ email: email.trim(), password });
      setSuccess(true);
      setTimeout(() => router.replace("/(tabs)"), 700);
    } catch {}
  };

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <SuccessToast visible={success} title="Connexion réussie" subtitle="Bienvenue!" onHide={() => setSuccess(false)} />
      <KeyboardAvoidingView style={styles.keyboardView} behavior={Platform.OS === "ios"? "padding" : "height"}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.header}><View style={styles.logoWrap}><Text style={styles.logoText}>B</Text></View><Text style={styles.brandName}>Bourse Pour Tous</Text></View>
          <View style={styles.titleSection}><Text style={styles.title}>Content de te revoir</Text><Text style={styles.subtitle}>Connecte-toi pour retrouver tes bourses et tes messages.</Text></View>
          {error && <Text style={styles.errorText}>{error}</Text>}
          <View style={styles.form}>
            <View style={styles.inputGroup}><Text style={styles.label}>Adresse e-mail</Text><TextInput style={styles.input} placeholder="kader@exemple.com" placeholderTextColor={colors.inkSoft} keyboardType="email-address" autoCapitalize="none" value={email} onChangeText={setEmail} /></View>
            <View style={styles.inputGroup}><Text style={styles.label}>Mot de passe</Text><View style={styles.passwordWrap}><TextInput style={styles.inputPassword} placeholder="••••••••" placeholderTextColor={colors.inkSoft} secureTextEntry={!showPassword} value={password} onChangeText={setPassword} /><Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>{showPassword? <EyeOffIcon /> : <EyeIcon />}</Pressable></View></View>
            <Pressable style={styles.forgotBtn}><Text style={styles.forgotText}>Mot de passe oublié?</Text></Pressable>
            <Pressable style={[styles.cta, isLoading && { opacity: 0.7 }]} onPress={handleLogin} disabled={isLoading}>{isLoading? <ActivityIndicator color={colors.white} /> : <Text style={styles.ctaText}>Se connecter</Text>}</Pressable>
          </View>
          <View style={styles.dividerWrap}><View style={styles.dividerLine} /><Text style={styles.dividerText}>ou</Text><View style={styles.dividerLine} /></View>
          <Pressable style={styles.secondaryBtn} onPress={() => router.push("/login/inscription")}><Text style={styles.secondaryBtnText}>Créer un compte</Text></Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
function EyeIcon(){return (<Svg width={20} height={20} viewBox="0 0 24 24" fill="none"><Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke={colors.inkSoft} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /><Circle cx="12" cy="12" r="3" stroke={colors.inkSoft} strokeWidth={2} /></Svg>);}
function EyeOffIcon(){return (<Svg width={20} height={20} viewBox="0 0 24 24" fill="none"><Path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" stroke={colors.inkSoft} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" /></Svg>);}
const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background }, keyboardView: { flex: 1 }, scrollContent: { padding: 24, paddingBottom: 40 },
  header: { alignItems: "center", marginBottom: 32, marginTop: 20 }, logoWrap: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center", marginBottom: 12 },
  logoText: { fontFamily: fonts.headingBold, fontSize: 24, color: colors.white }, brandName: { fontFamily: fonts.headingBold, fontSize: 16, color: colors.ink },
  titleSection: { marginBottom: 32 }, title: { fontFamily: fonts.headingBold, fontSize: 26, color: colors.ink, marginBottom: 8 }, subtitle: { fontFamily: fonts.body, fontSize: 14, color: colors.inkSoft, lineHeight: 20 },
  errorText: { fontFamily: fonts.bodyMedium, fontSize: 13, color: colors.coral, marginBottom: 16, textAlign: "center" }, form: { gap: 20 }, inputGroup: { gap: 8 }, label: { fontFamily: fonts.bodySemiBold, fontSize: 13, color: colors.ink },
  input: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.card, paddingHorizontal: 16, height: 52, fontFamily: fonts.body, fontSize: 15, color: colors.ink },
  passwordWrap: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border, borderRadius: radius.card, flexDirection: "row", alignItems: "center" },
  inputPassword: { flex: 1, height: 52, paddingHorizontal: 16, fontFamily: fonts.body, fontSize: 15, color: colors.ink }, eyeBtn: { padding: 14 }, forgotBtn: { alignSelf: "flex-end" }, forgotText: { fontFamily: fonts.bodySemiBold, fontSize: 13, color: colors.coral },
  cta: { backgroundColor: colors.primary, height: 54, borderRadius: radius.pill, alignItems: "center", justifyContent: "center", marginTop: 8,...shadow.card }, ctaText: { fontFamily: fonts.headingSemiBold, fontSize: 16, color: colors.white },
  dividerWrap: { flexDirection: "row", alignItems: "center", marginVertical: 32, gap: 12 }, dividerLine: { flex: 1, height: 1, backgroundColor: colors.border }, dividerText: { fontFamily: fonts.bodyMedium, fontSize: 13, color: colors.inkSoft },
  secondaryBtn: { backgroundColor: colors.surface, height: 54, borderRadius: radius.pill, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: colors.border }, secondaryBtnText: { fontFamily: fonts.headingSemiBold, fontSize: 16, color: colors.ink },
});