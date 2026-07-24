/**
 * Bourse Pour Tous — Design tokens (miroir de global.css)
 * À utiliser dans les StyleSheet.create() et les composants SVG,
 * là où les classes NativeWind ne suffisent pas (fill, stroke, Animated...).
 */

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
export const colors = {
  primary: "#6B2FA0",
  primaryLight: "#8B3FC4",
  primaryDark: "#4B1F73",

  coral: "#F0562E",
  coralLight: "#FF6F5E",
  coralDark: "#C8431F",

  ink: "#1A1A2E",
  inkSoft: "#4A4A63",

  background: "#F8F7FC",
  surface: "#FFFFFF",
  border: "#E7E3F2",

  like: "#2ECC71",
  alert: "#E74C3C",
  gold: "#F5B301",

  white: "#FFFFFF",
} as const;

export const fonts = {
  heading: "Sora",
  headingSemiBold: "Sora_600SemiBold",
  headingBold: "Sora_700Bold",
  body: "Inter",
  bodyMedium: "Inter_500Medium",
  bodySemiBold: "Inter_600SemiBold",
} as const;

export const typeScale = {
  display: 32,
  title: 24,
  subtitle: 18,
  body: 15,
  caption: 12,
} as const;

export const radius = {
  card: 20,
  pill: 999,
} as const;

export const shadow = {
   card: { boxShadow: `0px 8px 16px ${hexToRgba(colors.ink, 0.08)}`,
   },
   floating: {

  boxShadow: `0px 10px 20px ${hexToRgba(colors.primary, 0.18)}`,
   },
 } as const;