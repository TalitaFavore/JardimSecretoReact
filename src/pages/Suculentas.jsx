import { useEffect, useState } from "react";
import api from "../services/api";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import "./Suculentas.css";

function Suculentas() {

    // Guarda as suculentas retornadas pela API
    const [plantas, setPlantas] = useState([]);

    // Indica se os dados estão sendo carregados
    const [carregando, setCarregando] = useState(true);

    // Busca todas as suculentas
    async function buscarSuculentas() {
        try {

            const response = await api.get("/plants/suculentas");

            console.log(response.data);

            setPlantas(response.data);

        } catch (error) {

            console.error("Erro ao buscar suculentas:", error);

        } finally {

            setCarregando(false);

        }
    }

    // Executa quando a tela é carregada
    useEffect(() => {
        buscarSuculentas();
    }, []);

    return (
        <div>

            <Navbar />

            <main className="suculentas">

                <div className="suculentas-container">

                    <section className="suculentas-header">

                        <h2>
                            Suculentas
                        </h2>

                    </section>

                    {carregando ? (

                        <p className="mensagem">
                            Carregando suculentas...
                        </p>

                    ) : plantas.length === 0 ? (

                        <p className="mensagem">
                            Nenhuma suculenta encontrada.
                        </p>

                    ) : (

                        <div className="lista-plantas">

                            {plantas.map((planta) => (

                                <article
                                    className="card-planta"
                                    key={planta.id_plants}
                                >

                                    <div className="imagem-planta">

                                        <img
                                            src="https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?auto=format&fit=crop&w=600&q=80"
                                            alt={planta.nome}
                                        />

                                    </div>

                                    <div className="info-planta">

                                        <h3>
                                            {planta.nome}
                                        </h3>


                                        <div className="rodape-card">

                                            <span className="preco">
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

export default Suculentas;