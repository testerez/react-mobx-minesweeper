import * as React from 'react';
import Game from '../data/Game';
import Data from '../data';
import {observer} from 'mobx-react';

interface IProps{
  data: Data;
}

export default observer(function({data}: IProps) {
  return <pre>{JSON.stringify(data.game, null, 2)}</pre>;
})
