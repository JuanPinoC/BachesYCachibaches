import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';

import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import Footer from '../../components/Footer/Footer';

import Categoria from '../../components/Categoria/Categoria';

import Registrar from '../../components/Registrar/Registrar';
import Login from '../../components/Login/login';
import Perfil from '../../components/Perfil/Perfil';
import MisAnuncios from '../../components/AnunciosUsuario/AnunciosUsuario';

import Portada from '../../components/Portada/portada';
import Usuario from '../../components/Perfil/Usuario/Usuario';
import Informacion from '../../components/Informacion/informacion';
import AnuncioDetalle from '../../components/AnuncioDetalle/AnuncioDetalle';

import FormularioAnuncio from '../../components/Formularios/FormularioAnuncio';
import DestacarAnuncio from '../../components/Planes/Planes';

import FormularioUsuario from '../../components/Formularios/FormularioUsuario';

import FormularioCategoria from '../../components/Formularios/FormularioCategoria';
import FormularioPlan from '../../components/Formularios/FormularioPlan';
import FormularioComentario from '../../components/Formularios/FormularioComentario';

class Layout extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            token: sessionStorage.getItem('jwtToken')
        }
        this.UserLogged = this.UserLogged.bind(this);
    }

    componentWillMount(){
        if(sessionStorage.getItem('jwtToken')==null || sessionStorage.getItem('jwtToken')==''){
            sessionStorage.setItem('jwtToken','null');
        }
        this.setState({
            token: sessionStorage.getItem('jwtToken')
        });
    }

    UserLogged = () => {
        this.setState({
            token: sessionStorage.getItem('jwtToken')
        });

    }

    render () {
        return (
            <Aux>
                <Toolbar
                    drawerToggleClicked={this.sideDrawerToggleHandler}
                    action={this.UserLogged}
                />
                <main className={classes.Content}>
                    {(this.state.token != "null")?(
                        <Switch>
                            <Route path="/perfil" component={Perfil}/>
                            <Route path="/misAnuncios" component={MisAnuncios}/>
                            <Route path="/cuenta" component={FormularioUsuario}/>
                            <Route path="/buscar" component={Categoria}/>
                            <Route path="/categoria/:nombre" component={Categoria}/>
                            <Route path="/anuncio/:id" component={AnuncioDetalle}/>
                            <Route path="/formularioAnuncio" component={FormularioAnuncio} />
                            <Route path="/EditarAnuncio/:id" component={FormularioAnuncio} />
                            <Route path="/destacarAnuncio/:id" component={DestacarAnuncio} />
                            <Route path="/EditarUsuario" 
                                    render={() => (<FormularioUsuario tipo="Editar"/>)} />
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
                            <Route path="/info" component={Informacion}/>
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