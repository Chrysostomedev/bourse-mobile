import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Svg, { Path } from 'react-native-svg';
import { colors, fonts, radius } from '@/lib/theme';

const ChevronLeft = ({ size = 24, color = colors.ink }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M15 18l-6-6 6-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const Megaphone = ({ size = 48, color = colors.white }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M3 11l18-5v12L3 14v-3z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M11.6 16.8a3 3 0 11-5.8-1.6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const Phone = ({ size = 20, color = colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const Mail = ({ size = 20, color = colors.primary }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M22 6l-10 7L2 6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const Check = ({ size = 16, color = colors.like }: { size?: number; color?: string }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M20 6L9 17l-5-5" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const PACKS = [
  {
    name: 'Bronze',
    price: '50 000 FCFA',
    period: '/mois',
    features: ['1 notification push', 'Bannière standard', 'Statistiques de base'],
    color: '#CD7F32'
  },
  {
    name: 'Silver',
    price: '100 000 FCFA',
    period: '/mois',
    features: ['3 notifications push', 'Bannière prioritaire', 'Statistiques détaillées', 'Mise en avant sur l\'accueil'],
    color: '#C0C0C0',
    popular: true
  },
  {
    name: 'Gold',
    price: '200 000 FCFA',
    period: '/mois',
    features: ['Notifications illimitées', 'Bannière exclusive', 'Rapport personnalisé', 'Partenariat officiel', 'Logo sur la splash screen'],
    color: colors.gold
  }
];

export default function ContactPage() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Partenariat</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.heroSection}>
          <View style={styles.iconContainer}>
            <Megaphone />
          </View>
          <Text style={styles.heroTitle}>Publicité & Partenariat</Text>
          <Text style={styles.heroSubtitle}>Touchez +12 000 étudiants africains ambitieux</Text>
        </View>

        <View style={styles.contactCard}>
          <View style={styles.contactRow}>
            <View style={styles.contactIcon}>
              <Phone />
            </View>
            <Text style={styles.contactText}>+225 07 00 51 82 51</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.contactRow}>
            <View style={styles.contactIcon}>
              <Mail />
            </View>
            <Text style={styles.contactText}>pub@boursespourtous.com</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Nos Offres</Text>

        <View style={styles.packsContainer}>
          {PACKS.map((pack, index) => (
            <View key={index} style={[styles.packCard, pack.popular && styles.packCardPopular]}>
              {pack.popular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularText}>Recommandé</Text>
                </View>
              )}
              <Text style={[styles.packName, { color: pack.color }]}>{pack.name}</Text>
              <View style={styles.priceContainer}>
                <Text style={styles.packPrice}>{pack.price}</Text>
                <Text style={styles.packPeriod}>{pack.period}</Text>
              </View>
              <View style={styles.featuresList}>
                {pack.features.map((feature, i) => (
                  <View key={i} style={styles.featureRow}>
                    <Check color={pack.color} />
                    <Text style={styles.featureText}>{feature}</Text>
                  </View>
                ))}
              </View>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.ctaButton}>
          <Text style={styles.ctaText}>Nous Contacter</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  headerTitle: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 16,
    color: colors.ink,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  heroSection: {
    backgroundColor: colors.primary,
    borderRadius: radius.card,
    padding: 32,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 4,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  heroTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 24,
    color: colors.white,
    textAlign: 'center',
    marginBottom: 8,
  },
  heroSubtitle: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
  },
  contactCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: 20,
    marginBottom: 32,
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  contactRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  contactText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 15,
    color: colors.ink,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 16,
  },
  sectionTitle: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 18,
    color: colors.ink,
    marginBottom: 16,
  },
  packsContainer: {
    gap: 16,
    marginBottom: 32,
  },
  packCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.ink,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  packCardPopular: {
    borderColor: colors.primary,
    borderWidth: 2,
    backgroundColor: '#FAF7FC',
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    right: 24,
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: radius.pill,
  },
  popularText: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 12,
    color: colors.white,
  },
  packName: {
    fontFamily: fonts.headingBold,
    fontSize: 18,
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 20,
  },
  packPrice: {
    fontFamily: fonts.headingBold,
    fontSize: 24,
    color: colors.ink,
  },
  packPeriod: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    color: colors.inkSoft,
    marginLeft: 4,
  },
  featuresList: {
    gap: 12,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    color: colors.inkSoft,
    marginLeft: 12,
    flex: 1,
  },
  ctaButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    paddingVertical: 16,
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  ctaText: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 16,
    color: colors.white,
  },
});
