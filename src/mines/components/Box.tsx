import * as React from 'react';
import Game from '../data/Game';
import Box from '../data/Box';
import {observer} from 'mobx-react';

interface IProps{
  game: Game,
  box: Box,
}

function getLetter({position, hasMine, isRevealed, isFlagged}: Box, game: Game){
  if(isRevealed){
    return hasMine ? 'X' : game.getAreaMinesCount(position);
  }
  return isFlagged ? 'F' : ' ';
}

export default observer<IProps>(function({game, box}: IProps){
  const props: React.HTMLProps<HTMLButtonElement> = {
    onClick: () => game.reveal(box.position),
    onContextMenu: e => {
      console.log('right click');
      box.isFlagged = !box.isFlagged;
      e.preventDefault();
    },
    style: {
      width:'30px',
      height:'30px',
      verticalAlign:'bottom',
    },
  };
  return(
    <button {...props}>
      {getLetter(box, game)}
    </button>
  );
})
