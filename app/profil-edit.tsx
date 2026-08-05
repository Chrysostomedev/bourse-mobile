import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Svg, { Path, Circle } from "react-native-svg";
import { colors, fonts, radius } from "@/lib/theme";
import { Toast } from "@/core/toast";
import { useAuth } from "@/hooks/useAuth";

export default function ProfilEditScreen() {
  const router = useRouter();
  const { user, updateProfile } = useAuth();

  const [name, setName] = useState(user?.name ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [bio, setBio] = useState(user?.bio ?? "");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      Toast.error("Le nom est requis", "Erreur");
      return;
    }

    if (!email.trim() || !email.includes("@")) {
      Toast.error("Entrez un email valide", "Erreur");
      return;
    }

    try {
      setIsLoading(true);
      await updateProfile({
        name: name.trim(),
        email: email.trim(),
        bio: bio.trim(),
      });
      Toast.success("Profil mis à jour avec succès !", "Succès");
      router.back();
    } catch (error: any) {
      Toast.error(
        error.errorMessage ?? "Impossible de mettre à jour le profil",
        "Erreur"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    if (
      name !== user?.name ||
      email !== user?.email ||
      bio !== (user?.bio ?? "")
    ) {
      Alert.alert(
        "Abandon",
        "Vous avez des modifications non sauvegardées. Continuer ?",
        [
          { text: "Continuer", onPress: () => router.back() },
          { text: "Annuler", style: "cancel" },
        ]
      );
    } else {
      router.back();
    }
  };

  return (
    <SafeAreaView style={styles.screen} edges={["top"]}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={handleCancel} hitSlop={8}>
          <BackIcon />
        </Pressable>
        <Text style={styles.headerTitle}>Modifier le profil</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Avatar */}
        <View style={styles.avatarSection}>
          <View style={styles.avatar}>
            <Text style={styles.avatarInitials}>
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()
                .slice(0, 2)}
            </Text>
          </View>
          <Pressable style={styles.changePhotoButton}>
            <CameraIcon />
            <Text style={styles.changePhotoText}>Changer la photo</Text>
          </Pressable>
        </View>

        {/* Form Fields */}
        <View style={styles.form}>
          {/* Name */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Nom complet</Text>
            <TextInput
              style={styles.input}
              placeholder="Votre nom"
              value={name}
              onChangeText={setName}
              editable={!isLoading}
              placeholderTextColor={colors.inkSoft}
            />
          </View>

          {/* Email */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="votre.email@exemple.com"
              value={email}
              onChangeText={setEmail}
              editable={!isLoading}
              keyboardType="email-address"
              placeholderTextColor={colors.inkSoft}
            />
          </View>

          {/* Bio */}
          <View style={styles.formGroup}>
            <Text style={styles.label}>Bio (optionnel)</Text>
            <TextInput
              style={[styles.input, styles.bioInput]}
              placeholder="Dites quelque chose sur vous..."
              value={bio}
              onChangeText={setBio}
              editable={!isLoading}
              multiline
              numberOfLines={3}
              maxLength={150}
              placeholderTextColor={colors.inkSoft}
            />
            <Text style={styles.charCount}>
              {bio.length}/150
            </Text>
          </View>

          {/* Info Box */}
          <View style={styles.infoBox}>
            <InfoIcon />
            <View style={{ flex: 1 }}>
              <Text style={styles.infoTitle}>Données de compte</Text>
              <Text style={styles.infoText}>
                Votre email est utilisé pour se connecter et recevoir les
                notifications.
              </Text>
            </View>
          </View>
        </View>

        {/* Buttons */}
        <View style={styles.actions}>
          <Pressable
            style={[styles.button, styles.cancelButton]}
            onPress={handleCancel}
            disabled={isLoading}
          >
            <Text style={styles.cancelButtonText}>Annuler</Text>
          </Pressable>

          <Pressable
            style={[styles.button, styles.saveButton, isLoading && styles.buttonDisabled]}
            onPress={handleSave}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator size="small" color={colors.white} />
            ) : (
              <Text style={styles.saveButtonText}>Enregistrer les modifications</Text>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function BackIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M15 18l-6-6 6-6"
        stroke={colors.ink}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

function CameraIcon() {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24" fill="none">
      <Path
        d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"
        stroke={colors.primary}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Circle cx="12" cy="13" r="4" stroke={colors.primary} strokeWidth={2} />
    </Svg>
  );
}

function InfoIcon() {
  return (
    <Svg width={18} height={18} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" stroke={colors.primary} strokeWidth={2} />
      <Path
        d="M12 16v-4M12 8h.01"
        stroke={colors.primary}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}



const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerTitle: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 18,
    color: colors.ink,
  },
  content: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    paddingBottom: 40,
  },
  avatarSection: {
    alignItems: "center",
    marginBottom: 32,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  avatarInitials: {
    fontFamily: fonts.headingBold,
    fontSize: 28,
    color: colors.white,
  },
  changePhotoButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  changePhotoText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 13,
    color: colors.primary,
  },
  form: {
    gap: 20,
    marginBottom: 24,
  },
  formGroup: {
    gap: 8,
  },
  label: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 14,
    color: colors.ink,
  },
  input: {
    fontFamily: fonts.body,
    fontSize: 15,
    color: colors.ink,
    backgroundColor: colors.surface,
    borderRadius: radius.button,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  bioInput: {
    paddingTop: 12,
    textAlignVertical: "top",
    height: 100,
  },
  charCount: {
    fontFamily: fonts.body,
    fontSize: 11,
    color: colors.inkSoft,
    textAlign: "right",
    marginTop: 4,
  },
  infoBox: {
    flexDirection: "row",
    gap: 12,
    backgroundColor: "#F0F7FF",
    borderRadius: radius.button,
    padding: 12,
    marginTop: 8,
  },
  infoTitle: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 13,
    color: colors.ink,
  },
  infoText: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.inkSoft,
    marginTop: 2,
  },
  actions: {
    gap: 12,
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: radius.button,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  cancelButtonText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 15,
    color: colors.ink,
  },
  saveButton: {
    backgroundColor: colors.primary,
  },
  saveButtonText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 15,
    color: colors.white,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
});
