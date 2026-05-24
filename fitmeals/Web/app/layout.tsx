import "./globals.css";
import { Manrope, Geist } from "next/font/google";
import localFont from "next/font/local";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const montserrat = localFont({
  src: "../font/Montserrat.ttf",
  variable: "--font-montserrat",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <head>
        <title>FitMeals</title>
        <link rel="icon" href="/Fitmeals-logo.png" />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>

      <body
        className={`${manrope.className} ${geist.variable} ${montserrat.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
