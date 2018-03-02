import * as React from 'react';
import { mount } from 'enzyme';
import { createGame } from '../../testHelper';
import BoxComponent from './Box';

const boxCss = require('../Box/Box.scss');

describe('<Box />', () => {
  it('adds a flag', () => {
    const game = createGame(['o']);
    const box = game.boxes[0];
    const wrapper = mount(
      <BoxComponent game={game} box={box} />,
    );
    const button = wrapper.find('button');
    expect(button.hasClass(boxCss.flag)).toEqual(false);
    button.simulate('contextmenu');
    wrapper.update();
    expect(button.render().hasClass(boxCss.flag)).toEqual(true);
    expect(box.isFlagged).toEqual(true);
  });
});
