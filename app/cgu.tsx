import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Svg, { Path } from 'react-native-svg';
import { colors, fonts, radius } from '@/lib/theme';

const ArrowLeftIcon = ({ size = 24, color = colors.ink }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M19 12H5" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M12 19L5 12L12 5" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const InfoIcon = ({ size = 24, color = colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M12 16V12" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M12 8H12.01" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

export default function CguScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeftIcon size={24} color={colors.ink} />
        </Pressable>
        <Text style={styles.headerTitle}>Conditions Générales d'Utilisation</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scrollContent} contentContainerStyle={styles.scrollContentContainer}>
        
        {/* TL;DR Box */}
        <View style={styles.tldrBox}>
          <View style={styles.tldrHeader}>
            <InfoIcon size={20} color={colors.primary} />
            <Text style={styles.tldrTitle}>En bref</Text>
          </View>
          <Text style={styles.tldrText}>
            En utilisant Bourse Pour Tous, vous acceptez de respecter nos règles. L'application est destinée à vous aider dans la recherche de bourses d'études. Gardez vos identifiants secrets et utilisez le service de manière responsable.
          </Text>
        </View>

        {/* Content Sections */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>1. Acceptation des conditions</Text>
          <Text style={styles.sectionText}>
            L'accès et l'utilisation de l'application Bourse Pour Tous sont soumis à l'acceptation et au respect des présentes Conditions Générales d'Utilisation (CGU). En créant un compte ou en naviguant sur l'application, vous acceptez ces conditions dans leur intégralité.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>2. Description du service</Text>
          <Text style={styles.sectionText}>
            Bourse Pour Tous est une plateforme qui permet aux étudiants de rechercher et de postuler à diverses bourses d'études. Nous mettons à disposition des informations provenant de différentes institutions, mais nous ne garantissons pas l'obtention d'une bourse.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>3. Inscription et compte utilisateur</Text>
          <Text style={styles.sectionText}>
            Pour accéder à certaines fonctionnalités, vous devez créer un compte. Vous vous engagez à fournir des informations exactes et à les maintenir à jour. Vous êtes responsable de la confidentialité de vos identifiants de connexion.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>4. Propriété intellectuelle</Text>
          <Text style={styles.sectionText}>
            Tous les contenus présents sur l'application (textes, images, logos, design) sont la propriété de Bourse Pour Tous ou de ses partenaires. Toute reproduction, copie ou utilisation non autorisée est strictement interdite.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>5. Limitation de responsabilité</Text>
          <Text style={styles.sectionText}>
            L'application est fournie "en l'état". Nous nous efforçons de maintenir le service accessible et les informations à jour, mais nous ne pouvons être tenus responsables d'éventuels problèmes techniques ou d'erreurs dans les offres de bourses.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>6. Modification des CGU</Text>
          <Text style={styles.sectionText}>
            Nous nous réservons le droit de modifier ces CGU à tout moment. Les utilisateurs seront informés des changements importants. En continuant à utiliser l'application après ces modifications, vous acceptez les nouvelles conditions.
          </Text>
        </View>

        <View style={styles.footerSpace} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  headerTitle: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 16,
    color: colors.ink,
    flex: 1,
    textAlign: 'center',
  },
  scrollContent: {
    flex: 1,
  },
  scrollContentContainer: {
    padding: 20,
  },
  tldrBox: {
    backgroundColor: colors.primary + '15', // 15% opacity primary color
    padding: 20,
    borderRadius: radius.card,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: colors.primary + '30',
  },
  tldrHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  tldrTitle: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 16,
    color: colors.primary,
  },
  tldrText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    color: colors.ink,
    lineHeight: 22,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 18,
    color: colors.ink,
    marginBottom: 12,
  },
  sectionText: {
    fontFamily: fonts.body,
    fontSize: 15,
    color: colors.inkSoft,
    lineHeight: 24,
  },
  footerSpace: {
    height: 40,
  },
});
