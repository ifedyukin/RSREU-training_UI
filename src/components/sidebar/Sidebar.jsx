import React from 'react';
import { History } from './History';
import { AddBook } from './AddBook';
import { NavMenu } from './NavMenu';
import { Categories } from './Categories';

export const Sidebar = ({ history, openPopup, categories, setCategory }) => (
  <sidebar>
    <AddBook onClick={openPopup} />
    <NavMenu />
    <Categories setCategory={setCategory} categories={categories} />
    <History messages={history} />
  </sidebar>
);
