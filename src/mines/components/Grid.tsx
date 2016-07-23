import * as React from 'react';
import Game from '../data/Game';
import {observer} from 'mobx-react';
import Square from '../data/Square'
import SquareComponent from './Square';

interface IProps{
  game: Game;
}

export default observer<IProps>(function({game}: IProps) {
  return (
    <div>{
      game.getLines().map((l, i) => (
          <div key={i}>
            {l.map(square => (
              <SquareComponent {...{square, game}} key={square.position}/>
            ))}
          </div>
      ))
    }</div>
  );
});
