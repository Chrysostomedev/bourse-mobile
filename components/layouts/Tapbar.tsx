import React, { useRef, useState } from "react";
import { View, Text, Pressable, StyleSheet, Animated, LayoutChangeEvent, Platform } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import { colors, fonts, radius, shadow } from "@/lib/theme";

type TabKey = "index" | "posts" | "bourses" | "services" | "profil";

const TAB_ICONS: Record<TabKey, (active: boolean) => React.ReactNode> = {
  index: (active) => <HomeIcon active={active} />,
  posts: (active) => <FeedIcon active={active} />,
  bourses: (active) => <CapIcon active={active} />,
  services: (active) => <BriefcaseIcon active={active} />,
  profil: (active) => <UserIcon active={active} />,
};

const TAB_LABELS: Record<TabKey, string> = {
  index: "Accueil",
  posts: "Posts",
  bourses: "Bourses",
  services: "Services",
  profil: "Profil",
};

export function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const [tabLayouts, setTabLayouts] = useState<{ x: number; width: number }[]>([]);
  const pillX = useRef(new Animated.Value(0)).current;
  const pillWidth = useRef(new Animated.Value(64)).current;

  const animateTo = (index: number) => {
    const layout = tabLayouts[index];
    if (!layout) return;
    Animated.parallel([
      Animated.spring(pillX, { toValue: layout.x, useNativeDriver: false, speed: 16, bounciness: 8 }),
      Animated.spring(pillWidth, { toValue: layout.width, useNativeDriver: false, speed: 16, bounciness: 8 }),
    ]).start();
  };

  const handleLayout = (index: number) => (e: LayoutChangeEvent) => {
    const { x, width } = e.nativeEvent.layout;
    setTabLayouts((prev) => {
      const next = [...prev];
      next[index] = { x, width };
      return next;
    });
    if (index === state.index) {
      pillX.setValue(x);
      pillWidth.setValue(width);
    }
  };

  return (
    <View style={styles.wrapper}>
      <BlurView intensity={Platform.OS === 'ios' ? 40 : 100} tint="light" style={styles.bar}>
        <Animated.View style={[styles.pill, { transform: [{ translateX: pillX }], width: pillWidth }]} />

        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;
          const key = route.name as TabKey;
          const label = TAB_LABELS[key] ?? options.title ?? route.name;
          const icon = TAB_ICONS[key]?.(isFocused);

          const onPress = () => {
            const event = navigation.emit({ type: "tabPress", target: route.key, canPreventDefault: true });
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
              animateTo(index);
            }
          };

          return (
            <Pressable key={route.key} onPress={onPress} onLayout={handleLayout(index)} style={styles.tab}>
              {isFocused && (
                <View style={styles.connectorDot}>
                  <Svg width={8} height={14} viewBox="0 0 8 14">
                    <Circle cx="4" cy="3" r="2.5" fill={colors.coral} />
                    <Path d="M4 6 L4 12" stroke={colors.coral} strokeWidth={1.2} strokeDasharray="1.5,2" strokeLinecap="round" />
                  </Svg>
                </View>
              )}
              <View style={styles.iconSlot}>{icon}</View>
              {isFocused && <Text numberOfLines={1} style={styles.tabLabel}>{label}</Text>}
            </Pressable>
          );
        })}
      </BlurView>
    </View>
  );
}

function HomeIcon({ active }: { active: boolean }) {
  const c = active ? colors.white : colors.inkSoft;
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M4 11.5 12 4l8 7.5" stroke={c} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M6 10v9h12v-9" stroke={c} strokeWidth={2} strokeLinejoin="round" />
    </Svg>
  );
}

function FeedIcon({ active }: { active: boolean }) {
  const c = active ? colors.white : colors.inkSoft;
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M5 5h9l5 5v9H5z" stroke={c} strokeWidth={2} strokeLinejoin="round" />
      <Path d="M9 13h6M9 17h4" stroke={c} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

function CapIcon({ active }: { active: boolean }) {
  const c = active ? colors.white : colors.inkSoft;
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M12 5 2 9.5 12 14l10-4.5L12 5Z" stroke={c} strokeWidth={2} strokeLinejoin="round" />
      <Path d="M6 11.7v4c0 1.4 2.7 2.8 6 2.8s6-1.4 6-2.8v-4" stroke={c} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

function BriefcaseIcon({ active }: { active: boolean }) {
  const c = active ? colors.white : colors.inkSoft;
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path d="M4 9.5h16v9H4z" stroke={c} strokeWidth={2} strokeLinejoin="round" />
      <Path d="M9 9.5V7a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2.5" stroke={c} strokeWidth={2} strokeLinejoin="round" />
    </Svg>
  );
}

function UserIcon({ active }: { active: boolean }) {
  const c = active ? colors.white : colors.inkSoft;
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Circle cx="12" cy="8" r="3.4" stroke={c} strokeWidth={2} />
      <Path d="M5 20c1.2-3.6 4-5.4 7-5.4s5.8 1.8 7 5.4" stroke={c} strokeWidth={2} strokeLinecap="round" />
    </Svg>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: Platform.select({ ios: 28, default: 18 }),
    borderRadius: radius.pill,
    overflow: "hidden", // Important pour que le BlurView respecte le border radius
    backgroundColor: "rgba(255,255,255,0.7)", // Fallback color
    ...shadow.floating,
  },
  bar: {
    flexDirection: "row",
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  pill: {
    position: "absolute",
    top: 8,
    bottom: 8,
    left: 0,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
  },
  tab: {
    flex: 1,
    minHeight: 44,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingHorizontal: 10,
  },
  iconSlot: {
    alignItems: "center",
    justifyContent: "center",
  },
  connectorDot: {
    position: "absolute",
    top: -16,
    alignSelf: "center",
  },
  tabLabel: {
    color: colors.white,
    fontFamily: fonts.headingSemiBold,
    fontSize: 12,
  },
});