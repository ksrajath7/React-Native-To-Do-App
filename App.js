import React, { useState } from 'react';
import {Provider } from 'react-redux';
import Home from './screens/Home';
import { createStore } from "redux";
import reducer from "./reducers/index";

const store = createStore(reducer);

export default function App() {

  return(
    <Provider store={store}>
      <Home></Home>
    </Provider>
  )
}
