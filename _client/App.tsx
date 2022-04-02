import {provider} from 'react-ioc';
import React from 'react';
import {observer} from "mobx-react-lite";

import Store from "@store";
import Routes from "@client/router";


const App = provider(
  Store
)(observer(() => (
    <div>
      <Routes/>
    </div>
)));

export default App;
