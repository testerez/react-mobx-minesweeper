import * as React from 'react';
import * as ReactDOM from 'react-dom';
import MinesGame from './mines';

const mountNode = document.querySelector('#root');
ReactDOM.render(<MinesGame />, mountNode);
