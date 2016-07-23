import * as React from 'react';
import Game from '../data/Game';
import Square from '../data/Square';
import {observer} from 'mobx-react';

interface IProps{
  game: Game,
  square: Square,
}

function getLetter({position, hasMine, isRevealed, isFlagged}: Square, game: Game){
  if(isRevealed){
    return hasMine ? 'X' : game.getAreaMinesCount(position);
  }
  return isFlagged ? 'F' : ' ';
}

export default observer<IProps>(function({game, square}: IProps){
  const props: React.HTMLProps<HTMLButtonElement> = {
    onClick: () => game.reveal(square.position),
    onContextMenu: e => {
      console.log('right click');
      square.isFlagged = !square.isFlagged;
      e.preventDefault();
    },
    style: {
      width:'30px',
      height:'30px',
      verticalAlign:'bottom',
    },
  }
  return(
    <button {...props}>
      {getLetter(square, game)}
    </button>
  );
})
