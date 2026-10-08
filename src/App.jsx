import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import CadastroTipo from "./pages/CadastroTipo";
import Tipos from "./pages/Tipos";
import AlterarTipos from "./pages/AlterarTipos";
import Pesquisa from "./pages/Pesquisa";
import CadastroPlanta from "./pages/CadastroPlantas";
import Plantas from "./pages/Plantas";
import AlterarPlanta from "./pages/AlterarPlantas";
import Suculentas from "./pages/Suculentas";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cadastro-tipo" element={<CadastroTipo />} />
        <Route path="/tipos" element={<Tipos />} />
        <Route path="/alterar-tipo/:id" element={<AlterarTipos />} />
        <Route path="/pesquisa" element={<Pesquisa />} />
        <Route path="/cadastro-planta" element={<CadastroPlanta />} />
        <Route path="/plantas" element={<Plantas />} />
        <Route path="/alterar-planta/:id" element={<AlterarPlanta />} />
        <Route path="/suculentas" element={<Suculentas />}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App;

