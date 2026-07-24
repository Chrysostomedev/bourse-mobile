import React, { useRef } from "react";
import { View, Text, StyleSheet, Animated, Pressable, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Svg, { Path, Circle, Rect } from "react-native-svg";
import { colors, fonts } from "@/lib/theme";

const { height, width } = Dimensions.get("window");

export default function AProposScreen() {
  const scrollY = useRef(new Animated.Value(0)).current;

  // Background color interpolation (Côte d'Ivoire -> Avion/Ciel -> Japon)
  const bgColor = scrollY.interpolate({
    inputRange: [0, height, height * 2],
    outputRange: ["#FFF5E1", "#E6F4F1", "#FDE9E9"], // Sun -> Sky -> Sakura
    extrapolate: "clamp",
  });

  // Plane animation
  const planeTranslateX = scrollY.interpolate({
    inputRange: [height * 0.5, height * 1.5],
    outputRange: [-100, width + 100],
    extrapolate: "clamp",
  });
  const planeTranslateY = scrollY.interpolate({
    inputRange: [height * 0.5, height * 1.5],
    outputRange: [height * 0.4, height * 0.1],
    extrapolate: "clamp",
  });

  // Fuji fade in
  const fujiOpacity = scrollY.interpolate({
    inputRange: [height * 1.2, height * 1.8],
    outputRange: [0, 1],
    extrapolate: "clamp",
  });
  
  // Fuji translation
  const fujiTranslateY = scrollY.interpolate({
    inputRange: [height * 1.5, height * 2.5],
    outputRange: [100, 0],
    extrapolate: "clamp",
  });

  return (
    <Animated.View style={[styles.screen, { backgroundColor: bgColor }]}>
      <SafeAreaView style={styles.safeArea} edges={["top"]}>
        <View style={styles.header}>
          <Pressable onPress={() => router.back()} style={styles.backBtn}>
            <BackIcon />
          </Pressable>
        </View>

        {/* --- FIXED BACKGROUND ELEMENTS --- */}
        
        {/* Sun (Abidjan) */}
        <Animated.View style={[styles.sun, {
          opacity: scrollY.interpolate({ inputRange: [0, height * 0.5], outputRange: [1, 0] })
        }]}>
          <Svg width={120} height={120} viewBox="0 0 120 120">
            <Circle cx="60" cy="60" r="50" fill="#FF9A55" opacity={0.8} />
          </Svg>
        </Animated.View>

        {/* Plane SVG instead of emoji */}
        <Animated.View style={[styles.plane, {
          transform: [
            { translateX: planeTranslateX },
            { translateY: planeTranslateY },
            { rotate: "15deg" }
          ],
          opacity: scrollY.interpolate({ inputRange: [height*0.2, height*0.5, height*1.5, height*1.8], outputRange: [0, 1, 1, 0] })
        }]}>
          <Svg width={60} height={60} viewBox="0 0 24 24" fill="none">
            <Path d="M12 2L9 8h6l-3-6z" fill="#4B6A9C" />
            <Path d="M12 22l-4-4h8l-4 4z" fill="#4B6A9C" />
            <Path d="M4 14l6-2v-4L2 10v4l8 2z" fill="#3B82F6" />
            <Path d="M20 14l-6-2v-4l8 2v4l-8 2z" fill="#3B82F6" />
            <Rect x="10" y="8" width="4" height="8" fill="#FFFFFF" />
          </Svg>
        </Animated.View>

        {/* Fuji Mountain */}
        <Animated.View style={[styles.fuji, {
          opacity: fujiOpacity,
          transform: [{ translateY: fujiTranslateY }]
        }]}>
          <Svg width={300} height={200} viewBox="0 0 300 200">
            <Path d="M150 50 L50 200 L250 200 Z" fill="#4B6A9C" />
            <Path d="M150 50 L110 110 L140 100 L160 120 L190 90 Z" fill="#FFFFFF" />
          </Svg>
        </Animated.View>

        {/* --- SCROLLING CONTENT --- */}
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          contentContainerStyle={styles.scrollContent}
        >
          {/* SECTION 1: CÔTE D'IVOIRE */}
          <View style={styles.section}>
            <View style={styles.iconHeroWrap}>
               <Svg width={50} height={50} viewBox="0 0 24 24" fill="none">
                  <Path d="M3 3h18v18H3V3z" fill="#F77F00" />
                  <Path d="M9 3h6v18H9V3z" fill="#FFFFFF" />
                  <Path d="M15 3h6v18h-6V3z" fill="#009E60" />
               </Svg>
            </View>
            <Text style={styles.title}>Les débuts à Abidjan</Text>
            <Text style={styles.text}>
              Tout a commencé avec un rêve : celui de poursuivre ses études à l'étranger pour revenir avec des compétences solides. Elder cherchait sans cesse des opportunités de bourses, mais se heurtait souvent à des informations fragmentées ou des arnaques.
            </Text>
            <Text style={styles.scrollHint}>Scrolle pour voyager 👇</Text>
          </View>

          {/* SECTION 2: LE VOYAGE */}
          <View style={styles.section}>
            <Text style={styles.title}>Le grand saut</Text>
            <Text style={styles.text}>
              Après de multiples tentatives et un dossier minutieusement préparé, le travail finit par payer. La bourse d'excellence est décrochée. C'est le départ pour l'inconnu, loin de la chaleur d'Abidjan, avec pour seule boussole la détermination.
            </Text>
          </View>

          {/* SECTION 3: JAPON & NAISSANCE DE L'APP */}
          <View style={styles.section}>
            <View style={styles.iconHeroWrap}>
               <Svg width={50} height={50} viewBox="0 0 24 24" fill="none">
                  <Path d="M3 3h18v18H3V3z" fill="#FFFFFF" />
                  <Circle cx="12" cy="12" r="4" fill="#BC002D" />
               </Svg>
            </View>
            <Text style={styles.title}>L'inspiration au Japon</Text>
            <Text style={styles.text}>
              Au Japon, plongé dans l'innovation et la rigueur, Elder réalise que de nombreux autres étudiants méritants abandonnent face à la complexité des démarches. C'est là que l'idée de "Bourse Pour Tous" est née : démocratiser l'accès à l'information fiable et sécuriser le parcours des étudiants.
            </Text>
            
            <View style={styles.missionCard}>
              <Text style={styles.missionTitle}>Notre Mission</Text>
              <Text style={styles.missionText}>
                Faire en sorte qu'aucun talent ne soit gâché par manque d'information ou par peur des arnaques.
              </Text>
            </View>
          </View>

        </Animated.ScrollView>
      </SafeAreaView>
    </Animated.View>
  );
}

function BackIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M15 18l-6-6 6-6" stroke={colors.ink} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1 },
  safeArea: { flex: 1 },
  header: { padding: 20, zIndex: 10 },
  backBtn: { width: 40, height: 40, justifyContent: "center", backgroundColor: "rgba(255,255,255,0.5)", borderRadius: 20, alignItems: "center" },
  scrollContent: { paddingBottom: 100 },
  section: { height: height, justifyContent: "center", paddingHorizontal: 32 },
  iconHeroWrap: { marginBottom: 16, width: 64, height: 64, borderRadius: 32, backgroundColor: "rgba(0,0,0,0.05)", alignItems: "center", justifyContent: "center" },
  title: { fontFamily: fonts.headingBold, fontSize: 32, color: colors.ink, marginBottom: 16, lineHeight: 38 },
  text: { fontFamily: fonts.body, fontSize: 16, color: colors.inkSoft, lineHeight: 26 },
  scrollHint: { fontFamily: fonts.bodySemiBold, fontSize: 14, color: colors.primary, marginTop: 40, textAlign: "center", opacity: 0.8 },
  missionCard: { marginTop: 40, backgroundColor: "rgba(255,255,255,0.8)", padding: 24, borderRadius: 20 },
  missionTitle: { fontFamily: fonts.headingBold, fontSize: 18, color: colors.primary, marginBottom: 8 },
  missionText: { fontFamily: fonts.bodySemiBold, fontSize: 15, color: colors.ink, lineHeight: 22 },
  
  /* Animated elements */
  sun: { position: "absolute", top: 100, right: 20, zIndex: 0 },
  plane: { position: "absolute", top: 0, left: 0, zIndex: 1 },
  fuji: { position: "absolute", bottom: -50, left: Dimensions.get("window").width / 2 - 150, zIndex: 0 },
});
