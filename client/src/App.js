import React from "react";
import Routes from './Routes';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import logger from  'redux-logger';
import {createStore,applyMiddleware} from 'redux';
import rootReducer from '../src/redux/rootreducer';
import FooterComponent from './core/FooterComponent/FooterComponent';
import HeaderComponent from './core/HeaderComponent/HeaderComponent';


let middleware =[];
if(process.env.NODE_ENV === 'development'){
  middleware=[ReduxThunk,logger];
}
  else{
    middleware=[ReduxThunk]
  }

const store=createStore(rootReducer,applyMiddleware(...middleware))

const App = () => {
    return (
        <>
        <Provider store={store}>
            <HeaderComponent/>
            <Routes/>
            <FooterComponent/>
          </Provider>
        </>
    )
};

export default App;
