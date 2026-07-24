import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, Linking } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path, Circle, Rect } from 'react-native-svg';
import { getServiceById } from '@/data/mock-services';
import { colors, fonts, radius, shadow } from '@/lib/theme';

function ServiceIcon({ name, color = colors.white }: { name: string; color?: string }) {
  switch (name) {
    case 'briefcase':
      return (
        <Svg width={48} height={48} viewBox="0 0 24 24" fill="none">
          <Rect x="2" y="7" width="20" height="14" rx="2" stroke={color} strokeWidth={2} />
          <Path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" stroke={color} strokeWidth={2} />
        </Svg>
      );
    case 'video':
      return (
        <Svg width={48} height={48} viewBox="0 0 24 24" fill="none">
          <Rect x="2" y="6" width="14" height="12" rx="2" stroke={color} strokeWidth={2} />
          <Path d="M22 8l-6 3v2l6 3V8z" stroke={color} strokeWidth={2} strokeLinejoin="round" />
        </Svg>
      );
    case 'book':
      return (
        <Svg width={48} height={48} viewBox="0 0 24 24" fill="none">
          <Path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2V3z" stroke={color} strokeWidth={2} />
          <Path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7V3z" stroke={color} strokeWidth={2} />
        </Svg>
      );
    case 'document':
      return (
        <Svg width={48} height={48} viewBox="0 0 24 24" fill="none">
          <Path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke={color} strokeWidth={2} />
          <Path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke={color} strokeWidth={2} strokeLinecap="round" />
        </Svg>
      );
    default:
      return (
        <Svg width={48} height={48} viewBox="0 0 24 24" fill="none">
          <Circle cx="12" cy="12" r="10" stroke={color} strokeWidth={2} />
          <Path d="M12 8v4l3 3" stroke={color} strokeWidth={2} strokeLinecap="round" />
        </Svg>
      );
  }
}

export default function ServiceDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const service = getServiceById(id);

  if (!service) {
    return (
      <SafeAreaView style={styles.center} edges={['top', 'bottom']}>
        <Text style={styles.errorText}>Service introuvable</Text>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backBtnText}>Retour</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const handleOrder = () => {
    const message = `Bonjour, je suis intéressé par le service : ${service.title}`;
    Linking.openURL(`https://wa.me/2250700518251?text=${encodeURIComponent(message)}`);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent} bounces={false}>
        <LinearGradient
          colors={[colors.primaryLight, colors.primaryDark]}
          style={styles.hero}
        >
          <View style={styles.header}>
            <Pressable onPress={() => router.back()} style={styles.iconButton}>
              <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
                <Path d="M19 12H5M12 19l-7-7 7-7" stroke={colors.white} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
              </Svg>
            </Pressable>
          </View>
          
          <View style={styles.heroContent}>
            <View style={styles.iconWrapper}>
              <ServiceIcon name={service.icon} />
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{service.category}</Text>
            </View>
            <Text style={styles.title}>{service.title}</Text>
            <Text style={styles.price}>{service.price}</Text>
          </View>
        </LinearGradient>

        <View style={styles.body}>
          <Text style={styles.sectionTitle}>Description du service</Text>
          <Text style={styles.description}>{service.description}</Text>

          <View style={styles.contactCard}>
            <Text style={styles.contactTitle}>Besoin d'informations ?</Text>
            <Text style={styles.contactText}>Contactez-nous sur WhatsApp :</Text>
            <Text style={styles.contactPhone}>+225 07 00 51 82 51</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Pressable style={styles.ctaButton} onPress={handleOrder}>
          <Text style={styles.ctaButtonText}>Commander via WhatsApp</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.background },
  errorText: { fontFamily: fonts.headingBold, fontSize: 18, color: colors.ink, marginBottom: 16 },
  backBtn: { backgroundColor: colors.primary, paddingHorizontal: 20, paddingVertical: 10, borderRadius: radius.pill },
  backBtnText: { color: colors.white, fontFamily: fonts.headingSemiBold },
  scrollContent: { paddingBottom: 100 },
  hero: { paddingBottom: 40, borderBottomLeftRadius: 32, borderBottomRightRadius: 32 },
  header: { paddingHorizontal: 20, paddingTop: 16, flexDirection: 'row', alignItems: 'center' },
  iconButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center' },
  heroContent: { alignItems: 'center', marginTop: 20, paddingHorizontal: 20 },
  iconWrapper: { width: 80, height: 80, borderRadius: 40, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', marginBottom: 16 },
  badge: { backgroundColor: 'rgba(255,255,255,0.25)', paddingHorizontal: 12, paddingVertical: 6, borderRadius: radius.pill, marginBottom: 16 },
  badgeText: { fontFamily: fonts.headingSemiBold, fontSize: 12, color: colors.white, textTransform: 'uppercase' },
  title: { fontFamily: fonts.headingBold, fontSize: 24, color: colors.white, textAlign: 'center', marginBottom: 8 },
  price: { fontFamily: fonts.headingBold, fontSize: 20, color: colors.gold },
  body: { padding: 24 },
  sectionTitle: { fontFamily: fonts.headingBold, fontSize: 18, color: colors.ink, marginBottom: 12 },
  description: { fontFamily: fonts.body, fontSize: 15, color: colors.inkSoft, lineHeight: 24, marginBottom: 32 },
  contactCard: { backgroundColor: colors.surface, padding: 20, borderRadius: radius.card, ...shadow.card, alignItems: 'center' },
  contactTitle: { fontFamily: fonts.headingSemiBold, fontSize: 16, color: colors.ink, marginBottom: 8 },
  contactText: { fontFamily: fonts.body, fontSize: 14, color: colors.inkSoft, marginBottom: 4 },
  contactPhone: { fontFamily: fonts.headingBold, fontSize: 16, color: colors.primary },
  footer: { position: 'absolute', bottom: 0, left: 0, right: 0, padding: 20, backgroundColor: colors.surface, ...shadow.floating },
  ctaButton: { backgroundColor: colors.like, paddingVertical: 16, borderRadius: radius.pill, alignItems: 'center' },
  ctaButtonText: { fontFamily: fonts.headingBold, fontSize: 16, color: colors.white },
});
