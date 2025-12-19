import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import CartDrawer from "@/components/shopify/CartDrawer";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export const metadata: Metadata = {
  title: "Giant Inside | Apparel for the Resilient",
  description: "Premium athletic apparel built for those who rise after every setback. Discover our collection of shirts, hoodies, and hats that inspire resilience, faith, and a champion mindset.",
  keywords: "athletic apparel, motivational clothing, resilience, faith-based sportswear, gym clothes, sports apparel",
  openGraph: {
    title: "Giant Inside | Apparel for the Resilient",
    description: "Built for those who refuse to quit.",
    url: "https://www.giantinside.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Giant Inside",
    description: "Apparel for the Resilient",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <ErrorBoundary>
          <CartProvider>
            {children}
            <CartDrawer />
          </CartProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
