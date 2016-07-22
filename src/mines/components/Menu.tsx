import * as React from 'react';
import {IGameConfig} from '../data/Config';

interface IProps{
  config: IGameConfig,
  onNewGame: Function,
}

export default function({config, onNewGame} : IProps) {
    return (
      <div>
        <button onClick={onNewGame}>
          New game
        </button>
      </div>
    );
}
