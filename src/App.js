import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Logos from "./components/Logos";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import Episodios from "./pages/Episodios";
import Ubicaciones from "./pages/Ubicaciones";
import Personajes from "./pages/Personajes";
import Nosotros from "./pages/Nosotros";

import "./styles/app.css";

import rutas from "./constants/rutas";

function App() {
  return (
    <Router basename="/wiki-rick-and-morty">
      <ScrollToTop />
      <div className="layout">
        <header role="banner">
          <Logos />
          <NavBar />
        </header>

        <main>
          <Routes>
            <Route path={rutas.home} index element={<Home />} />
            <Route path={rutas.personajes} element={<Personajes />} />
            <Route path={rutas.ubicaciones} element={<Ubicaciones />} />
            <Route path={rutas.episodios} element={<Episodios />} />
            <Route path={rutas.nosotros} element={<Nosotros />} />
            <Route
              path="*"
              element={<h1 className="not-found">Not Found...</h1>}
            />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
