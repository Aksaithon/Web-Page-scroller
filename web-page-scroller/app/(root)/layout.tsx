import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className=" flex flex-col  ">
          {children}
          <div className=" fixed top-[600px] ">
            <Link href={"/dashboard"}>(Root) layout</Link>
          </div>
        </div>
      </body>
    </html>
  );
}
