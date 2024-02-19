import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Header from "./components/Header/Header";
import PublicRoute from "./components/publicRoute/PublicRoute";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import Cart from "./pages/cart/Cart";
import Footer from "./components/footer/Footer";
import BookDetails from "./pages/BookDetails/BookDetails";

export default function Router() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/book-details/:id" element={<BookDetails />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
