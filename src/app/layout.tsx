import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css"; // CRITICAL: This pulls in Tailwind
import { TooltipProvider } from "@/components/ui/tooltip";
import { Providers } from "@/app/providers";
import { Toaster } from "sonner";

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
        <Providers>
          <TooltipProvider>
            {children}
            <Toaster
              position="top-right"
              richColors
              closeButton
              expand
            />
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  );
}