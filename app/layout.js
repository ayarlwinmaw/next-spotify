import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Vinyl AI",
  description: "created by Quantum Artisans",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        {/* <Script src="https://sdk.scdn.co/spotify-player.js" strategy="beforeInteractive" /> */}
      </body>
      
    </html>
  );
}
