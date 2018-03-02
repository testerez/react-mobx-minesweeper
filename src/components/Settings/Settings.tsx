import * as React from 'react';
import Data from '../../data/Data';
import { observer } from 'mobx-react';
import { presets, IGameConfig } from '../../data/Config';

const styles = require('./Settings.scss');

interface Props {
  data: Data;
}

@observer
export default class Settings extends React.Component<Props, any> {
  setConfig(config: IGameConfig) {
    const {data} = this.props;
    if (data.game.isRunning && !confirm('Quit current game?')) {
      return;
    }
    data.setConfig(config);
    data.ui.toggleShowSettings(false);
  }

  render() {
    return (
      <div className={styles.settings}>
        <div className={styles.content}>
          <div className={styles.presets}>
            {presets.map(p => (
              <a onClick={() => this.setConfig(p)} key={p.name}>
                <b>{p.name}</b>
                {` - ${p.width}x${p.height}, ${p.mines} mines`}
              </a>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
