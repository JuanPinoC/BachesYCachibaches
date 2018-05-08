import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout';

import Portada from './components/Portada/portada';
import Login from './components/Login/login';
import Categoria from './components/Categoria/Categoria';
import Perfil from './components/Perfil/Perfil';
import Registrar from './components/Registrar/Registrar';
import AnuncioPop from './components/AnuncioPop/AnuncioPop';
import Agregar from './components/Agregar/Agregar';

class App extends Component {
  render() {
    return (
      <Layout>
        <Login />

        
        <AnuncioPop/>



      </Layout>
    );
  }
}

export default App;