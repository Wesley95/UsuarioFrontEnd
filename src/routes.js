import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import MainUsuario from './pages/Usuario/main';
import DetalhesUsuario from './pages/Usuario/detalhes';
import CriarUsuario from './pages/Usuario/criar';
import EditarUsuario from './pages/Usuario/editar';
import DeletarUsuario from './pages/Usuario/deletar';

import MainProdutos from './pages/Produtos/main';
import CriarProduto from './pages/Produtos/criar';
import EditarProduto from './pages/Produtos/editar';

import RealizarPedido from './pages/Pedidos/criar';

import ListarPedidos from './pages/Pedidos/lista';

const Routes = () => (

    <BrowserRouter>
        <Switch>
            <Route exact path="/usuarios" component={MainUsuario} />
            <Route path="/usuarios/:id" component={DetalhesUsuario} />
            <Route path="/criarUsuario" component={CriarUsuario} />
            <Route path="/editarUsuario/:id" component={EditarUsuario} />
            <Route path="/deletarUsuario/:id" component={DeletarUsuario} />

            <Route exact path='/produtos' component={MainProdutos} />
            <Route path="/criarProduto" component={CriarProduto} />
            <Route path="/editarProduto/:id" component={EditarProduto} />

            <Route path='/realizarPedido' component={RealizarPedido} />

            <Route exact path='/listarPedidos' component={ListarPedidos} />

        </Switch>
    </BrowserRouter>
)

export default Routes;
