import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MinesGame from './MinesGame';
import DevTools from 'mobx-react-devtools';
import 'core-js';

require('./css/global.scss');

ReactDOM.render((
  <>
    <MinesGame />
    <DevTools />
  </>
), document.querySelector('#root'));
