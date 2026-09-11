import { useState } from "react";
import { Link, useNavigate } from "react-router";

import api from "../services/api";

import "./Auth.css";

function Cadastro() {

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const navigate = useNavigate();

  async function handleCadastro(event) {

    event.preventDefault();

    if (senha !== confirmarSenha) {
      alert("As senhas não são iguais.");
      return;
    }

    try {
      const response = await api.post("/users/register", {
        email: email,
        password: senha
      });

      console.log(response.data);

      alert("Cadastro realizado com sucesso!");

      navigate("/");

    } catch (error) {

      console.error(error);

      if (error.response) {

        alert(
          error.response.data.mensagem ||
          "Erro ao realizar cadastro."
        );

      } else {

        alert("Não foi possível conectar ao servidor.");

      }
    }
  }

  return (
    <main className="login">

      <div className="login-container">

        <div className="login-formulario">

          <h2>Crie sua conta</h2>

          <form onSubmit={handleCadastro}>

            <div className="campo">

              <label htmlFor="email">
                E-mail
              </label>

              <input
                type="email"
                id="email"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
                placeholder="Digite seu e-mail"
                required
              />

            </div>

            <div className="campo">

              <label htmlFor="senha">
                Senha
              </label>

              <input
                type="password"
                id="senha"
                value={senha}
                onChange={(event) =>
                  setSenha(event.target.value)
                }
                placeholder="Digite sua senha"
                required
              />

            </div>

            <div className="campo">

              <label htmlFor="confirmar-senha">
                Confirmar senha
              </label>

              <input
                type="password"
                id="confirmar-senha"
                value={confirmarSenha}
                onChange={(event) =>
                  setConfirmarSenha(event.target.value)
                }
                placeholder="Digite sua senha novamente"
                required
              />

            </div>

            <button
              type="submit"
              className="botao-login"
            >
              Criar conta
            </button>

          </form>

          <p className="cadastro">

            Já possui uma conta?

            <Link to="/login">
              Entrar
            </Link>

          </p>
        </div>
      </div>
    </main>
  );
}

export default Cadastro;