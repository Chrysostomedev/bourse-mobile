import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import Constants from "expo-constants";
import { tokenStorage } from "./storage";
import { processApiError } from "./error";
import { authEvents } from "./auth-events";

declare module "axios" {
  export interface AxiosRequestConfig {
    silent?: boolean;
  }
}

// ── Résolution dynamique de l'URL API ──
// 1. Si EXPO_PUBLIC_API_URL est défini dans .env → on l'utilise tel quel.
// 2. Sinon, en dev (__DEV__), on extrait l'IP du serveur Metro depuis
//    expo-constants (ex: "192.168.1.42:8081") et on construit l'URL API.
// 3. En prod, on tombera sur le fallback (à adapter si besoin).
function resolveBaseUrl(): string {
  const envUrl = process.env.EXPO_PUBLIC_API_URL;
  if (envUrl) return envUrl;

  if (__DEV__) {
    const hostUri = Constants.expoConfig?.hostUri; // ex: "192.168.1.42:8081"
    if (hostUri) {
      const ip = hostUri.split(":")[0];
      const url = `http://${ip}:8000/api/v1`;
      console.log(`[API] URL auto-détectée via Metro: ${url}`);
      return url;
    }
  }

  console.warn("Impossible de résoudre l'URL API – ni .env ni Metro disponible");
  return "http://localhost:8000/api/v1";
}

const BASE_URL = resolveBaseUrl();

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 20_000,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Routes publiques = pas de Bearer, d'après ton fichier routes public
const PUBLIC_PATHS = [
  "/auth/login",
  "/auth/register",
  "/auth/password/request-reset",
  "/auth/password/reset",
  "/auth/passkey/login-options",
  "/auth/passkey/login",
];

const isPublicRoute = (url?: string): boolean =>
  !url ? false : PUBLIC_PATHS.some((p) => url.includes(p));

// ── Request interceptor ──
api.interceptors.request.use(
  async (config) => {
    if (!isPublicRoute(config.url)) {
      const token = await tokenStorage.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    // Laisse axios gérer le Content-Type + boundary pour les FormData
    // (uploads avatar/logo/cover_image via multipart)
    if (config.data instanceof FormData) {
      delete config.headers["Content-Type"];
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// ── Response interceptor ──
api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (error.response?.status === 401 && !isPublicRoute(error.config?.url)) {
      await tokenStorage.clearToken();
      // Découplé de useAuth via event bus : core/ ne doit pas connaître hooks/
      authEvents.emitUnauthorized();
    }
    return Promise.reject(error);
  }
);

// ── Retry ──
interface RetryConfig {
  maxRetries: number;
  retryDelay: number;
  retryOn: number[];
}

const defaultRetry: RetryConfig = {
  maxRetries: 2,
  retryDelay: 1500,
  retryOn: [408, 429, 500, 502, 503, 504],
};

async function withRetry<T>(
  fn: () => Promise<T>,
  cfg: Partial<RetryConfig> = {}
): Promise<T> {
  const c = { ...defaultRetry, ...cfg };
  let attempts = 0;

  const run = async (): Promise<T> => {
    try {
      return await fn();
    } catch (err) {
      const axiosErr = err as AxiosError;
      const shouldRetry =
        attempts < c.maxRetries &&
        (axiosErr.response
          ? c.retryOn.includes(axiosErr.response.status)
          : ["ECONNABORTED", "ERR_NETWORK"].includes(axiosErr.code ?? ""));

      if (shouldRetry) {
        attempts++;
        await new Promise((r) => setTimeout(r, c.retryDelay * attempts));
        return run();
      }
      throw err;
    }
  };
  return run();
}

const handleSuccess = (res: AxiosResponse): unknown => res.data;

// ── Helpers ──
// IMPORTANT : withRetry() reçoit l'AxiosError BRUT (status/code intacts),
// processApiError() ne s'exécute qu'UNE FOIS les retries épuisés, et
// transforme cette erreur brute en ApiError normalisé pour les hooks.
export const get = <T>(
  url: string,
  config?: AxiosRequestConfig,
  retry?: Partial<RetryConfig>
): Promise<T> =>
  withRetry(() => api.get(url, config).then((r) => handleSuccess(r) as T), retry)
    .catch(processApiError);

export const post = <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
  retry?: Partial<RetryConfig>
): Promise<T> =>
  withRetry(
    () => api.post(url, data, config).then((r) => handleSuccess(r) as T),
    retry
  ).catch(processApiError);

export const put = <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
  retry?: Partial<RetryConfig>
): Promise<T> =>
  withRetry(
    () => api.put(url, data, config).then((r) => handleSuccess(r) as T),
    retry
  ).catch(processApiError);

export const patch = <T>(
  url: string,
  data?: unknown,
  config?: AxiosRequestConfig,
  retry?: Partial<RetryConfig>
): Promise<T> =>
  withRetry(
    () => api.patch(url, data, config).then((r) => handleSuccess(r) as T),
    retry
  ).catch(processApiError);

export const del = <T>(
  url: string,
  config?: AxiosRequestConfig,
  retry?: Partial<RetryConfig>
): Promise<T> =>
  withRetry(
    () => api.delete(url, config).then((r) => handleSuccess(r) as T),
    retry
  ).catch(processApiError);

export default api;