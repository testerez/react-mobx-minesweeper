import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Hello from './Hello';

const mountNode = document.querySelector('#root');
ReactDOM.render(<Hello name="You" />, mountNode);
