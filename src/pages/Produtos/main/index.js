import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            produto: [],
            erro: null
        };
    }

    componentDidMount() {
        fetch(`${process.env.REACT_APP_API_URL}/sistema/produtos`)
            .then(produto =>
                produto.json().then(produto => this.setState({ produto }))
            )
            .catch(erro => this.setState({ erro }));
    }

    render() {
        const { produto } = this.state;

        return (
            <div className="produto-list">
                <Link to={`/criarProduto`}> <button type="button" class="btn btn-new-products btn-success">Novo</button> </Link>
                <br /><br />

                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>
                            <th scope="col">Preço</th>
                            <th scope="col">Disponível</th>
                        </tr>
                    </thead>
                    <tbody>
                        {produto.map((produto, index) => (
                            <tr>
                                <th scope="row">{produto.id}</th>
                                <td>{produto.nome}</td>
                                <td>{produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                <td>{produto.disponivel ? "Sim" : "Não"}</td>
                                <td> <Link to={`/editarProduto/${produto.id}`}> <button type="button" class="btn btn-danger">Atualizar</button> </Link></td>                                
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}
