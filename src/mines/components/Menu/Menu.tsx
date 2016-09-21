import * as React from 'react';
import Data from '../../data/Data';
import {observer} from 'mobx-react';
import Smiley from '../Smiley/Smiley';
import DigitCounter from '../DigitCounter/DigitCounter';

const styles = require('./Menu.scss');
const rankingIcon = require('./list-ordered.svg');
const settingsIcon = require('./settings.svg');

interface IProps {
  data: Data;
}

const Menu = observer<IProps>(({data} : IProps) => {
    return (
      <div className={styles.menu}>
        <DigitCounter value={data.game.minesLeft} digits={3}/>
        <a className={styles.iconLing}>
          <img src={rankingIcon} />
        </a>
        <Smiley game={data.game} onClick={data.newGame} />
        <a
          className={styles.iconLing}
          onClick={() => data.ui.toggleShowSettings()}>
          <img src={settingsIcon} />
        </a>
        <DigitCounter value={data.game.timeElapsed} digits={3}/>
      </div>
    );
});

export default Menu;
