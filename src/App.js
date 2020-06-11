import React from 'react';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import 'typeface-roboto';
import './configs/reactotronConfig';
import Routes from './routes';
import history from './services/history';
import GlobalStyle from './styles/global';
import { store, persistor } from '~/store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Routes />
          <GlobalStyle />
          <ToastContainer autoClose={2500} />
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
