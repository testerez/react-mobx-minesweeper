import * as React from 'react';
import Data from '../../data/Data';
import {observer} from 'mobx-react';
import Smiley from '../Smiley/Smiley';

const styles = require('./Menu.scss');

interface IProps {
  data: Data;
}

const Menu = observer<IProps>(({data} : IProps) => {
    return (
      <div className={styles.menu}>
        <Smiley game={data.game} onClick={data.newGame} />
      </div>
    );
});

export default Menu;
