import * as React from 'react';
import Game from '../../data/Game';
import { observer } from 'mobx-react';

const styles = require('./Smiley.scss');

const smileys = {
  won: require('./sunglasses.svg'),
  lost: require('./dead.svg'),
  // TODO: Show this for one second after revealing a box
  ouf: require('./embarrassed.svg'),
  normal: require('./happiness-1.svg'),
};

interface IProps {
  game: Game;
  onClick: Function;
}

interface IState {

}

function getImageUrl(game: Game) {
  if (game.isLost) {
    return smileys.lost;
  }
  if (game.isWon) {
    return smileys.won;
  }
  return smileys.normal;
}

@observer
export default class extends React.Component<IProps, IState> {
  render() {
    const {game, onClick} = this.props;
    return (
      <button
        className={styles.smiley}
        onClick={onClick}
        >
        <img src={getImageUrl(game)} role="presentation" />
      </button>
    );
  }
}


