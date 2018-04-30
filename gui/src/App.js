import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout';

import Portada from './components/Portada/Portada';
import Login from './components/Login/Login';

class App extends Component {
  render() {
    return (
      <Layout>
        {/*<Portada />*/}
        <Login />
      </Layout>
    );
  }
}

export default App;
