import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NutreyVibes",
  description: "Empowering individuals to achieve their health goals with personalized nutrition guidance, expert advice, and sustainable wellness plans. Discover a balanced approach to nutrition tailored to your unique lifestyle with NutreyVibes.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="relative overflow-hidden">
        {children}
        </main>
      </body>
    </html>
  );
}
