import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './components/App';
import './styles.css';

ReactDOM.render(
  // 通过 provider 组件，将store 放在了全局的组件可以够得着的地方
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

