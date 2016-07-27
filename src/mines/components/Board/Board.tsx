import * as React from 'react';
import {observer} from 'mobx-react';
import {Game} from '../../data';
import Box from '../Box/Box';
const styles = require('./Board.scss');


interface IProps {
  game: Game;
}

export default observer<IProps>(({game}: IProps) => {
  return (
    <div className={styles.board}>{
      game.getLines().map((l, i) => (
          <div key={i}>
            {l.map(box => (
              <Box {...{box, game}} key={box.position}/>
            ))}
          </div>
      ))
    }</div>
  );
});
