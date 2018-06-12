import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';

import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Footer from '../../components/Footer/Footer';

import Categoria from '../../components/Categoria/Categoria';
import Login from '../../components/Login/login';
import Registrar from '../../components/Registrar/Registrar';
import Portada from '../../components/Portada/portada';
import Usuario from '../../components/Perfil/Usuario/Usuario';
import AnuncioDetalle from '../../components/AnuncioDetalle/AnuncioDetalle';

import FormularioAnuncio from '../../components/Formularios/FormularioAnuncio';
import FormularioUsuario from '../../components/Formularios/FormularioUsuario';
import FormularioCategoria from '../../components/Formularios/FormularioCategoria';
import FormularioPlan from '../../components/Formularios/FormularioPlan';
import FormularioComentario from '../../components/Formularios/FormularioComentario';

class Layout extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            userLogged: false,
            token: sessionStorage.getItem('jwtToken')
        }
        this.UserLogged = this.UserLogged.bind(this);
    }

    UserLogged = (value, token) => {
        this.setState({
            userLogged: value,
            token: (typeof token != 'undefined')?token:''
        });
    }

    render () {
        return (
            <Aux>
                <Toolbar
                    drawerToggleClicked={this.sideDrawerToggleHandler} 
                    userLogged={this.state.userLogged}
                    action={this.UserLogged}
                />
                <main className={classes.Content}>
                    
                        {(this.state.token!=null)?(
                        <Switch>
                            <Route path="/ingresar" render={() => (
                            <Login action={this.UserLogged}/>)}/>
                            <Route path="/registrarse" component={FormularioUsuario}/>
                        <Route path="/buscar" component={Categoria}/>
                        <Route path="/categoria/:nombre" component={Categoria}/>
                        <Route path="/anuncio/:nombre" component={AnuncioDetalle}/>
                        <Route path="/formularioAnuncio" 
                                render={() => (<FormularioAnuncio data={this.data}/>)} />
                        <Route path="/formularioUsuario" component={FormularioUsuario}/>
                        <Route path="/formularioCategoria" component={FormularioCategoria}/>
                        <Route path="/formularioPlan" component={FormularioPlan}/>
                        <Route path="/formularioComentario" component={FormularioComentario}/>
                        <Route path="/nosotros" component={Portada}/>
                        <Route path="/info" component={Usuario}/>
                        <Route path="/" component={Portada}/>
                        </Switch>
                        ):(
                        <Switch>
                        <Route path="/ingresar" render={() => (
                            <Login action={this.UserLogged}/>)}/>
                            <Route path="/registrarse" component={FormularioUsuario}/>
                            <Route path="/" component={Portada}/>
                        </Switch>
                        )}
                                
                </main>
                <Footer />
            </Aux>
        )
    }
}

export default Layout;