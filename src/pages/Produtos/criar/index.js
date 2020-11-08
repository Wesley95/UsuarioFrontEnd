import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';

class CriarProduto extends Component {
    constructor(props) {
        super(props);

        this.state = {
            produto: {
                nome: "",
                preco: "",
                disponivel: true                
            },
            erro: null,
            redirect: false
        };
    }

    exibeErro() {
        const { erro } = this.state;

        if (erro) {
            return (
                <div className="alert alert-danger" role="alert">
                    Erro de conexão com o servidor
                </div>
            );
        }
    }

    render() {
        const { redirect } = this.state;
        if (redirect) {
            return <Redirect to="/produtos" />;
        } else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <fieldset>
                        <legend>Criar Produto</legend>
                        <div className="produto-insert">
                            <label htmlFor="nome">Nome </label>
                            <br />
                            <input type="text" id="nome" name="nome" placeholder="Nome" minLength="3" maxLength="100" required 
                            value={this.state.produto.nome} onChange={this.handleInputChange} />
                        </div>
                        <div className="produto-insert">
                            <label htmlFor="preco">Preço</label>
                            <br />
                            <input type="text" id="preco" name="preco" placeholder="Preço" required  value={this.state.produto.preco} 
                            onChange={this.handleInputChange}/>
                        </div>
                        <div className="produto-insert">
                            <label>
                                <input type="radio" name="ativo" value="true" checked={this.state.produto.disponivel === "true"}
                                    onChange={this.handleInputChange}/> Disponível
                            </label>
                            <label>
                                <input type="radio" value="false" name="ativo" checked={this.state.produto.disponivel === "false"}
                                    onChange={this.handleInputChange}/>Indisponível
                            </label>
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Novo Produto
                        </button>
                    </fieldset>
                </form>
            );
        }
    }

    handleInputChange = event => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState(prevState => ({
            produto: { ...prevState.produto, [name]: value }
        }));
        console.log(value);
    };

    handleSubmit = event => {
        fetch("http://localhost:3003/sistema/produtos", {
            method: "post",
            body: JSON.stringify(this.state.produto),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(data => {
                if (data.ok) {
                    this.setState({ redirect: true });
                } else {
                    data.json().then(data => {
                        if (data.error) {
                            this.setState({ erro: data.error });
                        }
                    });
                }
            })
            .catch(erro => this.setState({ erro: erro }));

        event.preventDefault();
    };
}

export default CriarProduto;
