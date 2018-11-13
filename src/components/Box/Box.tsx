import * as React from 'react';
import { Game, Box as BoxData } from '../../data/index';
import { observer } from 'mobx-react';
import { classnames } from '../../classnames';
const styles = require('./Box.scss');

// Colors for surrounding mines count text
const colors: { [id: number]: string } = {
  1: '#0b24fa',
  2: '#338938',
  3: '#f21923',
  4: '#090982',
  5: '#840207',
  6: '#090982',
  7: '#000000',
  8: '#c0c',
};

interface Props {
  game: Game;
  box: BoxData;
}

@observer
export default class Box extends React.Component<Props, any> {
  onClick = () => {
    const {game, box} = this.props;
    game.reveal(box.position);
  }

  onContextMenu = (e: any) => {
    this.props.box.toggleFlag();
    e.preventDefault();
  }

  render() {
    const {game, box} = this.props;
    const {
      position,
      hasMine,
      isRevealed,
      isFlagged,
    } = box;
    const showRevealed = isRevealed || game.isLost;

    const displayedNumber = showRevealed && !hasMine
      ? game.getAreaMinesCount(position) || null
      : null;
    const style = displayedNumber
      ? { color: colors[displayedNumber] }
      : undefined;

    const props: React.HTMLProps<HTMLButtonElement> = {
      onClick: this.onClick,
      onContextMenu: this.onContextMenu,
      className: classnames(
        styles.box,
        isFlagged && !showRevealed && styles.flag,
        showRevealed && styles.revealed,
        hasMine && showRevealed && styles.mine,
        hasMine && isRevealed && styles.fail,
      ),
      style,
    };
    return <button {...props}>{displayedNumber}</button>;
  }
}
