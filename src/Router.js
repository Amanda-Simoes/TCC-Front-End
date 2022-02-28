import { BrowserRouter, Route, Routes, Navigate, Link } from "react-router-dom";
import Escolas from "./Componentes/Pages/Escolas";
import Details from "./Componentes/Pages/Detalhes";
import Comparacao from "./Componentes/Pages/Comparação";
import Ranking from "./Componentes/Pages/Ranking";
import QualidadeEnsino from "./Componentes/Pages/QualidadeEnsino";
import Container from "./Componentes/Layout/Container/container";
import Navbar from "./Componentes/Layout/navbar/navbar"

function Router() {
  return (
    <BrowserRouter>
    <Navbar />
      <Container class="min-heigth class column">
        <Routes>
          <Route path="/escolas" element={<Escolas />} />
          <Route path="/detalhe/:id" element={<Details />} />
          <Route path="/comparacao" element={<Comparacao />} />
          <Route path="/ranking-escolas" element={<Ranking />} />
          <Route path="/qualidade-ensino" element={<QualidadeEnsino />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default Router;
