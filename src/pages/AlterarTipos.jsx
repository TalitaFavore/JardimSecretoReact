import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../services/api";
import "./AlterarTipo.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function AlterarTipo() {
  const [nome, setNome] = useState("");
  const [carregando, setCarregando] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  // Busca o tipo pelo ID
  async function buscarTipo() {
    try {
      const response = await api.get(`/types/${id}`);

      console.log(response.data);

      setNome(response.data.nome_tipos);
    } catch (error) {
      console.error("Erro ao buscar tipo:", error);

      alert("Erro ao carregar o tipo.");
    } finally {
      setCarregando(false);
    }
  }

  // Busca o tipo quando a página é carregada
  useEffect(() => {
    buscarTipo();
  }, [id]);

  // Envia a alteração
  async function handleAlterar(event) {
    event.preventDefault();

    try {
      const response = await api.put(`/types/${id}`, {
        name: nome,
      });

      console.log(response.data);

      alert("Tipo alterado com sucesso!");

      // Volta para a lista de tipos
      navigate("/tipos");
    } catch (error) {
      console.error("Erro ao alterar tipo:", error);

      alert(
        error.response?.data?.message ||
          "Erro ao alterar o tipo."
      );
    }
  }

  if (carregando) {
    return (
      <main className="alterar-tipo">
        <p>Carregando...</p>
      </main>
    );
  }

  return (
    <div>
        <Navbar/>
    <main className="alterar-tipo">
        
      <div className="alterar-tipo-container">
        <h2>Alterar tipo</h2>

        <p>
          Altere o nome do tipo de planta.
        </p>

        <form onSubmit={handleAlterar}>
          <div className="campo">
            <label htmlFor="nome">
              Nome do tipo
            </label>

            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(event) =>
                setNome(event.target.value)
              }
              required
            />
          </div>

          <div className="botoes">
            <button
              type="button"
              className="botao-cancelar"
              onClick={() => navigate("/tipos")}
            >
              Cancelar
            </button>

            <button
              type="submit"
              className="botao-salvar"
            >
              Salvar alteração
            </button>
          </div>
        </form>
      </div>
    </main>
    <Footer/>
    </div>
  );
}

export default AlterarTipo;