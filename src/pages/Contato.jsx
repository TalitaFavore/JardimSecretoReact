import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import "./Contato.css";

function Contato() {
    return (
        <div>
            <Navbar />
            <main className="contato">

                <section className="contato-header">
                    <h1>Entre em contato</h1>
                </section>

                <section className="contato-conteudo">

                    <div className="contato-info">
                        <div className="contato-imagem">
                            <img src="https://img.cdndsgni.com/preview/10483704.jpg" alt="" />
                        </div>

                        <h2>Fale com o Jardim Secreto</h2>

                        <p>
                            O Jardim Secreto nasceu em uma pequena cidade do interior,
                            com o carinho de quem acredita que um pouco de verde
                            pode transformar qualquer ambiente.
                        </p>

                        <div className="informacoes">
                            <p>📍 Jales - Interior de São Paulo</p>
                            <p>📱 (17) 99647-1935</p>
                            <p>✉️ contato@jardimsecreto.com</p>
                        </div>
                    </div>

                    <form className="contato-form">

                        <h2>Envie uma mensagem</h2>

                        <label htmlFor="nome">Nome</label>
                        <input
                            type="text"
                            id="nome"
                            placeholder="Digite seu nome"
                        />

                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Digite seu e-mail"
                        />

                        <label htmlFor="assunto">Assunto</label>
                        <input
                            type="text"
                            id="assunto"
                            placeholder="Como podemos ajudar?"
                        />

                        <label htmlFor="mensagem">Mensagem</label>
                        <textarea
                            id="mensagem"
                            placeholder="Escreva sua mensagem..."
                            rows="5"
                        />

                        <button type="submit">
                            Enviar mensagem
                        </button>

                    </form>

                </section>

            </main>
            <Footer />
        </div>

    );
}

export default Contato;