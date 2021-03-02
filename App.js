import React, {Component} from 'react';
import { AppRegistry, } from 'react-native';
import { Router, Scene } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducers from './src/components/reducers';

import Login from './src/components/login';
import Capa from './src/components/capa';
import OrdemServico from './src/components/ordem_serv';
import Cliente from './src/components/cliente';
import Main from './src/components/main';
import Computador from './src/components/computador';
import Rede from './src/components/rede';
import Impressora from './src/components/impressora';
import Especifico from './src/components/especifico';
import Novo_Servico from './src/components/novo_servico';


type Props = {};

export default class App extends Component<Props> {

  componentDidMount(){
    const firebase = require("firebase");
        var config = {
          apiKey: "AIzaSyD20KRx6xxrbE6Prf4zWoSn2FyEeZK3Jb0",
          authDomain: "mycompservices-5622f.firebaseapp.com",
          databaseURL: "https://mycompservices-5622f.firebaseio.com",
          projectId: "mycompservices-5622f",
          storageBucket: "mycompservices-5622f.appspot.com",
          messagingSenderId: "44795942132"
        };
        firebase.initializeApp(config);
  }

  render() {
    return (
      <Provider store={createStore(reducers)}>
        <Router>
        <Scene key='root'>
          <Scene key='login' component={Login} initil hideNavBar />
          <Scene key='capa' component={Capa} hideNavBar />
          <Scene key='ordem_serv' component={OrdemServico} hideNavBar />
          <Scene key='main' component={Main}  hideNavBar />
          <Scene key='cliente' component={Cliente}  hideNavBar />
          <Scene key='computador' component={Computador} hideNavBar />
          <Scene key='rede' component={Rede} hideNavBar />
          <Scene key='impressora' component={Impressora} hideNavBar />
          <Scene key='especifico' component={Especifico} hideNavBar />
          <Scene key='novo_servico' component={Novo_Servico} hideNavBar />
        </Scene>
        </Router>
      </Provider>
    );
  }
}