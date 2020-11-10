import $ from 'jquery';
import React, { Component } from 'react';
import './index.css';
import { Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../criar/Plugins/jquery.dpNumberPicker-1.0.1-min.js';
import './Plugins/css/jquery.dpNumberPicker-1.0.1-min.css';
import './Plugins/css/jquery.dpNumberPicker-holoLight-1.0.1-min.css';
import './Plugins/jquery.NumberPickerController.js';
import './Plugins/jquery.RequestController.js';

export default class Main extends Component {
    constructor(props) {
        super(props);

        this.state = {
            produto: [],
            cliente: [],
            erro: null
        };
    }

    componentDidMount() {
        fetch(`${process.env.REACT_APP_API_URL}/sistema/produtos`)
            .then(produto =>
                produto.json().then(produto => this.setState({ produto }))
            )
            .catch(erro => this.setState({ erro }));

        fetch(`${process.env.REACT_APP_API_URL}/sistema/usuarios`)
            .then(cliente =>
                cliente.json().then(cliente => this.setState({ cliente }))
            )
            .catch(erro => this.setState({ erro }));

        $("#number-picker").dpNumberPicker({
            min: 1,// Minimum value.
            max: 15,// Maximum value.
            value: 1,// Initial value
            step: 1,// Incremental/decremental step on up/down change.
            format: false,
            editable: false,
            addText: "+",
            subText: "-",
            formatter: function (val) { return val; },
            beforeIncrease: function () { },
            afterIncrease: function () { },
            beforeDecrease: function () { },
            afterDecrease: function () { },
            beforeChange: function () { },
            afterChange: function () { },
            onMin: function () { },
            onMax: function () { }
        });
    }

    handleSubmit = event => {

        let all = {
            clientId: $(".client-name option:selected").val(),
            Products: []
        };

        $(".request-field .request-item").each(function (index, element) {
            var newvalue = {
                id: $(this).attr("data-id"),
                total: $(this).find(".total-product .dp-numberPicker-input").val()
            };

            all["Products"].push(newvalue);
        });

        if (all["Products"].length > 0) {

            if (all.clientId != null && all.clientId != undefined) {
                console.log(JSON.stringify(all));

                fetch(`${process.env.REACT_APP_API_URL}/sistema/pedidos`, {
                    method: "post",
                    body: JSON.stringify(all),
                    headers: {
                        "Content-Type": "application/json"
                    }
                }).then(data => {
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
                alert("We gottta a problem.");
            }
        } else {
            alert("Não há produtos selecionados. Favor selecionar um para que possa prosseguir com o cadastro.");
        }

        event.preventDefault();
    };

    render() {
        const { produto, cliente,redirect } = this.state;
        
        if (redirect) {
            return <Redirect to="/listarPedidos"/>;
        } else {
            return (
                <div className="divider container-principal">
                    <div className="divider-left">
                        <div className="produto-list">
                            <table className="table">
                                <thead>
                                    <tr id>
                                        <th scope="col">#</th>
                                        <th scope="col">Nome</th>
                                        <th scope="col">Preço</th>
                                        <th scope="col">Adicionar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {produto.map((produto, index) => (
                                        <tr id={produto.id}>
                                            <th scope="row">{produto.id}</th>
                                            <td>{produto.nome}</td>
                                            <td>{produto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                                            <td> <button type="button" id={produto.id} data-id={produto.id} className="btn-add-request btn btn-primary">+</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                    </div>
                    <div className="divider-right">
                        <form onSubmit={this.handleSubmit}>
                            <div className="client-name-container">
                                <div className="">
                                    <label htmlFor="client-name" className="">Cliente:</label>
                                    <select id="client-name" name="" className="custom-select client-name" required>
                                        {cliente.map((cliente, index) => (
                                            <option value={cliente.id} data-id={cliente.id}>{cliente.nome}</option>
                                        ))}
                                    </select>
                                </div>
                                <button className="col-auto my-1 btn btn-warning confirm-requests">Confirmar</button>
                            </div>
                        </form>
                        <div className="request-field">
                            {/* <div className="request-item" data-id="1">
                            <div className="line-divider small-box">
                                <div className="product-name-price">
                                    Vrau
                                </div>
                                <div className="cancel-request">
                                    Fechar
                                </div>
                            </div>
                            <div className="line-divider small-box">
                                <div className="product-name-price">
                                    <div className="price">
                                        R$150,00
                                    </div>
                                    <div className="price-count">
                                        150,00 x 2
                                    </div>
                                </div>
                                <div className="cancel-request">
                                    <div id="number-picker"></div>
                                </div>
                            </div>
                        </div> */}
                        </div>
                    </div>
                </div>
            )
        }
    }
}
