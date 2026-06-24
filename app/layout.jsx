import { Manrope, Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-heading",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
});

export const metadata = {
  metadataBase: new URL("https://www.heavenection.com"),
  title: "Heavenection | Financial Guidance",
  description:
    "Heavenection helps customers explore financial options, understand the next step, and request friendly guidance through the company website.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Heavenection | Financial Guidance",
    description:
      "Friendly support for personal, home, business, property, vehicle, insurance, and education financial needs.",
    url: "/",
    siteName: "Heavenection",
    images: ["/brand/admin-heavenection-logo.png"],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Heavenection | Financial Guidance",
    description:
      "Friendly support for personal, home, business, property, vehicle, insurance, and education financial needs.",
    images: ["/brand/admin-heavenection-logo.png"],
  },
  icons: {
    icon: "/brand/admin-heavenection-logo.png",
    apple: "/brand/admin-heavenection-logo.png",
  },
};

export const viewport = {
  themeColor: "#4d5c90",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} ${manrope.variable}`}>
        {children}
      </body>
    </html>
  );
}
