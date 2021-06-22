import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';

import store, { history } from './reduxStore';
import AppRouter from './pages/AppRouter';

import './App.scss';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.scss';
import Feedback from './pages/feedback/Feedback';

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <AppRouter />
          <Feedback></Feedback>
        </ConnectedRouter>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
