import { useState } from "react";
import { Link, useNavigate } from "react-router";

import "./Navbar.css";

function Navbar() {
  const [modalUsuario, setModalUsuario] = useState(false);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const usuarioLogado = !!token;

  function handleUsuario() {
    setModalUsuario(!modalUsuario);
  }

  function handleSair() {
    localStorage.removeItem("token");

    setModalUsuario(false);

    navigate("/login");
  }

  return (
    <header className="navbar">

      <div className="logo">
        <Link to="/home">
          🌵 Jardim Secreto
        </Link>
      </div>

      <nav>
        <ul className="menu">
          <li>
            <Link to="/home">Início</Link>
          </li>

          <li>
            <a href="#">Cactos</a>
          </li>

          <li>
            <a href="/suculentas">Suculentas</a>
          </li>

          <li>
            <Link to="/pesquisa">Pesquisa</Link>
          </li>

          <li>
            <a href="#">Ofertas</a>
          </li>

          <li>
            <a href="/contato">Contato</a>
          </li>
        </ul>
      </nav>

      <div className="icons">

        <button>🛒</button>

        <div className="usuario">

          <button onClick={handleUsuario}>
            👤
          </button>

          {modalUsuario && (
            <div className="modal-usuario">

              {usuarioLogado ? (
                <>
                  <Link to="/perfil">
                    Editar perfil
                  </Link>

                  <button onClick={handleSair}>
                    Sair
                  </button>
                </>
              ) : (
                <Link to="/login">
                  Entrar
                </Link>
              )}

            </div>
          )}

        </div>

      </div>

    </header>
  );
}

export default Navbar;