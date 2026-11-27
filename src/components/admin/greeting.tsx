"use client";
import { useSyncExternalStore } from "react";

const noop = () => () => {};
function part() {
  const h = new Date().getHours();
  return h < 5 ? "İyi geceler" : h < 12 ? "Günaydın" : h < 18 ? "İyi günler" : "İyi akşamlar";
}

export function Greeting({ name }: { name: string }) {
  const hello = useSyncExternalStore(noop, part, () => "Merhaba");
  return <h1 className="admin-title text-4xl">{hello}, {name}.</h1>;
}
