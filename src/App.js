import React,{Component} from 'react';
import './App.css';
import WxRouter from './router/index'
import 'antd-mobile/dist/antd-mobile.css';
import {Provider} from 'react-redux'
import {store,persistor} from './store/store'
import { PersistGate } from 'redux-persist/integration/react'

class App extends Component{
 
  
 render(){
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
       <WxRouter></WxRouter>
     </PersistGate>
    </Provider>
  );
 }
}

export default App;
