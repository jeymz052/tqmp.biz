import { CartProvider } from "../components/CartProvider";
import Navbar from "../components/Navbar";
import CartDrawer from "../components/CartDrawer";
import Footer from "../components/Footer";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <CartProvider>
      <Navbar />
      <CartDrawer />
      <main style={{ minHeight: "60vh" }}>{children}</main>
      <Footer />
    </CartProvider>
  );
}
