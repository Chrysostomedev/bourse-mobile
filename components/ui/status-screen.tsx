import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Path, Circle, Line } from "react-native-svg";
import { Button } from "@/components/ui/button";
import { colors, fonts } from "@/lib/theme";

export type StatusCode = 401 | 404 | 500 | 503;

type StatusScreenProps = {
  code: StatusCode;
  /** Permet de surcharger le titre/texte par défaut (ex: message d'API) */
  title?: string;
  description?: string;
  actionLabel?: string;
  onPressAction?: () => void;
};

/**
 * StatusScreen — écran d'erreur/statut réutilisable pour toute l'appli :
 * 404 (page introuvable), 401 (session expirée / accès refusé),
 * 500 (erreur serveur), 503 (service en maintenance).
 *
 * Une seule source de vérité pour ces 4 cas évite d'avoir 4 écrans
 * copiés-collés qui divergent avec le temps (texte, bouton, icône...).
 */
const STATUS_CONTENT: Record<
  StatusCode,
  { title: string; description: string; actionLabel: string; icon: () => React.ReactNode }
> = {
  404: {
    title: "Cette page n'existe pas",
    description:
      "Le lien est peut-être obsolète, ou la page a été déplacée. Retourne à l'accueil pour continuer.",
    actionLabel: "Retour à l'accueil",
    icon: () => <CompassIcon />,
  },
  401: {
    title: "Ta session a expiré",
    description:
      "Reconnecte-toi pour retrouver tes bourses suivies, tes likes et tes commentaires.",
    actionLabel: "Se reconnecter",
    icon: () => <LockIcon />,
  },
  500: {
    title: "Un imprévu de notre côté",
    description:
      "Quelque chose s'est mal passé sur nos serveurs. Réessaie dans un instant.",
    actionLabel: "Réessayer",
    icon: () => <ServerIcon />,
  },
  503: {
    title: "Service en maintenance",
    description:
      "On améliore l'appli en ce moment. Repasse dans quelques minutes.",
    actionLabel: "Actualiser",
    icon: () => <ClockIcon />,
  },
};

export function StatusScreen({
  code,
  title,
  description,
  actionLabel,
  onPressAction,
}: StatusScreenProps) {
  const preset = STATUS_CONTENT[code];

  return (
    <View style={styles.container}>
      <View style={styles.illustrationWrap}>{preset.icon()}</View>

      <Text style={styles.code}>Erreur {code}</Text>
      <Text style={styles.title}>{title ?? preset.title}</Text>
      <Text style={styles.description}>
        {description ?? preset.description}
      </Text>

      <Button
        label={actionLabel ?? preset.actionLabel}
        variant="primary"
        onPress={onPressAction}
        fullWidth
      />
    </View>
  );
}

/* ---------- Illustrations dédiées par code, même traitement graphique
   (à-plats + fil constellation) que l'onboarding ---------- */

function IllustrationBase({ children }: { children: React.ReactNode }) {
  return (
    <Svg width={180} height={180} viewBox="0 0 180 180">
      <Circle cx="90" cy="90" r="78" fill="#F1E9FA" />
      <Circle cx="90" cy="90" r="56" fill="#E7D6F5" />
      {children}
    </Svg>
  );
}

function CompassIcon() {
  return (
    <IllustrationBase>
      <Circle cx="90" cy="90" r="34" fill="#FFFFFF" />
      <Circle cx="90" cy="90" r="34" stroke={colors.primary} strokeWidth={3} />
      <Path
        d="M104 76 96 96 76 104 84 84Z"
        fill={colors.coral}
      />
      <Circle cx="90" cy="90" r="3" fill={colors.primary} />
      <Line x1="90" y1="50" x2="90" y2="58" stroke={colors.primary} strokeWidth={3} strokeLinecap="round" />
      <Line x1="90" y1="122" x2="90" y2="130" stroke={colors.primary} strokeWidth={3} strokeLinecap="round" />
    </IllustrationBase>
  );
}

function LockIcon() {
  return (
    <IllustrationBase>
      <Path
        d="M68 88v-14a22 22 0 0 1 44 0v14"
        stroke={colors.primary}
        strokeWidth={5}
        fill="none"
        strokeLinecap="round"
      />
      <Path
        d="M60 88h60v34a6 6 0 0 1-6 6H66a6 6 0 0 1-6-6Z"
        fill="#FFFFFF"
        stroke={colors.primary}
        strokeWidth={3}
      />
      <Circle cx="90" cy="106" r="5" fill={colors.coral} />
    </IllustrationBase>
  );
}

function ServerIcon() {
  return (
    <IllustrationBase>
      <Path
        d="M58 66h64a6 6 0 0 1 6 6v10a6 6 0 0 1-6 6H58a6 6 0 0 1-6-6V72a6 6 0 0 1 6-6Z"
        fill="#FFFFFF"
        stroke={colors.primary}
        strokeWidth={3}
      />
      <Path
        d="M58 92h64a6 6 0 0 1 6 6v10a6 6 0 0 1-6 6H58a6 6 0 0 1-6-6V98a6 6 0 0 1 6-6Z"
        fill="#FFFFFF"
        stroke={colors.primary}
        strokeWidth={3}
      />
      <Circle cx="66" cy="76" r="3" fill={colors.like} />
      <Circle cx="66" cy="102" r="3" fill={colors.alert} />
      <Line x1="76" y1="76" x2="108" y2="76" stroke={colors.border} strokeWidth={3} strokeLinecap="round" />
      <Line x1="76" y1="102" x2="108" y2="102" stroke={colors.border} strokeWidth={3} strokeLinecap="round" />
    </IllustrationBase>
  );
}

function ClockIcon() {
  return (
    <IllustrationBase>
      <Circle cx="90" cy="90" r="34" fill="#FFFFFF" stroke={colors.primary} strokeWidth={3} />
      <Line x1="90" y1="90" x2="90" y2="70" stroke={colors.primary} strokeWidth={4} strokeLinecap="round" />
      <Line x1="90" y1="90" x2="104" y2="98" stroke={colors.coral} strokeWidth={4} strokeLinecap="round" />
      <Circle cx="90" cy="90" r="3.5" fill={colors.primary} />
    </IllustrationBase>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 32,
    backgroundColor: colors.background,
    gap: 8,
  },
  illustrationWrap: {
    marginBottom: 16,
  },
  code: {
    fontFamily: fonts.bodySemiBold,
    fontSize: 12,
    letterSpacing: 1,
    color: colors.coral,
    textTransform: "uppercase",
  },
  title: {
    fontFamily: fonts.headingBold,
    fontSize: 20,
    color: colors.ink,
    textAlign: "center",
    marginTop: 4,
  },
  description: {
    fontFamily: fonts.body,
    fontSize: 14,
    lineHeight: 20,
    color: colors.inkSoft,
    textAlign: "center",
    marginBottom: 20,
  },
});

export default StatusScreen;