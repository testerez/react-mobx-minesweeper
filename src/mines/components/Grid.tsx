import * as React from 'react';
import Game from '../data/Game';
import {IGameConfig} from '../data/Config';

interface IProps{
  game: Game | null;
  config: IGameConfig;
}

export default function({game, config}: IProps) {
  config.height = 0;
  return <noscript/>;
}
