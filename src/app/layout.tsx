import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css"; // CRITICAL: This pulls in Tailwind
import { TooltipProvider } from "@/components/ui/tooltip";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StoreChat Admin",
  description: "Automate your customer service",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* Applying the font class to the body is standard practice */}
      <body className={`${inter.className} antialiased`}>
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}