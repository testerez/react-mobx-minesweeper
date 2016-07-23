import * as React from 'react';
import Menu from './components/Menu';
import Grid from './components/Grid';
import Data from './data';
import {observer} from 'mobx-react';

@observer
export default class extends React.Component<{}, {}> {
  data = new Data();

  render() {
    const data = this.data;
    return (
      <div>
        <Menu
          config={data.config}
          onNewGame={data.newGame.bind(data)}
        />
        <Grid
          game={data.game}
        />
      </div>
    );
  }
}
