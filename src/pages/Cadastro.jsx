import { Link } from "react-router";
import "./Login.css";

function Cadastro() {
  return (
    <main className="login">

      <div className="login-container">

        <div className="login-formulario">

          <h2>Crie sua conta</h2>

          <form>
            <div className="campo">
              <label htmlFor="email">
                E-mail
              </label>

              <input
                type="email"
                id="email"
                placeholder="Digite seu e-mail"
              />
            </div>

            <div className="campo">
              <label htmlFor="senha">
                Senha
              </label>

              <input
                type="password"
                id="senha"
                placeholder="Digite sua senha"
              />
            </div>

            <div className="campo">
              <label htmlFor="confirmar-senha">
                Confirmar senha
              </label>

              <input
                type="password"
                id="confirmar-senha"
                placeholder="Digite sua senha novamente"
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