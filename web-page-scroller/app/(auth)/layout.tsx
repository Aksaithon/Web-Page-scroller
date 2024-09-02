import Image from "next/image";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div
        className=" flex  justify-center items-center h-screen w-screen bg-cover bg-center "
        style={{ backgroundImage: "url(/bg-img.jpg)" }}
      >
        {children}
      </div>
    </>
  );
}
