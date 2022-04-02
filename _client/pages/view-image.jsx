import React, {memo} from 'react';
import {useInstance} from 'react-ioc';
import {useLocation} from "react-router-dom";

import Store from "@store";

import '../styles/App.scss';


const ViewImage = () => {
  const { app } = useInstance(Store);
  const location = useLocation();

  return (
    <div className="App">
      <header className="App-header">
        <img src="/assets/images/logo192.png" className="App-logo" alt="logo" />
        <h1>Its OTHER PAGE asdsd ({location.pathname})</h1>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React + {app.counter} + {app.counterV2}
        </a>
        <div>
          <button onClick={app.inc}>+1</button>
        </div>
      </header>
    </div>
  );
}

export default memo(ViewImage);
