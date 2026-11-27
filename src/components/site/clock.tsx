"use client";
import { useSyncExternalStore } from "react";

const fmt = new Intl.DateTimeFormat("tr-TR", { timeZone: "Europe/Istanbul", hour: "2-digit", minute: "2-digit" });
const subscribe = (cb: () => void) => { const id = setInterval(cb, 15_000); return () => clearInterval(id); };

/** İstanbul'da şu an saat kaç: sunucuda "--:--", tarayıcıda canlı. */
export function IstanbulClock() {
  const time = useSyncExternalStore(subscribe, () => fmt.format(new Date()), () => "--:--");
  return <time suppressHydrationWarning>{time}</time>;
}
