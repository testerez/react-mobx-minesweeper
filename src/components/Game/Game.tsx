import * as React from 'react';
import Menu from '../Menu/Menu';
import Board from '../Board/Board';
import { observer } from 'mobx-react';
import Data from '../../data/Data';
import Settings from '../Settings/Settings';
const styles = require('./game.scss');

interface Props {
  data: Data;
}

const Game = ({data}: Props) => (
  <div className={styles.game}>
    <Menu data={data} />
    {data.ui.showSettings && <Settings data={data} />}
    <Board game={data.game} />
  </div>
);
export default observer(Game);
