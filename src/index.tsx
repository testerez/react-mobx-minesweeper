import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MinesGame from './mines';
import DevTools from 'mobx-react-devtools';

const mountNode = document.querySelector('#root');


ReactDOM.render((
  <div>
    <MinesGame />
    <DevTools />
  </div>
), mountNode);
