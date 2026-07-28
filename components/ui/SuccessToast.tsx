import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { colors, fonts, radius } from "@/lib/theme";

type Props = { visible: boolean; title: string; subtitle?: string; onHide?: () => void; };

export function SuccessToast({ visible, title, subtitle, onHide }: Props) {
  const anim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (visible) {
      Animated.spring(anim, { toValue: 1, useNativeDriver: true, damping: 14 }).start();
      const t = setTimeout(() => {
        Animated.timing(anim, { toValue: 0, duration: 200, useNativeDriver: true }).start(() => onHide?.());
      }, 2000);
      return () => clearTimeout(t);
    }
  }, [visible]);

  if (!visible) return null;
  return (
    <Animated.View style={[styles.wrap, { opacity: anim, transform: [{ translateY: anim.interpolate({ inputRange: [0,1], outputRange: [-50,0] }) }] }]}>
      <View style={styles.card}>
        <View style={styles.dot}><Text style={styles.check}>✓</Text></View>
        <View style={{ flex: 1 }}><Text style={styles.title}>{title}</Text>{subtitle && <Text style={styles.sub}>{subtitle}</Text>}</View>
      </View>
    </Animated.View>
  );
}
const styles = StyleSheet.create({
  wrap: { position: "absolute", top: 55, left: 16, right: 16, zIndex: 100 },
  card: { flexDirection: "row", alignItems: "center", gap: 12, backgroundColor: "#111827", padding: 14, borderRadius: radius.card, borderWidth: 1, borderColor: "rgba(255,255,255,0.1)" },
  dot: { width: 28, height: 28, borderRadius: 14, backgroundColor: "#22C55E", alignItems: "center", justifyContent: "center" },
  check: { color: "#fff", fontWeight: "900" },
  title: { color: "#fff", fontFamily: fonts.headingSemiBold, fontSize: 14 },
  sub: { color: "rgba(255,255,255,0.7)", fontFamily: fonts.body, fontSize: 12, marginTop: 2 },
});