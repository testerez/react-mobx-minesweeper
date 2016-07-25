import * as React from 'react';
import Data from '../../data';
import {observer} from 'mobx-react';
import Smiley from '../Smiley/Smiley';

const styles = require('./Menu.scss');

interface IProps{
  data: Data,
}

export default observer(function({data} : IProps) {
    return (
      <div className={styles.menu}>
        <Smiley game={data.game} onClick={data.newGame} />
      </div>
    );
});
