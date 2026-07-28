type Listener = () => void;
const listeners = new Set<Listener>();

/**
 * Event bus minimal pour découpler core/ (axios) de hooks/ (useAuth).
 * core/ ne doit jamais importer depuis hooks/ ou components/.
 */
export const authEvents = {
  onUnauthorized: (cb: Listener): (() => void) => {
    listeners.add(cb);
    return () => listeners.delete(cb);
  },
  emitUnauthorized: () => listeners.forEach((cb) => cb()),
};