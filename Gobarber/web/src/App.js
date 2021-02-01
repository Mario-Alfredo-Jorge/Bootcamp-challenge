import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { PersistGate } from 'redux-persist/integration/react';

import './config/reactotronConfig';
import GlobalStyles from './globalStyles';
import Routes from './routes';
import history from './services/history';

import { store, persistor} from './store';


function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <Router history={history}>
                    <Routes />
                    <GlobalStyles />
                    <ToastContainer autoClose={3000} />
                </Router>
            </PersistGate>  
        </Provider>
    );
}

export default App;
