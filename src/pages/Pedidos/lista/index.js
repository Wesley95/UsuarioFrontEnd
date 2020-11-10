import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../criar/Plugins/masonry.js'

export default class ListarPedidos extends Component {
    constructor(props) {
        super(props);

        this.state = {
            pedidos: [],
            erro: null,
            redirect: false
        }
    }

    componentDidMount() {
        fetch(`${process.env.REACT_APP_API_URL}/sistema/pedidos`)
            .then(pedidos =>
                pedidos.json().then(pedidos => this.setState({ pedidos }))
            )
            .catch(erro => this.setState({ erro }));



    }

    render() {

        var { pedidos } = this.state;

        pedidos = pedidos.sort((a, b) => {
            return a.PedidoID - b.PedidoID;
        });

        let requests = {
            pedidos: [],
            pedidosAtualizados: []
        }

        var aux = [], count = 0, alt = 0, l = 0;


        pedidos.forEach((e) => {
            alt = l;
            for (l = alt; l < pedidos.length; l++) {
                if (e.PedidoID == pedidos[l].PedidoID) {
                    aux.push(pedidos[l]);
                } else break;
            }
            if (aux.length > 0) {
                requests.pedidos.push(aux);
                aux = [];
            }
        });


        requests.pedidos.forEach((e, index) => {
            aux = [];

            e.forEach((eachE) => {
                aux.push({
                    NomeProduto: eachE.NomeProduto,
                    TotalProduto: eachE.TotalProduto,
                    PrecoProduto: eachE.PrecoProduto
                });
            });
            let temp = e[0].DataCriacao.substr(0, 10).split("-");
            requests.pedidosAtualizados.push({
                UsuarioID: e[0].UsuarioID,
                PedidoID: e[0].PedidoID,
                UsuarioNome: e[0].UsuarioNome,
                DataCriacao: temp[2] + "/" + temp[1] + "/" + temp[0],
                Produtos: aux
            });
        });
        var total = 0;

        return (

            <div className="container-div ul-masonry-container">
                {requests.pedidosAtualizados.map((pedidos, index) => (

                    <div className="request-client-field" data-id={pedidos.PedidoID}>
                        <div className="invi-div">{total = 0}</div>
                        <div className="top-id-request box-default">
                            Pedido {pedidos.PedidoID}<br />
                        </div>
                        <div className="client-request-info box-default">
                            <div className="lines lines-text"><label className="label-request">Nome:</label> {pedidos.UsuarioNome}</div>
                            <div className="lines lines-text"><label className="label-request">Data do Pedido:</label> {pedidos.DataCriacao}</div>
                        </div>
                        <div className="request-info-products">
                            {pedidos.Produtos.map((produtos, index) => {

                                (total += parseFloat(produtos.PrecoProduto) * parseInt(produtos.TotalProduto))
                                return (
                                    <div className="product-area box-default">
                                        <div className="info-request-products">
                                            <div className="product-count-name">
                                                <label className="label-request">{produtos.NomeProduto + " (" + produtos.TotalProduto + "x)"}</label>
                                            </div>
                                            <div className="price-field">
                                                <label className="label-request-price">R${produtos.PrecoProduto.toString().replace(".", ",")}</label>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}

                            <div className="product-price-total info-request-products box-default">
                                <div className="lines-text"><label className="label-request">Total</label></div>
                                <div className="lines-text"><label className="label-request label-total">{"R$" + total.toString().replace(".", ",")}</label></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}