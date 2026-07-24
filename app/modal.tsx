import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Pressable, Animated } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import Svg, { Path, Circle } from "react-native-svg";
import { colors, fonts, radius, shadow } from "@/lib/theme";

export default function NotificationModal() {
  const { title, message, type } = useLocalSearchParams<{ title: string, message: string, type: string }>();
  const slideAnim = useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: 0,
      tension: 50,
      friction: 8,
      useNativeDriver: true,
    }).start();
  }, []);

  const close = () => {
    Animated.timing(slideAnim, {
      toValue: -150,
      duration: 200,
      useNativeDriver: true,
    }).start(() => router.back());
  };

  const isAlert = type === "alert";
  const isSuccess = type === "success";

  return (
    <View style={styles.overlay}>
      <Pressable style={styles.backdrop} onPress={close} />
      
      <Animated.View style={[styles.modalCard, { transform: [{ translateY: slideAnim }] }]}>
        <View style={[styles.iconWrap, isAlert && { backgroundColor: "#FDE9E9" }, isSuccess && { backgroundColor: "#E9F9F0" }]}>
          {isAlert ? <AlertIcon /> : isSuccess ? <SuccessIcon /> : <InfoIcon />}
        </View>
        
        <View style={styles.textWrap}>
          <Text style={styles.title}>{title || "Notification"}</Text>
          <Text style={styles.message}>{message || "Tu as reçu un nouveau message."}</Text>
        </View>

        <Pressable onPress={close} style={styles.closeBtn}>
          <CloseIcon />
        </Pressable>
      </Animated.View>
    </View>
  );
}

function SuccessIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path d="M20 6L9 17l-5-5" stroke={colors.like} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

function AlertIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" stroke={colors.alert} strokeWidth={2.5} />
      <Path d="M12 8v4M12 16h.01" stroke={colors.alert} strokeWidth={2.5} strokeLinecap="round" />
    </Svg>
  );
}

function InfoIcon() {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="12" r="10" stroke={colors.primary} strokeWidth={2.5} />
      <Path d="M12 16v-4M12 8h.01" stroke={colors.primary} strokeWidth={2.5} strokeLinecap="round" />
    </Svg>
  );
}

function CloseIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M18 6L6 18M6 6l12 12" stroke={colors.inkSoft} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)" },
  backdrop: { ...StyleSheet.absoluteFillObject },
  modalCard: { 
    marginHorizontal: 16, 
    marginTop: 60, 
    backgroundColor: colors.surface, 
    borderRadius: radius.card, 
    padding: 16, 
    flexDirection: "row", 
    alignItems: "flex-start", 
    gap: 16,
    ...shadow.card 
  },
  iconWrap: { width: 44, height: 44, borderRadius: 22, backgroundColor: "#F1E9FA", alignItems: "center", justifyContent: "center" },
  textWrap: { flex: 1 },
  title: { fontFamily: fonts.headingSemiBold, fontSize: 15, color: colors.ink, marginBottom: 4 },
  message: { fontFamily: fonts.body, fontSize: 13, color: colors.inkSoft, lineHeight: 18 },
  closeBtn: { padding: 4 },
});
