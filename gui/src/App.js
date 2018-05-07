import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout';

import Portada from './components/Portada/Portada';
import Login from './components/Login/Login';
import Categoria from './components/Categoria/Categoria';
import Perfil from './components/Perfil/Perfil';
<<<<<<< HEAD
import Registrar from './components/Registrar/Registrar';
import AnuncioPop from './components/AnuncioPop/AnuncioPop';


=======
import Agregar from './components/Agregar/Agregar';
>>>>>>> e9f0cdd2383cd5cf59374217b9787068b33ae5dc

class App extends Component {
  render() {
    return (
      <Layout>
        {/*<Portada />*/}
<<<<<<< HEAD
        
        <AnuncioPop/>
=======

>>>>>>> e9f0cdd2383cd5cf59374217b9787068b33ae5dc
      </Layout>
    );
  }
}

export default App;