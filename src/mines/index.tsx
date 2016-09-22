import * as React from 'react';
import Game from './components/Game/Game';
import Data from './data/Data';
import { observer } from 'mobx-react';

@observer
export default class extends React.Component<{}, {}> {
  data = new Data();

  render() {
    return <Game data={this.data} />;
  }
}
