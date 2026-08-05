import { SuccessToast } from "@/components/ui/SuccessToast";
import { useAuth } from "@/hooks/useAuth";
import { colors, fonts, radius, shadow } from "@/lib/theme";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useState } from "react";
import { ActivityIndicator, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Svg, { Circle, Path, Rect } from "react-native-svg";

export default function InscriptionScreen() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const { register, isLoading, error } = useAuth();

  const handleRegister = async () => {
    const name = `${firstName.trim()} ${lastName.trim()}`.trim();
    if (!name || !email.trim() || !password || password !== confirmPassword) return;
    try {
      await register({ name, email: email.trim(), password, password_confirmation: confirmPassword, phone: null });
      setShowSuccess(true);
      setTimeout(() => router.replace("/(tabs)"), 900);
    } catch { }
  };

  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <SuccessToast visible={showSuccess} title="Compte créé !" subtitle="Bienvenue sur Bourse Pour Tous" onHide={() => setShowSuccess(false)} />
      <KeyboardAvoidingView style={styles.keyboardView} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.header}>
            <LinearGradient
              colors={[colors.primary, colors.primaryLight]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.logoWrap}
            >
              <Text style={styles.logoText}>B</Text>
            </LinearGradient>
          </View>
          <View style={styles.titleSection}>
            <Text style={styles.title}>Crée ton compte</Text>
            <Text style={styles.subtitle}>Gratuit. Toujours.</Text>
          </View>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <View style={styles.form}>
            <View style={styles.row}>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.label}>Prénom</Text>
                <View style={[styles.inputWrap, focusedField === 'firstName' && styles.inputWrapFocused]}>
                  <View style={styles.inputIcon}>
                    <UserFieldIcon color={focusedField === 'firstName' ? colors.primary : colors.inkSoft} />
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Ex: Kader"
                    placeholderTextColor={colors.inkSoft + "80"}
                    value={firstName}
                    onChangeText={setFirstName}
                    onFocus={() => setFocusedField('firstName')}
                    onBlur={() => setFocusedField(null)}
                  />
                </View>
              </View>
              <View style={[styles.inputGroup, { flex: 1 }]}>
                <Text style={styles.label}>Nom</Text>
                <View style={[styles.inputWrap, focusedField === 'lastName' && styles.inputWrapFocused]}>
                  <View style={styles.inputIcon}>
                    <UserFieldIcon color={focusedField === 'lastName' ? colors.primary : colors.inkSoft} />
                  </View>
                  <TextInput
                    style={styles.input}
                    placeholder="Ex: Touré"
                    placeholderTextColor={colors.inkSoft + "80"}
                    value={lastName}
                    onChangeText={setLastName}
                    onFocus={() => setFocusedField('lastName')}
                    onBlur={() => setFocusedField(null)}
                  />
                </View>
              </View>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Adresse e-mail</Text>
              <View style={[styles.inputWrap, focusedField === 'email' && styles.inputWrapFocused]}>
                <View style={styles.inputIcon}>
                  <EmailFieldIcon color={focusedField === 'email' ? colors.primary : colors.inkSoft} />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="elder@exemple.com"
                  placeholderTextColor={colors.inkSoft + "80"}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={email}
                  onChangeText={setEmail}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                />
              </View>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mot de passe</Text>
              <View style={[styles.inputWrap, focusedField === 'password' && styles.inputWrapFocused]}>
                <View style={styles.inputIcon}>
                  <LockFieldIcon color={focusedField === 'password' ? colors.primary : colors.inkSoft} />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor={colors.inkSoft + "80"}
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                />
                <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
                  {showPassword ? <EyeOffIcon /> : <EyeIcon />}
                </Pressable>
              </View>
            </View>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Confirmer le mot de passe</Text>
              <View style={[styles.inputWrap, focusedField === 'confirmPassword' && styles.inputWrapFocused]}>
                <View style={styles.inputIcon}>
                  <LockFieldIcon color={focusedField === 'confirmPassword' ? colors.primary : colors.inkSoft} />
                </View>
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor={colors.inkSoft + "80"}
                  secureTextEntry={!showConfirmPassword}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  onFocus={() => setFocusedField('confirmPassword')}
                  onBlur={() => setFocusedField(null)}
                />
                <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.eyeBtn}>
                  {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
                </Pressable>
              </View>
            </View>
            <Pressable style={styles.ctaPressable} onPress={handleRegister} disabled={isLoading}>
              <LinearGradient
                colors={[colors.primary, colors.primaryLight]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[styles.ctaGradient, isLoading && { opacity: 0.7 }]}
              >
                {isLoading ? <ActivityIndicator color={colors.white} /> : <Text style={styles.ctaText}>Créer mon compte</Text>}
              </LinearGradient>
            </Pressable>
          </View>
          <View style={styles.footerLinks}>
            <Pressable onPress={() => router.push("/login/connexion")} style={styles.linkWrap}>
              <Text style={styles.linkText}>{"J'ai déjà un compte"}</Text>
            </Pressable>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function EyeIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke={colors.inkSoft} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Circle cx="12" cy="12" r="3" stroke={colors.inkSoft} strokeWidth={2} />
    </Svg>
  );
}

function EyeOffIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" stroke={colors.inkSoft} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function UserFieldIcon({ color }: { color: string }) {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="8" r="4" stroke={color} strokeWidth={2} />
      <Path d="M20 21a8 8 0 00-16 0" stroke={color} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

function EmailFieldIcon({ color }: { color: string }) {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke={color} strokeWidth={2} strokeLinejoin="round" />
      <Path d="M22 6l-10 7L2 6" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function LockFieldIcon({ color }: { color: string }) {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Rect x="3" y="11" width="18" height="11" rx="2" ry="2" stroke={color} strokeWidth={2} />
      <Path d="M7 11V7a5 5 0 0110 0v4" stroke={color} strokeWidth={2} />
    </Svg>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  keyboardView: { flex: 1 },
  scrollContent: { padding: 24, paddingBottom: 40 },
  header: { alignItems: "center", marginBottom: 24, marginTop: 10 },
  logoWrap: { width: 56, height: 56, borderRadius: 28, alignItems: "center", justifyContent: "center", ...shadow.card },
  logoText: { fontFamily: fonts.headingBold, fontSize: 28, color: colors.white },
  titleSection: { marginBottom: 32, alignItems: "center" },
  title: { fontFamily: fonts.headingBold, fontSize: 26, color: colors.ink, marginBottom: 6 },
  subtitle: { fontFamily: fonts.bodySemiBold, fontSize: 14, color: colors.coral },
  errorText: { fontFamily: fonts.bodyMedium, fontSize: 13, color: colors.coral, marginBottom: 16, textAlign: "center" },
  form: { gap: 20 },
  row: { flexDirection: "row", gap: 16 },
  inputGroup: { gap: 8 },
  label: { fontFamily: fonts.bodySemiBold, fontSize: 13, color: colors.ink, marginLeft: 4 },
  inputWrap: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.card,
    paddingHorizontal: 14,
    height: 54,
    ...Platform.select({
      ios: {
        shadowColor: colors.ink,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.02,
        shadowRadius: 4,
      },
      android: {
        elevation: 1,
      }
    })
  },
  inputWrapFocused: {
    borderColor: colors.primary,
    ...Platform.select({
      ios: {
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      }
    })
  },
  inputIcon: {
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    flex: 1,
    height: "100%",
    fontFamily: fonts.body,
    fontSize: 15,
    color: colors.ink,
  },
  eyeBtn: {
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  ctaPressable: {
    marginTop: 12,
    borderRadius: radius.pill,
    overflow: "hidden",
    ...shadow.card,
  },
  ctaGradient: {
    height: 54,
    alignItems: "center",
    justifyContent: "center",
  },
  ctaText: { fontFamily: fonts.headingSemiBold, fontSize: 16, color: colors.white },
  footerLinks: { marginTop: 32, alignItems: "center", gap: 20 },
  linkWrap: { padding: 8 },
  linkText: { fontFamily: fonts.headingSemiBold, fontSize: 14, color: colors.primary },
  skipText: { fontFamily: fonts.bodyMedium, fontSize: 13, color: colors.inkSoft },
});