import { useEffect, useState } from "react";
import api from "../services/api";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "./Pesquisa.css";

function Pesquisa() {

    // Guarda o que o usuário está digitando
    const [nome, setNome] = useState("");

    // Guarda as plantas retornadas pela API
    const [plantas, setPlantas] = useState([]);

    // Indica se os dados estão sendo carregados
    const [carregando, setCarregando] = useState(true);

    // Busca todas as plantas
    async function buscarTodasPlantas() {
        try {

            const response = await api.get("/plants");

            console.log(response.data);

            setPlantas(response.data);

        } catch (error) {

            console.error("Erro ao buscar plantas:", error);

        } finally {

            setCarregando(false);

        }
    }

    // Busca plantas pelo nome
    async function pesquisarPlantas(valor) {
        try {

            const response = await api.get(
                `/plants/search?nome=${valor}`
            );

            console.log(response.data);

            setPlantas(response.data);

        } catch (error) {

            console.error("Erro ao pesquisar plantas:", error);

        } finally {

            setCarregando(false);

        }
    }

    // Executa sempre que o valor da pesquisa mudar
    useEffect(() => {

        if (nome.trim() === "") {

            // Se a barra estiver vazia,
            // busca todas as plantas
            buscarTodasPlantas();

        } else {

            // Se houver texto,
            // pesquisa pelo nome
            pesquisarPlantas(nome);

        }

    }, [nome]);

    return (
        <div>

            <Navbar />

            <main className="pesquisa">

                <div className="pesquisa-container">

                    <h2>Encontre sua planta</h2>

                    <div className="barra-pesquisa">

                        <input
                            type="text"
                            placeholder="Digite o nome da planta..."
                            value={nome}
                            onChange={(event) =>
                                setNome(event.target.value)
                            }
                        />

                        <span>🔍</span>

                    </div>

                    {carregando ? (

                        <p className="mensagem">
                            Carregando plantas...
                        </p>

                    ) : plantas.length === 0 ? (

                        <p className="mensagem">
                            Nenhuma planta encontrada.
                        </p>

                    ) : (

                        <div className="lista-plantas">

                            {plantas.map((planta) => (

                                <div
                                    className="card-planta"
                                    key={planta.id_plants}
                                >
                                    <img
                                        src="https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=500&q=80"
                                        alt={planta.nome}
                                    />

                                    <div className="info-planta">
                                        <h3>{planta.nome}</h3>

                                        <p>
                                            R$ {Number(planta.preco).toFixed(2)}
                                        </p>
                                    </div>
                                </div>

                            ))}

                        </div>

                    )}

                </div>

            </main>

            <Footer />

        </div>
    );
}

export default Pesquisa;