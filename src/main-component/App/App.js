import React from 'react';
import AllRoute from '../router'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FancyCursor from '../FancyCursor';


const App = () => {
  return (
    <div className="App" id='scrool'>
      <FancyCursor />
      <AllRoute />
      <ToastContainer />
    </div>
  );
}

export default App;