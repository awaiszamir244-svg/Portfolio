import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Awais Zamir | Frontend Developer",
  description: "Portfolio of R.M. Awais Zamir — Frontend Developer & Full-Stack Intern Aspirant based in Islamabad, Pakistan.",
  keywords: ["Frontend Developer", "React", "React Native", "Next.js", "Pakistan", "Islamabad"],
  openGraph: {
    title: "Awais Zamir | Frontend Developer",
    description: "Building real-world software for real people.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
