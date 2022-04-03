import React, {memo} from 'react';
import {useLocation, useParams,} from "react-router-dom";

import '../styles/App.scss';


const ViewImage = () => {
  const location = useLocation();
  const { id } = useParams()

  console.log(id)

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
        </a>
        <div>
        </div>
      </header>
    </div>
  );
}

export default memo(ViewImage);
