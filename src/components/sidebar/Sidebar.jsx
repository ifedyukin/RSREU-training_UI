import React from 'react';
import { History } from './History';
import { AddBook } from './AddBook';
import { NavMenu } from './NavMenu';
import { Categories } from './Categories';

export const Sidebar = ({ history, openPopup }) => (
  <sidebar>
    <AddBook onClick={openPopup} />
    <NavMenu />
    <Categories />
    <History messages={history} />
  </sidebar>
);
