import { PropsWithChildren } from "react";
export function Card({ children }: PropsWithChildren) {
  return <div className="glass hover-rise p-0">{children}</div>;
}
