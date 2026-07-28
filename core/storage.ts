import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

const TOKEN_KEY = "authToken";
const USER_KEY = "authUser";
const isWeb = Platform.OS === "web";

const webFallback = {
  get: (k: string) => (typeof window !== "undefined" ? localStorage.getItem(k) : null),
  set: (k: string, v: string) => { if (typeof window !== "undefined") localStorage.setItem(k, v); },
  del: (k: string) => { if (typeof window !== "undefined") localStorage.removeItem(k); },
};

async function safeGet(key: string): Promise<string | null> {
  try {
    if (isWeb) return webFallback.get(key);
    return await SecureStore.getItemAsync(key);
  } catch { return null; }
}
async function safeSet(key: string, value: string): Promise<void> {
  try {
    if (isWeb) { webFallback.set(key, value); return; }
    await SecureStore.setItemAsync(key, value);
  } catch {}
}
async function safeDel(key: string): Promise<void> {
  try {
    if (isWeb) { webFallback.del(key); return; }
    await SecureStore.deleteItemAsync(key);
  } catch {}
}

export const tokenStorage = {
  getToken: () => safeGet(TOKEN_KEY),
  setToken: (t: string) => safeSet(TOKEN_KEY, t),
  clearToken: () => safeDel(TOKEN_KEY),
};

export const userStorage = {
  getUser: () => safeGet(USER_KEY),
  setUser: (json: string) => safeSet(USER_KEY, json),
  clearUser: () => safeDel(USER_KEY),
};