import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import './index.css';
import CurrencyInput from 'react-currency-masked-input'
import $ from 'jquery';
import { cleanText } from '../../Usuario/scripts/InAllFile.js'

class EditarProduto extends Component {
    constructor(props) {
        super(props);

        this.state = {
            produto: {
                nome: "",
                preco: "",
                disponivel: false
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

    componentDidMount() {
        const { id } = this.props.match.params;

        fetch(`${process.env.REACT_APP_API_URL}/sistema/produtos/${id}`)
            .then(data => {   
                data.json().then(data => {
                    if (data.error) {
                        this.setState({ erro: data.error });
                    } else {
                        this.setState({ produto: data });   
                    }
                });
            })
            .catch(erro => this.setState({ erro: erro }));      
            
            console.log(this.state.produto);
    }

    render() {
        const { redirect } = this.state;

        if (redirect) {
            return <Redirect to="/produtos" />;
        } else {
            return (
                <form onSubmit={this.handleSubmit} className="form-edit form-check">
                    <fieldset>
                        <legend>Editar Produto</legend>
                        <div className="usuario-update">
                            <label htmlFor="nome">Nome </label>
                            <input type="text" id="nome" name="nome" placeholder="Nome" className="form-control" minLength="3" maxLength="100"
                             required value={this.state.produto.nome} onChange={this.handleInputChange} />
                        </div>
                        <div className="usuario-update">
                            <label htmlFor="preco">Preço</label>
                            <CurrencyInput type="text" pattern="[0-9]+(\.[0-9][0-9]?)?" name="preco" id="preco" className="form-control"
                                placeholder="0.00" onChange={this.handleInputChange} />
                        </div>


                        <div class="form-check">
                            <input className="form-check-input active" type="checkbox" name="checkAtiveUn" id="active" defaultChecked={this.state.produto.disponivel} />
                            <label className="form-check-label" for="active">
                                Ativo
                            </label>
                        </div>                        

                        <button type="submit" className="btn btn-primary">Atualizar</button>
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
    };

    handleSubmit = event => {
        const { id } = this.state.produto;
        var preco = $("#preco").val().length != 0 ? $("#preco").val() : "0.00";

        this.state.produto.preco = preco;
        this.state.produto.disponivel = $(".active:checked").length > 0 ? true : false;
        this.state.produto.nome = cleanText(this.state.produto.nome);

        //console.log(JSON.stringify(this.state.produto));

        fetch(`${process.env.REACT_APP_API_URL}/sistema/produtos/${id}`, {
            method: "put",
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

export default EditarProduto;
