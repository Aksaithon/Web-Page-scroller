import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import SaveUserToDatabase from '../lib/saveUserData_toDatabase';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Web page scroller",
  description: "Create/scroll fun & interesting web pages.",
  icons: "/favicon.ico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClerkProvider
          publishableKey={
            process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string
          }
          appearance={{
            layout: {
              socialButtonsVariant: "iconButton",
              logoImageUrl: "/favicon.ico",
            },
            variables: {
              colorBackground: "#15171c",
              colorPrimary: "",
              colorText: "white",
              colorInputBackground: "#1b1f29",
              colorInputText: "white",
            },
          }}
        >
          <SaveUserToDatabase/>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
