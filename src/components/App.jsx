import React, { Component } from 'react';
import { Header } from './blocks/Header';
import { Sidebar } from './sidebar/Sidebar';
import { ContentContainer } from './content/ContentContainer';
import { Footer } from './blocks/Footer';
import { Popup } from './blocks/Popup';
import { api } from '../api.js';
import { getActiveFilter } from '../utils.js';

class App extends Component {
  constructor() {
    super();

    this.state = {
      books: [],
      history: [],
      filters: [],
      categories: [],
      activeCategory: null,
      search: '',
      popup: false,
    }
  }

  updateBook = (id, data) => {
    const params = {
      id,
      search: this.state.search || null,
      activeCategory: this.state.activeCategory,
      filters: getActiveFilter(this.state), ...data
    };
    api.updateBook(params, ({ history, books }) => this.setState({ history, books }));
  }

  search = (search) => {
    const params = {
      search,
      filters: getActiveFilter(this.state),
      activeCategory: this.state.activeCategory,
    };
    api.search(params, ({ books }) => this.setState({ search, books }));
  }

  setFilter = (id) => {
    const newFilters = {
      filters: this.state.filters.map(filter => ({
        ...filter,
        active: filter.id === id,
      }))
    };
    const params = {
      search: this.state.search || null,
      filters: getActiveFilter(newFilters),
      activeCategory: this.state.activeCategory,
    };
    api.setFilter(params, ({ books }) => this.setState({ filters: newFilters, books }));
  }

  setCategory = (id) => {
    const params = {
      search: this.state.search || null,
      filters: getActiveFilter(this.state),
      activeCategory: id,
    };
    api.setCategory(params, ({ books }) => this.setState({ activeCategory: id, books }));
  }

  addBook(data) {
    const params = {
      search: this.state.search || null,
      filters: getActiveFilter(this.state),
      activeCategory: this.state.activeCategory,
      ...data,
    };
    api.addBook(params, ({ history, books }) => this.setState({ history, books }));
  }

  componentDidMount() {
    api.getInitData(this.state.search, ({ filters, books }) => this.setState({ filters, books }));
    api.getHistoryData(history => this.setState({ history }));
    api.getCategoriesData(categories => this.setState({ categories }));
  }

  closePopup = (type, book, id) => {
    if (type === 'add') {
      this.addBook(book);
    } else if (type === 'edit') {
      this.updateBook(id, book);
    }
    this.setState({ popup: null });
  }

  render() {
    return (
      <div>
        <Header />
        <Sidebar
          history={this.state.history}
          setCategory={this.setCategory}
          categories={this.state.categories}
          openPopup={() => this.setState({ popup: { type: 'add' } })}
        />
        <ContentContainer
          books={this.state.books}
          filters={this.state.filters}
          setFilter={this.setFilter}
          searchMethod={this.search}
          searchText={this.state.search}
          updateBook={this.updateBook}
          editBook={(data) => this.setState({ popup: { type: 'edit', data } })}
        />
        <Footer />
        {this.state.popup ? <Popup {...this.state.popup} closePopup={this.closePopup} /> : null}
      </div>);
  }
}

export default App;
