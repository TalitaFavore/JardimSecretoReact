import { useEffect, useState } from "react";
import api from "../services/api";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "./Cactos.css";

function Cactos() {

    // Guarda os cactos retornados pela API
    const [plantas, setPlantas] = useState([]);

    // Indica se os dados estão sendo carregados
    const [carregando, setCarregando] = useState(true);

    // Busca todos os cactos
    async function buscarCactos() {
        try {

            const response = await api.get("/plants/cactos");

            console.log(response.data);

            setPlantas(response.data);

        } catch (error) {

            console.error("Erro ao buscar cactos:", error);

        } finally {

            setCarregando(false);

        }
    }

    // Executa quando a tela é carregada
    useEffect(() => {
        buscarCactos();
    }, []);

    return (
        <div>

            <Navbar />

            <main className="cactos">

                <div className="cactos-container">

                    <section className="cactos-header">

                        <h2>
                            Cactos
                        </h2>

                    </section>

                    {carregando ? (

                        <p className="mensagem">
                            Carregando cactos...
                        </p>

                    ) : plantas.length === 0 ? (

                        <p className="mensagem">
                            Nenhum cacto encontrado.
                        </p>

                    ) : (

                        <div className="lista-cactos">

                            {plantas.map((planta) => (

                                <article
                                    className="card-cacto"
                                    key={planta.id_plants}
                                >

                                    <div className="imagem-cacto">

                                        <img
                                            src="https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=600&q=80"
                                            alt={planta.nome}
                                        />


                                    </div>

                                    <div className="info-cacto">

                                        <h3>
                                            {planta.nome}
                                        </h3>

                                        <div className="rodape-cacto">

                                            <span className="preco-cacto">
                                                R$ {Number(planta.preco).toFixed(2)}
                                            </span>

                                            <button>
                                                Ver detalhes
                                            </button>

                                        </div>

                                    </div>

                                </article>

                            ))}

                        </div>

                    )}

                </div>

            </main>

            <Footer />

        </div>
    );
}

export default Cactos;