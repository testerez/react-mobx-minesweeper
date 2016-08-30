import * as React from 'react';
import Menu from '../Menu/Menu';
import Board from '../Board/Board';
import {observer} from 'mobx-react';
import Data from "../../data/Data";
const styles = require('./game.scss');

interface IProps {
  data: Data;
}

const Game = observer<IProps>(({data}: IProps) => (
  <div className={styles.game}>
    <Menu data={data}/>
    <Board game={data.game} />
  </div>
));
export default Game;
