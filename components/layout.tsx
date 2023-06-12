import Header from "./header";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode; }) {
  return (
    <>
      <Header />
      <main className="py-8 md:container md:mx-auto px-4">{children}</main>
    </>
  );
}
