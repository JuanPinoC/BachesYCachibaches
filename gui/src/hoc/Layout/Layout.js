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

class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState( { showSideDrawer: false } );
    }

    sideDrawerToggleHandler = () => {
        this.setState( ( prevState ) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        } );
    }

    render () {
        return (
            <Aux>
                <Toolbar
                drawerToggleClicked={this.sideDrawerToggleHandler} />
                <SideDrawer
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler} />
                <main className={classes.Content}>
                    <Switch>
                        <Route path="/buscar" component={Categoria}/>
                        <Route path="/categoria/:nombre" component={Categoria}/>
                        <Route path="/ingresar" component={Login}/>
                        <Route path="/registrarse" component={Registrar}/>
                        <Route path="/nosotros" component={Portada}/>
                        <Route path="/info" component={Usuario}/>
                        <Route path="/" component={Portada}/>
                    </Switch>
                </main>
                <Footer />
            </Aux>
        )
    }
}

export default Layout;