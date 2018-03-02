import * as React from 'react';
import { observer } from 'mobx-react';
import Box from '../Box/Box';
import Game from '../../data/Game';
const styles = require('./Board.scss');


interface Props {
  game: Game;
}

const Board = ({game}: Props) => (
  <div className={styles.board}>{
    game.getLines().map((l, i) => (
      <div key={i}>
        {l.map(box => (
          <Box {...{ box, game }} key={box.position} />
        ))}
      </div>
    ))
  }</div>
);

export default observer(Board);
