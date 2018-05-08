import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout';

import Categoria from './components/Categoria/Categoria';
import Validado from './components/Validado/Validado';
import Perfil from './components/Perfil/Perfil';
import Agregar from './components/Agregar/Agregar';
import Login from './components/Login/login';
import Portada from './components/Portada/portada';

class App extends Component {
  render() {
    return (
    <Layout>	
        <Portada/>
      </Layout>
    );
  }
}

export default App;