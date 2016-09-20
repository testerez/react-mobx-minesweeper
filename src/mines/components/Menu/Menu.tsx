import * as React from 'react';
import Data from '../../data/Data';
import {observer} from 'mobx-react';
import Smiley from '../Smiley/Smiley';
import DigitCounter from '../DigitCounter/DigitCounter';

const styles = require('./Menu.scss');

interface IProps {
  data: Data;
}

const Menu = observer<IProps>(({data} : IProps) => {
    return (
      <div className={styles.menu}>
        <DigitCounter value={data.game.minesLeft} digits={3}/>
        <Smiley game={data.game} onClick={data.newGame} />
        <DigitCounter value={data.game.timeElapsed} digits={3}/>
      </div>
    );
});

export default Menu;
