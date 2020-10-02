import React from 'react';
import NumberFormat, { NumberFormatProps } from 'react-number-format';

interface Price extends NumberFormatProps {
  prefix?: string
}

export default ({value, prefix='¥', ...props}: Price) => {
  
  return (
    <NumberFormat value={value} displayType={'text'} thousandSeparator fixedDecimalScale decimalScale={2} prefix={prefix} {...props}/>
  );
}