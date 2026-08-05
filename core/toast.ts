import { Alert, ToastAndroid, Platform } from "react-native";

export type ToastType = "success" | "error" | "info" | "warning";

export interface ToastOptions {
  title?: string;
  message: string;
  type?: ToastType;
  duration?: number;
}

/**
 * Toast global pour mobile
 * - iOS: Utilise Alert (popup native)
 * - Android: Utilise ToastAndroid (système natif)
 */
export const showToast = ({
  title = "",
  message,
  type = "info",
  duration = 2000,
}: ToastOptions) => {
  if (Platform.OS === "android") {
    // Android ToastAndroid
    ToastAndroid.show(
      title ? `${title}\n${message}` : message,
      duration > 3000 ? ToastAndroid.LONG : ToastAndroid.SHORT
    );
  } else {
    // iOS Alert (plus visible)
    Alert.alert(title || capitalizeFirst(type), message, [
      { text: "OK", style: type === "error" ? "destructive" : "default" },
    ]);
  }
};

function capitalizeFirst(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Variantes pratiques
export const Toast = {
  success: (message: string, title = "Succès") =>
    showToast({ title, message, type: "success" }),
  error: (message: string, title = "Erreur") =>
    showToast({ title, message, type: "error" }),
  info: (message: string, title = "Info") =>
    showToast({ title, message, type: "info" }),
  warning: (message: string, title = "Attention") =>
    showToast({ title, message, type: "warning" }),
};
