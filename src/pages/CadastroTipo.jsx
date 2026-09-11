import { useState } from "react";
import { useNavigate } from "react-router";
import api from "../services/api";

import "./CadastroTipo.css";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

function CadastroTipo() {

  // Guarda o nome digitado pelo usuário
  const [nome, setNome] = useState("");

  // Permite navegar para outra página
  const navigate = useNavigate();

  async function handleCadastro(event) {

    // Impede o formulário de recarregar a página
    event.preventDefault();

    try {

      // Envia o nome para o backend
      const response = await api.post("/types", {
        name: nome
      });

      // Mostra no console o tipo criado
      console.log(response.data);

      alert("Tipo cadastrado com sucesso!");

      // Limpa o campo
      setNome("");

      // Volta para a tela que lista os tipos
      navigate("/tipos");

    } catch (error) {

      console.error(error);

      // Mostra a mensagem enviada pelo backend
      alert(
        error.response?.data?.message ||
        "Erro ao cadastrar tipo."
      );
    }
  }

  // Cancela o cadastro e volta para a lista
  function handleCancelar() {
    navigate("/tipos");
  }

  return (
    <div>

      <Navbar />

      <main className="cadastro-tipo">

        <div className="cadastro-tipo-container">

          <h2>Cadastrar tipo</h2>

          <p>
            Informe o nome do novo tipo de planta.
          </p>

          <form onSubmit={handleCadastro}>

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
                placeholder="Ex: Cacto"
                required
              />

            </div>

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
                Cadastrar tipo
              </button>

            </div>

          </form>

        </div>

      </main>

      <Footer />

    </div>
  );
}

export default CadastroTipo;