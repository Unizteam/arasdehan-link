"use client";

import { useCallback, useEffect, useSyncExternalStore } from "react";
import {
  COURSE_LANG_STORAGE_KEY,
  type CourseLang,
} from "@/data/turkish-course";

function isCourseLang(value: string | null): value is CourseLang {
  return value === "fa" || value === "tr";
}

function applyDocumentLang(lang: CourseLang) {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "fa" ? "rtl" : "ltr";
}

const listeners = new Set<() => void>();

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  window.addEventListener("storage", onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function getSnapshot(): CourseLang {
  try {
    const stored = window.localStorage.getItem(COURSE_LANG_STORAGE_KEY);
    return isCourseLang(stored) ? stored : "fa";
  } catch {
    return "fa";
  }
}

function getServerSnapshot(): CourseLang {
  return "fa";
}

export function useCourseLanguage() {
  const lang = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    applyDocumentLang(lang);
    return () => {
      document.documentElement.lang = "fa";
      document.documentElement.dir = "rtl";
    };
  }, [lang]);

  const setLang = useCallback((next: CourseLang) => {
    try {
      window.localStorage.setItem(COURSE_LANG_STORAGE_KEY, next);
    } catch {
      /* private mode / quota */
    }
    listeners.forEach((listener) => listener());
    applyDocumentLang(next);
  }, []);

  return {
    lang,
    setLang,
    dir: (lang === "fa" ? "rtl" : "ltr") as "rtl" | "ltr",
  };
}
