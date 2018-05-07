import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout';

import Portada from './components/Portada/Portada';
import Login from './components/Login/Login';
import Categoria from './components/Categoria/Categoria';
import Perfil from './components/Perfil/Perfil';
import Registrar from './components/Registrar/Registrar';
import AnuncioPop from './components/AnuncioPop/AnuncioPop';
import Agregar from './components/Agregar/Agregar';

class App extends Component {
  render() {
    return (
      <Layout>
        {/*<Portada />*/}

        
        <AnuncioPop/>



      </Layout>
    );
  }
}

export default App;