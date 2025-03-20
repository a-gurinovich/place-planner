import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux'
import MainApp from './components/MainApp'
import reducer from './redux/reducers'

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())



function App() {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
}

export default App;
