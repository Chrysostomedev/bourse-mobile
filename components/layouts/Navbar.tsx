import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import Svg, {
  Path,
  Circle,
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
  Line,
} from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import { colors, fonts, radius, shadow } from "@/lib/theme";
import { NotificationsSheet, type NotificationItem } from "@/components/modals/NotificationsSheet";

type NavBarProps = {
  firstName?: string;
  avatarUri?: string;
  notificationCount?: number;
  notifications?: NotificationItem[];
  onPressSearch?: () => void;
  onPressNotifications?: () => void;
  onPressAvatar?: () => void;
  onMarkAllNotificationsRead?: () => void;
  onPressNotificationItem?: (item: NotificationItem) => void;
};

/**
 * NavBar — en-tête principal des onglets.
 *
 * Signature : le "fil constellation" — trois points reliés par des
 * pointillés sous le bloc de bienvenue. C'est le même motif qu'on
 * retrouve dans l'onboarding : une bourse, une candidature, une
 * communauté reliées entre elles. Le trait respire doucement
 * (opacité animée) plutôt que de scroller ou clignoter — discret,
 * jamais criard.
 *
 * Le même motif se prolonge verticalement dans le panneau de
 * notifications (NotificationsSheet) : chaque alerte devient un
 * nouveau nœud sur le fil.
 */
export function NavBar({
  firstName = "étudiant(e)",
  avatarUri,
  notificationCount = 0,
  notifications = [],
  onPressSearch,
  onPressNotifications,
  onPressAvatar,
  onMarkAllNotificationsRead,
  onPressNotificationItem,
}: NavBarProps) {
  const breathe = useRef(new Animated.Value(0.35)).current;
  const badgePulse = useRef(new Animated.Value(1)).current;
  const [notifSheetVisible, setNotifSheetVisible] = useState(false);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(breathe, {
          toValue: 0.9,
          duration: 1800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(breathe, {
          toValue: 0.35,
          duration: 1800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [breathe]);

  useEffect(() => {
    if (notificationCount <= 0) return;
    Animated.loop(
      Animated.sequence([
        Animated.timing(badgePulse, {
          toValue: 1.15,
          duration: 700,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(badgePulse, {
          toValue: 1,
          duration: 700,
          easing: Easing.in(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [notificationCount, badgePulse]);

  const handlePressNotifications = () => {
    // NotificationsSheet remplace l'ancien comportement de onPressNotifications
    // (le toast "Tu as X nouvelles notifications"). On n'appelle donc plus
    // ce prop ici pour éviter le doublon visuel. Si tu t'en servais pour
    // autre chose qu'afficher ce toast (tracking, etc.), déplace cette
    // logique dans onPressNotificationItem / onMarkAllNotificationsRead,
    // ou rétablis l'appel ci-dessous une fois l'ancien toast retiré côté écran :
    // onPressNotifications?.();
    setNotifSheetVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Pressable
          onPress={onPressAvatar}
          hitSlop={8}
          style={styles.identityBlock}
        >
          <View style={styles.avatarRing}>
            <View style={styles.avatarInner}>
              <LinearGradient
                colors={[colors.primary, colors.coral]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.avatarGradient}
              >
                {avatarUri ? (
                  // eslint-disable-next-line jsx-a11y/alt-text
                  <Animated.Image
                    source={{ uri: avatarUri }}
                    style={styles.avatarImage}
                  />
                ) : (
                  <Text style={styles.avatarFallback}>
                    {firstName.charAt(0).toUpperCase()}
                  </Text>
                )}
              </LinearGradient>
            </View>
          </View>
          <View>
            <Text style={styles.greetingLabel}>
              {new Date().getHours() >= 18 || new Date().getHours() < 5 ? "Bonsoir" : "Bonjour"},
            </Text>
            <Text style={styles.greetingName}>{firstName} </Text>
          </View>
        </Pressable>

        <View style={styles.actions}>
          <Pressable
            onPress={onPressSearch}
            style={({ pressed }) => [
              styles.iconButton,
              pressed && styles.iconButtonPressed,
            ]}
          >
            <SearchIcon />
          </Pressable>

          <Pressable
            onPress={handlePressNotifications}
            style={({ pressed }) => [
              styles.iconButton,
              pressed && styles.iconButtonPressed,
            ]}
          >
            <BellIcon />
            {notificationCount > 0 && (
              <Animated.View
                style={[
                  styles.badge,
                  { transform: [{ scale: badgePulse }] },
                ]}
              >
                <Text style={styles.badgeText}>
                  {notificationCount > 9 ? "9+" : notificationCount}
                </Text>
              </Animated.View>
            )}
          </Pressable>
        </View>
      </View>

      {/* Fil constellation — signature de marque */}
      <Animated.View style={{ opacity: breathe }}>
        <Svg height="10" width="100%" viewBox="0 0 300 10">
          <Defs>
            <SvgLinearGradient id="threadGradient" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0" stopColor={colors.primary} stopOpacity={1} />
              <Stop offset="1" stopColor={colors.coral} stopOpacity={1} />
            </SvgLinearGradient>
          </Defs>
          <Line
            x1="6"
            y1="5"
            x2="294"
            y2="5"
            stroke="url(#threadGradient)"
            strokeWidth={1.5}
            strokeDasharray="1, 7"
            strokeLinecap="round"
          />
          <Circle cx="6" cy="5" r="3" fill={colors.primary} />
          <Circle cx="150" cy="5" r="3" fill={colors.primaryLight} />
          <Circle cx="294" cy="5" r="3" fill={colors.coral} />
        </Svg>
      </Animated.View>

      <NotificationsSheet
        visible={notifSheetVisible}
        onClose={() => setNotifSheetVisible(false)}
        notifications={notifications}
        onMarkAllRead={onMarkAllNotificationsRead}
        onPressItem={onPressNotificationItem}
      />
    </View>
  );
}

function SearchIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Circle
        cx="11"
        cy="11"
        r="6.5"
        stroke={colors.ink}
        strokeWidth={2}
      />
      <Path
        d="M20 20L16 16"
        stroke={colors.ink}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

function BellIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 9a6 6 0 1 1 12 0c0 3.2 1 5 2 6H4c1-1 2-2.8 2-6Z"
        stroke={colors.ink}
        strokeWidth={2}
        strokeLinejoin="round"
      />
      <Path
        d="M10 19a2 2 0 0 0 4 0"
        stroke={colors.ink}
        strokeWidth={2}
        strokeLinecap="round"
      />
    </Svg>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 14,
    backgroundColor: colors.background,
    gap: 12,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  identityBlock: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  avatarRing: {
    width: 46,
    height: 46,
    borderRadius: 23,
    padding: 2,
    backgroundColor: colors.surface,
    borderWidth: 2,
    borderColor: colors.primaryLight,
    ...shadow.card,
  },
  avatarInner: {
    flex: 1,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  avatarGradient: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
  },
  avatarFallback: {
    color: colors.white,
    fontFamily: fonts.headingBold,
    fontSize: 16,
  },
  greetingLabel: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.inkSoft,
  },
  greetingName: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 16,
    color: colors.ink,
  },
  actions: {
    flexDirection: "row",
    gap: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    ...shadow.card,
  },
  iconButtonPressed: {
    backgroundColor: colors.border,
  },
  badge: {
    position: "absolute",
    top: -2,
    right: -2,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    paddingHorizontal: 3,
    backgroundColor: colors.coral,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: colors.background,
  },
  badgeText: {
    color: colors.white,
    fontSize: 9,
    fontFamily: fonts.headingSemiBold,
  },
});

export default NavBar;