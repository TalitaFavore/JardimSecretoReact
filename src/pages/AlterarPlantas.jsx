import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

import api from "../services/api";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "./AlterarPlantas.css";

function AlterarPlanta() {
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [idTipos, setIdTipos] = useState("");

  const [tipos, setTipos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const { id } = useParams();
  console.log("ID recebido pela URL:", id);
  const navigate = useNavigate();

  // Busca a planta pelo ID
  async function buscarPlanta() {
    try {
      const response = await api.get(`/plants/${id}`);

      console.log(response.data);

      const planta = response.data;

      setNome(planta.nome);
      setPreco(planta.preco);
      setQuantidade(planta.quantidade);
      setIdTipos(planta.id_tipos);

    } catch (error) {
      console.error("Erro ao buscar planta:", error);

      alert("Erro ao carregar a planta.");

      navigate("/plantas");
    }
  }

  // Busca os tipos cadastrados
  async function buscarTipos() {
    try {
      const response = await api.get("/types");

      console.log(response.data);

      setTipos(response.data);

    } catch (error) {
      console.error("Erro ao buscar tipos:", error);

      alert("Erro ao carregar os tipos.");
    }
  }

  // Busca a planta e os tipos quando a página abre
  useEffect(() => {
    async function carregarDados() {
      await Promise.all([
        buscarPlanta(),
        buscarTipos()
      ]);

      setCarregando(false);
    }

    carregarDados();
  }, [id]);

  // Atualiza a planta
  async function handleAlterar(event) {
    event.preventDefault();

    try {
      const response = await api.put(`/plants/${id}`, {
        nome: nome,
        preco: Number(preco),
        quantidade: Number(quantidade),
        id_tipos: Number(idTipos)
      });

      console.log(response.data);

      alert("Planta alterada com sucesso!");

      navigate("/plantas");

    } catch (error) {
      console.error("Erro ao alterar planta:", error);

      alert(
        error.response?.data?.message ||
        "Erro ao alterar a planta."
      );
    }
  }

  function handleCancelar() {
    navigate("/plantas");
  }

  if (carregando) {
    return (
      <div>
        <Navbar />

        <main className="alterar-planta">
          <p>Carregando...</p>
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <main className="alterar-planta">

        <div className="alterar-planta-container">

          <h2>Alterar planta</h2>

          <p>
            Altere os dados da planta cadastrada.
          </p>

          <form onSubmit={handleAlterar}>

            {/* Nome */}
            <div className="campo">
              <label htmlFor="nome">
                Nome da planta
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

            {/* Preço */}
            <div className="campo">
              <label htmlFor="preco">
                Preço
              </label>

              <input
                type="number"
                id="preco"
                value={preco}
                onChange={(event) =>
                  setPreco(event.target.value)
                }
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
                onChange={(event) =>
                  setQuantidade(event.target.value)
                }
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
                onChange={(event) =>
                  setIdTipos(event.target.value)
                }
                required
              >
                <option value="">
                  Selecione um tipo
                </option>

                {tipos.map((tipo) => (
                  <option
                    key={tipo.id_tipos}
                    value={tipo.id_tipos}
                  >
                    {tipo.nome_tipos}
                  </option>
                ))}
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
                className="botao-salvar"
              >
                Salvar alteração
              </button>

            </div>

          </form>

        </div>

      </main>

      <Footer />
    </div>
  );
}

export default AlterarPlanta;