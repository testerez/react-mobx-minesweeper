import * as React from 'react';
import { mount } from 'enzyme';
import {expect} from 'chai';
import {createGame} from '../../Common/testHelper';
import {Data} from '../../data';
import Game from './Game';
import Box from '../Box/Box';

const boxCss = require('../Box/Box.scss');

function createAndMountGame(layout: string[]) {
    const game = createGame(layout);
    const data = new Data();
    data.game = game;
    return {
      wrapper: mount(<Game data={data} />),
      game,
    };
}

describe('<Game />', () => {
  it('wins', () => {
    const {wrapper, game} = createAndMountGame([
      'x o',
      'o x',
    ]);
    const boxes = wrapper.find(Box);

    expect(boxes).to.have.length(4);
    expect(wrapper.find(`.${boxCss.revealed}`)).to.have.length(0);

    boxes.at(1).simulate('click');
    boxes.at(2).simulate('click');
    // Once game is won, click on mine as no effect
    boxes.at(3).simulate('click');

    expect(wrapper.find(`.${boxCss.revealed}`)).to.have.length(2);
    expect(game.isWon).to.eq(true, 'isWon');
    expect(game.isLost).to.eq(false, 'isLost');
  });

  it('looses', () => {
    const {wrapper, game} = createAndMountGame([
      'x o',
      'o x',
    ]);
    const boxes = wrapper.find(Box);

    expect(boxes).to.have.length(4);
    expect(wrapper.find(`.${boxCss.revealed}`)).to.have.length(0);

    boxes.at(0).simulate('click');

    expect(wrapper.find(`.${boxCss.revealed}`)).to.have.length(4);
    expect(game.isWon).to.eq(false, 'isWon');
    expect(game.isLost).to.eq(true, 'isLost');
  });
});
