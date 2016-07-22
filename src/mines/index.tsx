import * as React from 'react';
import Menu from './components/Menu';
import Grid from './components/Grid';
import Data from './data';

const data = new Data();

export default class extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        <Menu
          config={data.config}
          onNewGame={data.newGame.bind(data)}
        />
        <Grid
          data={data}
        />
      </div>
    );
  }
}
