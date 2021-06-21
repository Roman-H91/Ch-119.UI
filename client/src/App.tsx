import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import store, { history } from './reduxStore';
import AppRouter from './pages/AppRouter';
import AlertContainer from './components/Alert/AlertContainer';

import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ConnectedRouter history={history}>
        <AlertContainer />
          <AppRouter />
        </ConnectedRouter>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
