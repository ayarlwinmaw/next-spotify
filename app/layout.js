// app/layout.js
import { Inter } from "next/font/google";
import "./globals.css";
import SpotifyScript from '../components/SpotifyScript'; // Adjust path as necessary

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Vinyl AI",
  description: "created by Quantum Artisans",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SpotifyScript />
        {children}
      </body>
    </html>
  );
}
