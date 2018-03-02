import * as React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import { createGame } from '../../testHelper';
import BoxComponent from './Box';

const boxCss = require('../Box/Box.scss');

describe('<Box />', () => {
  it('adds a flag', () => {
    const game = createGame(['o']);
    const box = game.boxes[0];
    const wrapper = mount(
      <BoxComponent game={game} box={box} />
    );
    const button = wrapper.find('button');
    expect(button.hasClass(boxCss.flag)).to.eq(false, 'has flag class');
    button.simulate('contextmenu');
    expect(button.hasClass(boxCss.flag)).to.eq(true, 'has flag class');
    expect(box.isFlagged).to.eq(true, 'isFlagged');
  });
});
