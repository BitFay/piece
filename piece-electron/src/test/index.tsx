import React from 'react';
import Core from './Core';
import BrowserWindow from './BrowserWindow';
import Device from './Device';
import Scard from './Scard';
import User from './User';

export default () => {
  return (
    <div>
      <Core/>
      <BrowserWindow/>
      <Device/>
      <Scard/>
      <User/>
    </div>
  )
}