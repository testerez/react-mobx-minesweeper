import * as React from 'react';
import { shallow } from 'enzyme';
import {expect} from 'chai';

import Hello from './Hello';

describe('<Hello />', () => {
  it('says hello you!', () => {
    const hello = shallow(<Hello name="you" />);
    expect(hello.text()).to.equal('Hello you!');
  });
});
