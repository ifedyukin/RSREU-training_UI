import React, { Component } from 'react';
import Header from './blocks/Header';
import Sidebar from './blocks/Sidebar';
import ContentContainer from './blocks/ContentContainer';
import Footer from './blocks/Footer';
import Popup from './blocks/Popup';

class App extends Component {
  constructor() {
    super();

    this.state = {
      books: [],
      history: [],
      filters: [],
      search: '',
      popup: false,
    }
  }

  concatUrlParams = (params) => Object.keys(params)
    .map(param => encodeURIComponent(param) + '=' + encodeURIComponent(params[param]))
    .join('&');

  getActiveFilter(state) {
    const activeFilter = state.filters.filter(f => f.active)[0];
    return activeFilter ? activeFilter.id : null;
  }

  getHistoryData() {
    fetch('http://localhost:3000/get-history-api/')
      .then(response => this.setState({
        history: [
          { id: 1, move: 'added', book: 'The Trial', author: 'Franz Kafka', text: 'to your Must Read Titles', time: '2 years' },
          { id: 2, move: 'added', book: 'Fight Club', author: 'Chuck Palahniuk', text: 'to your Must Read Titles', time: '2 years' },
        ]
      }));
  }

  getInitData() {
    fetch('http://localhost:3000/get-filters-api/')
      .then(response => {
        const filters = [
          { id: 1, title: 'All Books', active: true },
          { id: 2, title: 'Most Recent', active: false },
          { id: 3, title: 'Most Popular', active: false },
          { id: 4, title: 'Free Books', active: false },
        ];
        const params = {
          search: this.state.search || null,
          filters: this.getActiveFilter({ filters }),
        };
        fetch('http://localhost:3000/get-books-api/?' + this.concatUrlParams(params))
          .then(response => {
            const books = [
              { id: 1, title: 'Jewels of Nizam', author: 'Geeta Devi', img: 'JewelsOfNizam.jpg', stars: 5 },
              { id: 2, title: 'Cakes & Bakes', author: 'Sanjeev Kapoor', img: 'CakesAndBakes.jpg', stars: 5 },
              { id: 3, title: 'Jamie\'s Kitchen', author: 'Jamie Oliver', img: 'JamiesKitchen.jpg', stars: 4 },
              { id: 4, title: 'Inexpensive Family Meals', author: 'Simon Holst', img: 'InexpensiveFamilyMeals.jpg', stars: 3 },
              { id: 5, title: 'Paleo Slow Cooking', author: 'Chrissy Gawer', img: 'PaleoSlowCooking.jpg', stars: 4 },
              { id: 6, title: 'Cook Like an Italian', author: 'Toble Puttock', img: 'CookLikeAnItalian.jpg', stars: 3 },
              { id: 7, title: 'Suneeta Vaswani', author: 'Geeta Devi', img: 'SuneetaVaswani.jpg', stars: 5 },
              { id: 8, title: 'Jamie Does', author: 'Jamie Oliver', img: 'JamieDoes.jpg', stars: 3 },
              { id: 9, title: 'Jamie\'s Italy', author: 'Jamie Oliver', img: 'JamiesItaly.jpg', stars: 5 },
              { id: 10, title: 'Vegetables Cookbook', author: 'Matthew Biggs', img: 'VegetablesCookbook.jpg', stars: 3 }
            ];

            this.setState({ filters, books });
          });
      });
  }

  updateBook = (id, data) => {
    const params = {
      id,
      search: this.state.search || null,
      filters: this.getActiveFilter(this.state), ...data
    };
    fetch('http://localhost:3000/update-book-api/?' + this.concatUrlParams(params))
      .then(response => this.setState({ history: response.json().history, books: response.json().books }));
  }

  search = (search) => {
    const params = {
      search,
      filters: this.getActiveFilter(this.state),
    };
    fetch('http://localhost:3000/search-api/?' + this.concatUrlParams(params))
      .then(response => this.setState({ search, books: response.json() }));
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
      filters: this.getActiveFilter(newFilters),
    };
    fetch('http://localhost:3000/set-filter-api/?' + this.concatUrlParams(params))
      .then(response => this.setState({ filters: newFilters, books: response.json() }));
  }

  addBook(data) {
    const params = {
      search: this.state.search || null,
      filters: this.getActiveFilter(this.state),
      ...data,
    };
    fetch('http://localhost:3000/add-book-api/?' + this.concatUrlParams(params))
      .then(response => this.setState({ books: response.json().books, history: response.json().history }));
  }

  componentDidMount() {
    this.getInitData();
    this.getHistoryData();
  }

  closeAddPopup = (book) => {
    if (book) {
      this.addBook(book);
    }
    this.setState({ popup: false });
  }

  render() {
    return (
      <div>
        <Header />
        <Sidebar history={this.state.history} openPopup={() => this.setState({ popup: true })} />
        <ContentContainer
          books={this.state.books}
          filters={this.state.filters}
          setFilter={this.setFilter}
          searchMethod={this.search}
          searchText={this.state.search}
          updateBook={this.updateBook}
        />
        <Footer />
        {this.state.popup ? <Popup closeAddPopup={this.closeAddPopup} /> : null}
      </div>);
  }
}

export default App;
