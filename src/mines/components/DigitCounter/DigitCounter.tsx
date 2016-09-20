import * as React from 'react';
import {observer} from 'mobx-react';

const styles = require('./DigitCounter.scss');

interface IProps {
  value: number;
  digits: number;
  className?: string;
}

function lpad(s: string|number, length: number, c = ' '){
  s = (s || '') + '';
  return s.length >= length
    ? s
    : c.repeat(length - s.length) + s;
}

const Menu = observer<IProps>(({value, digits, className} : IProps) => {
    const negative = value < 0;
    if(negative){
        value *= -1;
        digits -= 1;
    }
    value = Math.min(value, Math.pow(10, digits) - 1);
    return (
      <div className={[styles.counter, className].join(' ')}>
        {negative && '-'}
        {lpad(value, digits, '0')}
        <div className={styles.ghost}>
            {'8'.repeat(digits + (negative ? 1 : 0))}
        </div>
      </div>
    );
});

export default Menu;
