import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

import { AuthProvider } from "../context/AuthContext";
import { CartProvider } from "../context/CartContext";
import { CheckoutProvider } from "../context/CheckoutContext";
import { ThemeProvider } from "../context/ThemeContext"; // ✅ ADD THIS

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <CheckoutProvider>
                <Header />
                {children}
                <Footer />
              </CheckoutProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
