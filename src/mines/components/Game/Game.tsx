import * as React from 'react';
import Menu from '../Menu/Menu';
import Board from '../Board/Board';
import {Data} from '../../data';
import {observer} from 'mobx-react';
const styles = require('./game.scss');

interface IProps {
  data: Data;
}

export default observer<IProps>(({data}: IProps) => (
  <div className={styles.game}>
    <Menu data={data}/>
    <Board game={data.game} />
  </div>
));
