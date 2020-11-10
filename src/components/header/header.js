import React from 'react';
import './header.css';
import { Link } from "react-router-dom";

const Header = () => (

    <div class="nav-top">
        <div class="top-border"></div>
        <div class="border-style"></div>

        <div class="width-max ">
            <ul class="left-li">
                <li><a href="/listarPedidos">Pedidos</a></li>
                <li><a href="/realizarPedido">Realizar Pedidos</a></li>
                <li><a href="/usuarios">Clientes</a></li>
                <li><a href="/produtos">Produtos</a></li>

            </ul>
        </div>
    </div>

);



export default Header; 