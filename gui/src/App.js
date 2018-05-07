import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout';

import Portada from './components/Portada/Portada';
import Login from './components/Login/Login';
import Categoria from './components/Categoria/Categoria';
import Perfil from './components/Perfil/Perfil';

class App extends Component {
  render() {
    return (
      <Layout>
        {/*<Portada />*/}
        <Categoria />
      </Layout>
    );
  }
}

export default App;