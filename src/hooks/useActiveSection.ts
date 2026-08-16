"use client";

import { useEffect, useRef, useState } from "react";

export function useActiveSection(ids: string[], offset = 108) {
  const [activeId, setActiveId] = useState(ids[0] ?? "");
  const lockRef = useRef<string | null>(null);

  useEffect(() => {
    const update = () => {
      if (lockRef.current) return;

      let current = ids[0];

      for (const id of ids) {
        const element = document.getElementById(id);
        if (!element) continue;
        if (element.getBoundingClientRect().top - offset <= 1) {
          current = id;
        }
      }

      setActiveId((previous) => (previous === current ? previous : (current ?? "")));
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    document.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    return () => {
      window.removeEventListener("scroll", update);
      document.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [ids, offset]);

  function select(id: string) {
    lockRef.current = id;
    setActiveId(id);

    window.setTimeout(() => {
      lockRef.current = null;
    }, 850);
  }

  return { activeId, select };
}
