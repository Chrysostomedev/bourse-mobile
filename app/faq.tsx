import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable, Animated, LayoutAnimation } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Svg, { Path } from "react-native-svg";
import { colors, fonts, radius, shadow } from "@/lib/theme";

const FAQ_DATA = [
  {
    question: "Comment savoir si une bourse est une arnaque ?",
    answer: "Une vraie bourse ne te demandera jamais de payer des frais de dossier à l'avance par mobile money ou virement direct à un individu. Bourse Pour Tous vérifie manuellement chaque offre avant de la publier.",
  },
  {
    question: "Dois-je payer pour utiliser l'application ?",
    answer: "Non, l'application est 100% gratuite. Nous proposons des services additionnels (coaching, e-books) en option pour ceux qui souhaitent un accompagnement personnalisé, mais l'accès aux bourses reste gratuit.",
  },
  {
    question: "Comment augmenter mes chances ?",
    answer: "Soigne ta lettre de motivation, assure-toi d'avoir d'excellents résultats académiques et commence tes démarches au moins 6 mois avant la date limite. N'hésite pas à consulter nos ressources dans l'onglet Services.",
  }
];

export default function FAQScreen() {
  return (
    <SafeAreaView style={styles.screen} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backBtn}>
          <BackIcon />
        </Pressable>
        <Text style={styles.headerTitle}>FAQ</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.pageTitle}>Questions fréquentes</Text>
        <Text style={styles.pageDesc}>Retrouve ici les réponses aux questions les plus posées par la communauté.</Text>

        <View style={styles.list}>
          {FAQ_DATA.map((item, index) => (
            <FAQItem key={index} question={item.question} answer={item.answer} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsOpen(!isOpen);
  };

  return (
    <View style={styles.faqCard}>
      <Pressable onPress={toggleOpen} style={styles.faqHeader}>
        <Text style={styles.question}>{question}</Text>
        <View style={[styles.iconWrap, isOpen && styles.iconWrapOpen]}>
          <Text style={[styles.icon, isOpen && styles.iconOpen]}>{isOpen ? "−" : "+"}</Text>
        </View>
      </Pressable>
      {isOpen && (
        <View style={styles.answerWrap}>
          <Text style={styles.answer}>{answer}</Text>
        </View>
      )}
    </View>
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
  screen: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: 20, paddingVertical: 12, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border },
  backBtn: { padding: 8, marginLeft: -8 },
  headerTitle: { fontFamily: fonts.headingSemiBold, fontSize: 16, color: colors.ink },
  content: { padding: 20 },
  pageTitle: { fontFamily: fonts.headingBold, fontSize: 24, color: colors.ink, marginBottom: 8 },
  pageDesc: { fontFamily: fonts.body, fontSize: 15, color: colors.inkSoft, marginBottom: 24, lineHeight: 22 },
  list: { gap: 12 },
  faqCard: { backgroundColor: colors.surface, borderRadius: radius.card, padding: 16, ...shadow.card },
  faqHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 16 },
  question: { flex: 1, fontFamily: fonts.headingSemiBold, fontSize: 15, color: colors.ink, lineHeight: 20 },
  iconWrap: { width: 28, height: 28, borderRadius: 14, backgroundColor: colors.background, alignItems: "center", justifyContent: "center" },
  iconWrapOpen: { backgroundColor: colors.primary },
  icon: { fontFamily: fonts.bodyMedium, fontSize: 20, color: colors.primary, marginTop: -2 },
  iconOpen: { color: colors.white },
  answerWrap: { marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: colors.border },
  answer: { fontFamily: fonts.body, fontSize: 14, color: colors.inkSoft, lineHeight: 22 },
});
