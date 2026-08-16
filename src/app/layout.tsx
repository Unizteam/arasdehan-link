import type { Metadata } from "next";
import { Outfit, Vazirmatn } from "next/font/google";
import { siteConfig } from "@/data/site";
import "./globals.css";

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn",
  subsets: ["arabic", "latin"],
  display: "swap",
});

/* Kept for Latin brand typography such as the ETVAVIDA wordmark. */
const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `${siteConfig.profile.name} — ${siteConfig.profile.title}`,
  description: siteConfig.profile.bio,
  openGraph: {
    title: `${siteConfig.profile.name} — ${siteConfig.profile.title}`,
    description: siteConfig.profile.bio,
    locale: "fa_IR",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={siteConfig.locale}
      dir={siteConfig.direction}
      /* Browser extensions inject attributes onto <html> before hydration. */
      suppressHydrationWarning
      className={`${vazirmatn.variable} ${outfit.variable} h-full scroll-smooth antialiased motion-reduce:scroll-auto`}
    >
      <body className="min-h-full bg-backdrop font-sans text-foreground">
        {children}
      </body>
    </html>
  );
}
