import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import { CheckoutProvider } from "../context/CheckoutContext";
import { ThemeProvider } from "../context/ThemeContext";

import { Inter, Playfair_Display } from "next/font/google";
import { WishlistProvider } from "@/context/WishlistContext";

export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-playfair",
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable}`}>
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <CheckoutProvider>
                <WishlistProvider>
                  <Header />
                  <main className="py-8">{children}</main>
                  <Footer />
                </WishlistProvider>
              </CheckoutProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
