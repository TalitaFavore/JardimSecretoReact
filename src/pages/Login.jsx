import { Link } from "react-router";
import "./Login.css";

function Login() {
    return (
        <main className="login">

            <div className="login-container">

                <div className="login-formulario">

                    <h2>Entre na sua conta</h2>

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

                        <div className="opcoes-login">

                            <Link to="/recuperar-senha">
                                Esqueci minha senha
                            </Link>

                        </div>

                        <button
                            type="submit"
                            className="botao-login"
                        >
                            Entrar
                        </button>

                    </form>

                    <p className="cadastro">
                        Ainda não possui uma conta?

                        <Link to="/cadastro">
                            Criar conta
                        </Link>
                    </p>

                </div>

            </div>

        </main>
    );
}

export default Login;