import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { render } from 'react-dom'
import { createStore } from 'redux'
import MainApp from './components/MainApp'
import reducer from './redux/reducers'

const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())




function App() {
  return (
    <Provider store={store}>
      <MainApp />
      {/* <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<PostsMainPage />}></Route>
          <Route path="/posts/:postId" element={<SinglePostPage />} />
          <Route path="/editPost/:postId" element={<EditPostForm />} />
        </Routes>
      </div>
    </Router> */}
    </Provider>
  );
}

export default App;
