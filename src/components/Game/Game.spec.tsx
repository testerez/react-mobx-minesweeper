import * as React from 'react';
import { mount } from 'enzyme';
import { createGame } from '../../testHelper';
import { Data } from '../../data/index';
import Game from './Game';
import Box from '../Box/Box';
import { runInAction } from 'mobx';

const boxCss = require('../Box/Box.scss');

function createAndMountGame(layout: string[]) {
  const data = new Data();
  runInAction(() => {
    data.game = createGame(layout);
  });

  return {
    wrapper: mount(<Game data={data} />),
    game: data.game,
  };
}

describe('<Game />', () => {
  it('wins', () => {
    const {wrapper, game} = createAndMountGame([
      'x o',
      'o x',
    ]);
    const boxes = wrapper.find(Box);

    expect(boxes).toHaveLength(4);
    expect(wrapper.find(`.${boxCss.revealed}`)).toHaveLength(0);

    boxes.at(1).simulate('click');
    boxes.at(2).simulate('click');
    // Once game is won, click on mine as no effect
    boxes.at(3).simulate('click');

    expect(wrapper.find(`.${boxCss.revealed}`)).toHaveLength(2);
    expect(game.isWon).toEqual(true);
    expect(game.isLost).toEqual(false);
  });

  it('looses', () => {
    const {wrapper, game} = createAndMountGame([
      'x o',
      'o x',
    ]);
    const boxes = wrapper.find(Box);

    expect(boxes).toHaveLength(4);
    expect(wrapper.find(`.${boxCss.revealed}`)).toHaveLength(0);

    boxes.at(0).simulate('click');

    expect(wrapper.find(`.${boxCss.revealed}`).length).toEqual(4);
    expect(game.isWon).toEqual(false);
    expect(game.isLost).toEqual(true);
  });
});
