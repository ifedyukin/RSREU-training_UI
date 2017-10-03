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

  updateBook = (_id, data) => {
    const params = {
      _id,
      search: this.state.search || null,
      activeCategory: this.state.activeCategory,
      activeFilter: getActiveFilter(this.state), ...data
    };
    api.updateBook(params, ({ books }) => this.setState({ books }));
  }

  search = (search) => {
    const params = {
      search,
      activeFilter: getActiveFilter(this.state),
      activeCategory: this.state.activeCategory,
    };
    api.getBooks(params, ({ books }) => this.setState({ search, books }));
  }

  setFilter = (type) => {
    const newFilters = this.state.filters.map(filter => ({
      ...filter,
      active: filter.type === type,
    }));
    const params = {
      search: this.state.search || null,
      activeFilter: getActiveFilter({ filters: newFilters }),
      activeCategory: this.state.activeCategory,
    };
    api.getBooks(params, ({ books }) => this.setState({ filters: newFilters, books }));
  }

  setCategory = (type) => {
    const params = {
      search: this.state.search || null,
      activeFilter: getActiveFilter(this.state),
      activeCategory: type,
    };
    api.getBooks(params, ({ books }) => this.setState({ activeCategory: type, books }));
  }

  addBook(data) {
    const params = {
      search: this.state.search || null,
      activeFilter: getActiveFilter(this.state),
      activeCategory: this.state.activeCategory,
      ...data,
    };
    api.addBook(params, ({ books }) => this.setState({ books }));
  }

  deleteBook(_id) {
    const params = {
      search: this.state.search || null,
      activeFilter: getActiveFilter(this.state),
      activeCategory: this.state.activeCategory,
      _id,
    };
    api.deleteBook(params, ({ books }) => this.setState({ books }));
  }

  componentDidMount() {
    api.getInitData(this.state.search, ({ filters, books }) => this.setState({ filters, books }));
    api.getHistoryData(history => this.setState({ history }));
    api.getCategoriesData(categories => this.setState({ categories }));
  }

  closePopup = (type, book, id) => {
    if (type === 'add') {
      this.addBook(book);
    } else if (type === 'delete') {
      this.deleteBook(id);
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
