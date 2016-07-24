import * as React from 'react';
import Menu from './components/Menu';
import Board from './components/Board';
import Data from './data';
import {observer} from 'mobx-react';
const styles = require('./game.scss');

@observer
export default class extends React.Component<{}, {}> {
  data = new Data();

  render() {
    const data = this.data;
    return (
      <div className={styles.game}>
        <Menu data={data}/>
        <Board game={data.game} />
      </div>
    );
  }
}
