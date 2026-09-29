import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import api from "../services/api";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "./CadastroPlantas.css";

function CadastroPlanta() {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [idTipos, setIdTipos] = useState("");

  const [tipos, setTipos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const navigate = useNavigate();

  // Busca os tipos cadastrados
  async function buscarTipos() {
    try {
      const response = await api.get("/types");

      console.log(response.data);

      setTipos(response.data);
    } catch (error) {
      console.error("Erro ao buscar tipos:", error);

      alert("Erro ao carregar os tipos de plantas.");
    } finally {
      setCarregando(false);
    }
  }

  // Executa quando a página é carregada
  useEffect(() => {
    buscarTipos();
  }, []);

  // Função responsável pelo cadastro
  async function handleCadastro(event) {
    event.preventDefault();

    try {
      const response = await api.post("/plants", {
        nome: nome,
        preco: Number(preco),
        quantidade: Number(quantidade),
        id_tipos: Number(idTipos),
      });

      console.log(response.data);

      alert("Planta cadastrada com sucesso!");

      // Limpa os campos
      setNome("");
      setPreco("");
      setQuantidade("");
      setIdTipos("");

      // Volta para a lista de plantas
      navigate("/plantas");

    } catch (error) {
      console.error("Erro ao cadastrar planta:", error);

      alert(
        error.response?.data?.message ||
        "Erro ao cadastrar a planta."
      );
    }
  }

  function handleCancelar() {
    navigate("/plantas");
  }

  return (
    <div>
      <Navbar />

      <main className="cadastro-planta">
        <div className="cadastro-planta-container">

          <h2>Cadastrar planta</h2>

          <p>
            Preencha os dados para cadastrar uma nova planta.
          </p>

          <form onSubmit={handleCadastro}>

            {/* Nome */}
            <div className="campo">
              <label htmlFor="nome">
                Nome da planta
              </label>

              <input
                type="text"
                id="nome"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
                placeholder="Ex: Cacto Bola"
                required
              />
            </div>

            {/* Preço */}
            <div className="campo">
              <label htmlFor="preco">
                Preço
              </label>

              <input
                type="number"
                id="preco"
                value={preco}
                onChange={(event) => setPreco(event.target.value)}
                placeholder="Ex: 29.90"
                step="0.01"
                min="0"
                required
              />
            </div>

            {/* Quantidade */}
            <div className="campo">
              <label htmlFor="quantidade">
                Quantidade em estoque
              </label>

              <input
                type="number"
                id="quantidade"
                value={quantidade}
                onChange={(event) => setQuantidade(event.target.value)}
                placeholder="Ex: 10"
                min="0"
                required
              />
            </div>

            {/* Tipo */}
            <div className="campo">
              <label htmlFor="tipo">
                Tipo de planta
              </label>

              <select
                id="tipo"
                value={idTipos}
                onChange={(event) => setIdTipos(event.target.value)}
                required
              >
                <option value="">
                  Selecione um tipo
                </option>

                {carregando ? (
                  <option disabled>
                    Carregando...
                  </option>
                ) : (
                  tipos.map((tipo) => (
                    <option
                      key={tipo.id_tipos}
                      value={tipo.id_tipos}
                    >
                      {tipo.nome_tipos}
                    </option>
                  ))
                )}
              </select>
            </div>

            {/* Botões */}
            <div className="botoes">

              <button
                type="button"
                className="botao-cancelar"
                onClick={handleCancelar}
              >
                Cancelar
              </button>

              <button
                type="submit"
                className="botao-cadastrar"
              >
                Cadastrar planta
              </button>

            </div>

          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default CadastroPlanta;