import * as React from 'react';
import {Game, Box} from '../../data';
import {observer} from 'mobx-react';
import * as classnames from 'classnames';
const styles = require('./Box.scss');

const colors: {[id: number]: string} = {
  1: '#0b24fa',
  2: '#338938',
  3: '#f21923',
  4: '#090982',
  5: '#840207',
  6: '#090982',
  7: '#000000',
  8: '#c0c',
};

interface IProps {
  game: Game;
  box: Box;
}

const MinesCount = ({count}: {count: number}) => {
  if (!count) {
    return <noscript/>;
  }
  return (
    <span
      style={{color:colors[count]}}
    >{count}</span>
  );
};

export default observer<IProps>(({game, box}: IProps) => {
  const {
    position,
    hasMine,
    isRevealed,
    isFlagged,
  } = box;
  const showRevealed = isRevealed || game.isLost;

  const props: React.HTMLProps<HTMLButtonElement> = {
    onClick: () => game.reveal(position),
    onContextMenu: e => {
      box.isFlagged = !isFlagged;
      e.preventDefault();
    },
    className: classnames({
      [styles.box]: true,
      [styles.flag]: isFlagged && !showRevealed,
      [styles.revealed]: showRevealed,
      [styles.mine]: hasMine && showRevealed,
      [styles.fail]: hasMine && isRevealed,
    }),
  };
  return(
    <button {...props}>
      {showRevealed && !hasMine && (
        <MinesCount count={game.getAreaMinesCount(position)}/>
      )}
    </button>
  );
});
