import React from "react";
import { router } from "expo-router";
import { StatusScreen } from "@/components/ui/status-screen";

/**
 * +not-found.tsx est le fichier spécial reconnu par Expo Router :
 * il s'affiche automatiquement pour toute route qui ne correspond
 * à rien (faute de frappe dans une URL, lien profond cassé, etc).
 *
 * Pour les erreurs 401 / 500 / 503, ne pas créer d'autres routes
 * fichiers : afficher <StatusScreen code={401|500|503} /> directement
 * depuis l'écran concerné (ex: après un appel API qui échoue), voir
 * l'exemple commenté dans app/bourse/[id].tsx.
 */
export default function NotFoundScreen() {
  return (
    <StatusScreen
      code={404}
      onPressAction={() => router.replace("/(tabs)")}
    />
  );
}