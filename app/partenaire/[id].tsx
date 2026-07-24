import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Svg, { Path, Circle, Polyline } from 'react-native-svg';
import { colors, fonts, radius } from '@/lib/theme';

const ChevronLeft = ({ size = 24, color = colors.ink }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M15 18l-6-6 6-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const Globe = ({ size = 20, color = colors.inkSoft }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth="2" />
    <Path d="M2 12h20" stroke={color} strokeWidth="2" />
    <Path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" stroke={color} strokeWidth="2" />
  </Svg>
);

const Award = ({ size = 20, color = colors.inkSoft }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Circle cx="12" cy="8" r="7" stroke={color} strokeWidth="2" />
    <Polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const ArrowRight = ({ size = 20, color = colors.white }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path d="M5 12h14" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <Path d="M12 5l7 7-7 7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </Svg>
);

const PARTNERS_DATA: Record<string, { name: string; description: string; boursesCount: number; website: string }> = {
  p1: { name: 'Campus France', description: 'Campus France est l\'opérateur du ministère de l\'Europe et des Affaires étrangères pour la promotion de l\'enseignement supérieur français à l\'étranger.', boursesCount: 8, website: 'campusfrance.org' },
  p2: { name: 'DAAD', description: 'Le DAAD est la plus grande organisation de financement au monde pour les échanges internationaux d\'étudiants et de chercheurs.', boursesCount: 5, website: 'daad.de' },
  p3: { name: 'Chevening', description: 'Programme phare de bourses du gouvernement britannique, financé par le Foreign, Commonwealth & Development Office.', boursesCount: 3, website: 'chevening.org' },
  p4: { name: 'UVCI', description: 'L\'Université Virtuelle de Côte d\'Ivoire propose des formations 100% en ligne accessibles à tous.', boursesCount: 2, website: 'uvci.edu.ci' },
};

export default function PartnerDetailPage() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const partner = PARTNERS_DATA[id as string] || PARTNERS_DATA['p1'];

  const initial = partner.name.charAt(0).toUpperCase();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ChevronLeft />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Partenaire</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarText}>{initial}</Text>
          </View>
          <Text style={styles.partnerName}>{partner.name}</Text>
          <Text style={styles.partnerDescription}>{partner.description}</Text>
        </View>

        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <View style={styles.statIconContainer}>
              <Award />
            </View>
            <View style={styles.statInfo}>
              <Text style={styles.statValue}>{partner.boursesCount}</Text>
              <Text style={styles.statLabel}>Bourses actives</Text>
            </View>
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.statItem}>
            <View style={styles.statIconContainer}>
              <Globe />
            </View>
            <View style={styles.statInfo}>
              <Text style={styles.statValue}>{partner.website}</Text>
              <Text style={styles.statLabel}>Site web</Text>
            </View>
          </View>
        </View>

      </ScrollView>

      <View style={styles.bottomBar}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => router.push('/(tabs)/bourses')}
        >
          <Text style={styles.actionButtonText}>Voir les bourses</Text>
          <ArrowRight />
        </TouchableOpacity>
      </View>
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
    boxShadow: "0px 2px 8px rgba(26, 26, 46, 0.05)",
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
  profileSection: {
    alignItems: 'center',
    marginBottom: 32,
    marginTop: 16,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    boxShadow: "0px 4px 12px rgba(107, 47, 160, 0.2)",
  },
  avatarText: {
    fontFamily: fonts.headingBold,
    fontSize: 40,
    color: colors.white,
  },
  partnerName: {
    fontFamily: fonts.headingBold,
    fontSize: 24,
    color: colors.ink,
    textAlign: 'center',
    marginBottom: 12,
  },
  partnerDescription: {
    fontFamily: fonts.bodyMedium,
    fontSize: 15,
    color: colors.inkSoft,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 16,
  },
  statsCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: 24,
    boxShadow: "0px 4px 12px rgba(26, 26, 46, 0.05)",
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  statInfo: {
    flex: 1,
  },
  statValue: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 16,
    color: colors.ink,
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: 14,
    color: colors.inkSoft,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 16,
  },
  bottomBar: {
    padding: 20,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  actionButton: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    boxShadow: "0px 4px 8px rgba(107, 47, 160, 0.2)",
  },
  actionButtonText: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 16,
    color: colors.white,
  },
});
