import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';
import { underAge } from '../../Usuario/scripts/InAllFile.js';
import $ from 'jquery';

class CriarUsuario extends Component {
    constructor(props) {
        super(props);

        this.state = {
            usuario: {
                nome: "",
                salario: "",
                dataNascimento: "",
                ativo: "true"
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
            return <Redirect to="/usuarios" />;
        } else {
            return (
                <form onSubmit={this.handleSubmit} className="form-edit form-check">
                    <fieldset>
                        <legend>Criar Usuário</legend>
                        <div className="usuario-insert">
                            <label htmlFor="nome">Nome </label>
                            <input type="text" id="nome" name="nome" className="form-control" placeholder="Nome" minLength="3" maxLength="100" required onChange={this.handleInputChange} />
                        </div>
                        <div className="usuario-insert">
                            <label htmlFor="dataNascimento">Data de Nascimento </label>
                            <input type="date" id="dataNascimento" className="form-control" name="dataNascimento"
                                placeholder="Data de Nascimento" required value={this.state.usuario.dataNascimento} onChange={this.handleInputChange} />
                        </div>

                        <div class="form-check">
                            <input className="form-check-input" type="checkbox" name="ativo" id="active" onChange={this.handleInputChange} />
                            <label className="form-check-label" for="active">
                                Ativo
                            </label>
                        </div>

                        <button type="submit" className="btn btn-primary">Cadastrar</button>
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
            usuario: { ...prevState.usuario, [name]: value }
        }));
        // console.log(value);
    };

    handleSubmit = event => {

        var age = underAge(this.state.usuario.dataNascimento, "-");
        var checked = $(".form-check-input:checked").length > 0?true:false;
        // alert(checked);
        if (age.age >= 18) {

            this.state.usuario.dataNascimento = age.year;
            this.state.usuario.ativo = checked;
            this.state.usuario.salario = "0.00";
            // console.log(JSON.stringify(this.state.usuario));

            fetch(`${process.env.REACT_APP_API_URL}/sistema/usuarios`, {
                method: "post",
                body: JSON.stringify(this.state.usuario),
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
        }
        else {
            if (age.age <= 0) {
                alert("Idade negativa não é aceitável.");
            }
            else
                alert("Proibido usuários menores de idade.");
        }      

        event.preventDefault();
    };
}

export default CriarUsuario;
