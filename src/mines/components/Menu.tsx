import * as React from 'react';
import Data from '../data';
import {observer} from 'mobx-react';

interface IProps{
  data: Data,
}

export default observer(function({data} : IProps) {
    return (
      <div>
        <button onClick={data.newGame}>
          New game...
        </button>
        {data.game.isWon && (
          'You win!!!'
        )}
        {data.game.isLost && (
          'You loose :('
        )}
      </div>
    );
});
