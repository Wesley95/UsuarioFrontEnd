import React, { Component } from 'react';
import '../scripts/usuario.js';
import { Link } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usuario: [],
            erro: null
        };
    }

    componentDidMount() {
        fetch(`http://localhost:3003/sistema/usuarios`)
            .then(usuario =>
                usuario.json().then(usuario => this.setState({ usuario }))
            )
            .catch(erro => this.setState({ erro }));
    }

    render() {
        const { usuario } = this.state;

        return (
            <div className="usuario-list">
                <Link to={`/criarUsuario`}> <button type="button" class="btn btn-new-user btn-success">Novo</button> </Link>
                <br /><br />

                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nome</th>                            
                            <th scope="col">Nascimento</th>
                            <th scope="col">Ativo</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usuario.map((usuario, index) => (
                            <tr>
                                <th scope="row">{usuario.id}</th>
                                <td>{usuario.nome}</td>                                
                                <td>{new Date(usuario.dataNascimento).toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' })}</td>
                                <td>{usuario.ativo ? "Sim" : "Não"}</td>
                                <td><button data-id={usuario.id} type="button" className="btn btn-delete-user btn-danger">Excluir</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    }
}
