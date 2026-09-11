import { useEffect, useState } from "react";
import { Link } from "react-router";
import api from "../services/api";
import "./Tipos.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Tipos() {
    const [tipos, setTipos] = useState([]);
    const [carregando, setCarregando] = useState(true);

    // Busca todos os tipos cadastrados
    async function buscarTipos() {
        try {
            const response = await api.get("/types");

            console.log(response.data);

            setTipos(response.data);
        } catch (error) {
            console.error("Erro ao buscar tipos:", error);
            alert("Erro ao carregar os tipos.");
        } finally {
            setCarregando(false);
        }
    }

    // Executa a busca quando a página é carregada
    useEffect(() => {
        buscarTipos();
    }, []);

    // Exclui um tipo
    async function handleExcluir(id) {
        const confirmar = window.confirm(
            "Tem certeza que deseja excluir este tipo?"
        );

        if (!confirmar) {
            return;
        }

        try {
            await api.delete(`/types/${id}`);

            alert("Tipo excluído com sucesso!");

            // Atualiza a lista depois da exclusão
            buscarTipos();
        } catch (error) {
            console.error("Erro ao excluir tipo:", error);

            alert(
                error.response?.data?.message ||
                "Erro ao excluir o tipo."
            );
        }
    }

    return (
        <div>
            <Navbar />

            <main className="tipos">

                <div className="tipos-container">

                    <div className="tipos-cabecalho">
                        <div>
                            <h2>Tipos de plantas</h2>
                            <p>Gerencie os tipos cadastrados no Jardim Secreto.</p>
                        </div>

                        <Link to="/cadastro-tipo" className="botao-novo">
                            + Novo tipo
                        </Link>
                    </div>

                    {carregando ? (
                        <p className="mensagem">Carregando tipos...</p>
                    ) : tipos.length === 0 ? (
                        <p className="mensagem">
                            Nenhum tipo cadastrado.
                        </p>
                    ) : (
                        <div className="tabela-container">
                            <table>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Nome</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {tipos.map((tipo) => (
                                        <tr key={tipo.id_tipos}>
                                            <td>{tipo.id_tipos}</td>
                                            <td>{tipo.nome_tipos}</td>

                                            <td className="acoes">
                                                <Link
                                                    to={`/alterar-tipo/${tipo.id_tipos}`}
                                                    className="botao-alterar"
                                                >
                                                    Alterar
                                                </Link>

                                                <button
                                                    onClick={() =>
                                                        handleExcluir(tipo.id_tipos)
                                                    }
                                                    className="botao-excluir"
                                                >
                                                    Excluir
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                </div>
            </main>
            <Footer/>
        </div>
    );
}

export default Tipos;