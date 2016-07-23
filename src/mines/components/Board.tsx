import * as React from 'react';
import Game from '../data/Game';
import {observer} from 'mobx-react';
import Box from './Box';

interface IProps{
  game: Game;
}

export default observer<IProps>(function({game}: IProps) {
  return (
    <div>{
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
