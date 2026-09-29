import { useEffect, useState } from "react";
import { Link } from "react-router";

import api from "../services/api";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "./Plantas.css";

function Plantas() {
  const [plantas, setPlantas] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Busca todas as plantas cadastradas
  async function buscarPlantas() {
    try {
      const response = await api.get("/plants");

      console.log("Plantas:", response.data);

      setPlantas(response.data);
    } catch (error) {
      console.error("Erro ao buscar plantas:", error);

      alert("Erro ao carregar as plantas.");
    } finally {
      setCarregando(false);
    }
  }

  // Busca todos os tipos cadastrados
  async function buscarTipos() {
    try {
      const response = await api.get("/types");

      console.log("Tipos:", response.data);

      setTipos(response.data);
    } catch (error) {
      console.error("Erro ao buscar tipos:", error);

      alert("Erro ao carregar os tipos.");
    }
  }

  // Executa quando a página é carregada
  useEffect(() => {
    buscarPlantas();
    buscarTipos();
  }, []);

  // Exclui uma planta
  async function handleExcluir(id) {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir esta planta?"
    );

    if (!confirmar) {
      return;
    }

    try {
      await api.delete(`/plants/${id}`);

      alert("Planta excluída com sucesso!");

      // Atualiza a lista depois da exclusão
      buscarPlantas();
    } catch (error) {
      console.error("Erro ao excluir planta:", error);

      alert(
        error.response?.data?.message ||
        "Erro ao excluir a planta."
      );
    }
  }

  return (
    <div>
      <Navbar />

      <main className="plantas">
        <div className="plantas-container">

          <div className="plantas-cabecalho">
            <div>
              <h2>Plantas cadastradas</h2>

              <p>
                Gerencie as plantas cadastradas no Jardim Secreto.
              </p>
            </div>

            <Link
              to="/cadastro-planta"
              className="botao-novo"
            >
              + Nova planta
            </Link>
          </div>

          {carregando ? (
            <p className="mensagem">
              Carregando plantas...
            </p>
          ) : plantas.length === 0 ? (
            <p className="mensagem">
              Nenhuma planta cadastrada.
            </p>
          ) : (
            <div className="tabela-container">

              <table>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>Preço</th>
                    <th>Quantidade</th>
                    <th>Tipo</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>
                  {plantas.map((planta) => {

                    // Procura o tipo correspondente ao id_tipos
                    const tipo = tipos.find(
                      (tipo) =>
                        Number(tipo.id_tipos) ===
                        Number(planta.id_tipos)
                    );

                    return (
                      <tr
                        key={planta.id_plantas}
                      >

                        <td>
                          {planta.id_plantas}
                        </td>

                        <td>
                          {planta.nome}
                        </td>

                        <td>
                          R$ {Number(planta.preco).toFixed(2)}
                        </td>

                        <td>
                          {planta.quantidade}
                        </td>

                        <td>
                          {tipo
                            ? tipo.nome_tipos
                            : "Tipo não encontrado"}
                        </td>

                        <td className="acoes">

                          <Link
                            to={`/alterar-planta/${planta.id_plantas}`}
                            className="botao-alterar"
                          >
                            Alterar
                          </Link>

                          <button
                            className="botao-excluir"
                            onClick={() =>
                              handleExcluir(
                                planta.id_plantas
                              )
                            }
                          >
                            Excluir
                          </button>

                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>

            </div>
          )}

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Plantas;

