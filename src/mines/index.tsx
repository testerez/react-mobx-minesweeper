import * as React from 'react';
import Menu from './components/Menu';
import Board from './components/Board';
import Data from './data';
import {observer} from 'mobx-react';

@observer
export default class extends React.Component<{}, {}> {
  data = new Data();

  render() {
    const data = this.data;
    return (
      <div>
        <Menu
          config={data.config}
          onNewGame={data.newGame.bind(data)}
        />
        <Board
          game={data.game}
        />
      </div>
    );
  }
}
