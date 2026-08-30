"use client";

import { useCallback, useSyncExternalStore } from "react";
import type { Preferences } from "@/lib/types";

const PREFERENCES_KEY = "fitme:preferences";
const LIKES_KEY = "fitme:likes";

// Outfit ids were renamed to match their image filenames when the weekend
// category moved from "casual_*" to "weekend_*" ids. Remap any liked ids a
// user already has saved so their 찜 list doesn't silently lose entries.
const LEGACY_ID_MIGRATIONS: Record<string, string> = {
  casual_minimal_1: "weekend_minimal_1",
  casual_minimal_2: "weekend_minimal_2",
  casual_casual_1: "weekend_casual_1",
  casual_casual_2: "weekend_casual_2",
  casual_feminine_1: "weekend_feminine_1",
  casual_feminine_2: "weekend_feminine_2",
};

function migrateLikedIds(ids: string[]): string[] {
  return Array.from(new Set(ids.map((id) => LEGACY_ID_MIGRATIONS[id] ?? id)));
}

const DEFAULT_PREFERENCES: Preferences = {
  situations: [],
  styles: [],
  onboarded: false,
};

type StoreState = {
  ready: boolean;
  preferences: Preferences;
  likedIds: string[];
};

let state: StoreState = {
  ready: false,
  preferences: DEFAULT_PREFERENCES,
  likedIds: [],
};

const listeners = new Set<() => void>();

function emitChange() {
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function readFromStorage(): StoreState {
  try {
    const rawPreferences = window.localStorage.getItem(PREFERENCES_KEY);
    const rawLikes = window.localStorage.getItem(LIKES_KEY);
    return {
      ready: true,
      preferences: rawPreferences
        ? (JSON.parse(rawPreferences) as Preferences)
        : DEFAULT_PREFERENCES,
      likedIds: rawLikes ? migrateLikedIds(JSON.parse(rawLikes) as string[]) : [],
    };
  } catch {
    return { ready: true, preferences: DEFAULT_PREFERENCES, likedIds: [] };
  }
}

// Lazily hydrates from localStorage on first client read, then caches the
// result so repeated calls (required by useSyncExternalStore) stay stable.
function getSnapshot(): StoreState {
  if (!state.ready) {
    state = readFromStorage();
  }
  return state;
}

const SERVER_SNAPSHOT: StoreState = {
  ready: false,
  preferences: DEFAULT_PREFERENCES,
  likedIds: [],
};

function getServerSnapshot(): StoreState {
  return SERVER_SNAPSHOT;
}

function persist(next: StoreState) {
  state = next;
  try {
    window.localStorage.setItem(PREFERENCES_KEY, JSON.stringify(next.preferences));
    window.localStorage.setItem(LIKES_KEY, JSON.stringify(next.likedIds));
  } catch {
    // ignore storage write errors (e.g. private browsing quota)
  }
  emitChange();
}

function savePreferencesAction(situations: string[], styles: string[]) {
  persist({
    ...getSnapshot(),
    preferences: { situations, styles, onboarded: true },
  });
}

function resetPreferencesAction() {
  persist({ ...getSnapshot(), preferences: DEFAULT_PREFERENCES });
}

function toggleLikeAction(outfitId: string) {
  const current = getSnapshot();
  const likedIds = current.likedIds.includes(outfitId)
    ? current.likedIds.filter((id) => id !== outfitId)
    : [...current.likedIds, outfitId];
  persist({ ...current, likedIds });
}

export function useAppState() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const isLiked = useCallback(
    (outfitId: string) => snapshot.likedIds.includes(outfitId),
    [snapshot.likedIds]
  );

  return {
    ready: snapshot.ready,
    preferences: snapshot.preferences,
    likedIds: snapshot.likedIds,
    savePreferences: savePreferencesAction,
    resetPreferences: resetPreferencesAction,
    toggleLike: toggleLikeAction,
    isLiked,
  };
}
