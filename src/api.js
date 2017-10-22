import { getActiveFilter, concatUrlParams, filterNotNullParams } from './utils';

const PORT = window.location.port;
const isDebug = window.location.search === '?debug';

const HISTORY_DATA = [
  { id: 1, move: 'added', book: 'The Trial', author: 'Franz Kafka', text: 'to your Must Read Titles', time: '2 years' },
  { id: 2, move: 'added', book: 'Fight Club', author: 'Chuck Palahniuk', text: 'to your Must Read Titles', time: '2 years' },
];

const CATEGORIES_DATA = [
  { type: 'must_read', title: 'Must Read Titles', color: '#ff517e' },
  { type: 'best', title: 'Best Of List', color: '#ffb700' },
  { type: 'classic', title: 'Classic Novels', color: '#03bedf' },
  { type: 'non_fiction', title: 'Non Fiction', color: '#847ede' },
];

const FILTERS_DATA = [
  { type: 'all', title: 'All Books', active: true },
  { type: 'recent', title: 'Most Recent', active: false },
  { type: 'popular', title: 'Most Popular', active: false },
  { type: 'free', title: 'Free Books', active: false },
];

const BOOKS_DATA = [
  { _id: 1, title: 'Jewels of Nizam', author: { firstName: 'Geeta', lastName: 'Devi' }, img: 'JewelsOfNizam.jpg', rating: 5, cost: 0, keywords: '', categories: '', },
  { _id: 2, title: 'Cakes & Bakes', author: { firstName: 'Sanjeev', lastName: 'Kapoor' }, img: 'CakesAndBakes.jpg', rating: 5, cost: 0, keywords: '', categories: '', },
  { _id: 3, title: 'Jamie\'s Kitchen', author: { firstName: 'Jamie', lastName: 'Oliver' }, img: 'JamiesKitchen.jpg', rating: 4, cost: 0, keywords: '', categories: '', },
  { _id: 4, title: 'Inexpensive Family Meals', author: { firstName: 'Simon', lastName: 'Holst' }, img: 'InexpensiveFamilyMeals.jpg', rating: 3, cost: 0, keywords: '', categories: '', },
  { _id: 5, title: 'Paleo Slow Cooking', author: { firstName: 'Chrissy', lastName: 'Gawer' }, img: 'PaleoSlowCooking.jpg', rating: 4, cost: 0, keywords: '', categories: '', },
  { _id: 6, title: 'Cook Like an Italian', author: { firstName: 'Toble', lastName: 'Puttock' }, img: 'CookLikeAnItalian.jpg', rating: 3, cost: 0, keywords: '', categories: '', },
  { _id: 7, title: 'Suneeta Vaswani', author: { firstName: 'Geeta', lastName: 'Devi' }, img: 'SuneetaVaswani.jpg', rating: 5, cost: 0, keywords: '', categories: '', },
  { _id: 8, title: 'Jamie Does', author: { firstName: 'Jamie', lastName: 'Oliver' }, img: 'JamieDoes.jpg', rating: 3, cost: 0, keywords: '', categories: '', },
  { _id: 9, title: 'Jamie\'s Italy', author: { firstName: 'Jamie', lastName: 'Oliver' }, img: 'JamiesItaly.jpg', rating: 5, cost: 0, keywords: '', categories: '', },
  { _id: 10, title: 'Vegetables Cookbook', author: { firstName: 'Matthew', lastName: 'Biggs' }, img: 'VegetablesCookbook.jpg', rating: 3, cost: 0, keywords: '', categories: '', },
  { _id: 11, title: 'Test book', author: { firstName: 'Name', lastName: 'Lastname' }, img: 'test.jpg', rating: 3, cost: 0, keywords: '', categories: '', }
];

export const api = {
  getHistoryData: (callback) => callback(HISTORY_DATA),
  getCategoriesData: (callback) => (
    fetch(`http://localhost:${PORT}/api/categories`)
      .then(response => isDebug ? CATEGORIES_DATA : response.json())
      .then(response => callback(response))
  ),
  getInitData: (search, callback) => (
    fetch(`http://localhost:${PORT}/api/filters`)
      .then(response => isDebug ? FILTERS_DATA : response.json())
      .then(response => {
        const filters = response;
        const params = {
          search: search || null,
          activeCategory: null,
          activeFilter: getActiveFilter({ filters }),
        };
        fetch(`http://localhost:${PORT}/api/books?` + concatUrlParams(params))
          .then(response => isDebug ? BOOKS_DATA : response.json())
          .then(response => callback({ filters, books: response }));
      })
  ),
  updateBook: (params, callback) => (
    fetch(`http://localhost:${PORT}/api/book`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action: 'update',
        ...filterNotNullParams(params),
      }),
    })
      .then(response => isDebug ? BOOKS_DATA : response.json())
      .then(response => callback({ books: response }))
  ),
  getBooks: (params, callback) => (
    fetch(`http://localhost:${PORT}/api/books?` + concatUrlParams(params))
      .then(response => isDebug ? BOOKS_DATA : response.json())
      .then(response => callback({ books: response }))
  ),
  addBook: (params, callback) => (
    fetch(`http://localhost:${PORT}/api/book`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action: 'create',
        ...filterNotNullParams(params),
      }),
    })
      .then(response => isDebug ? BOOKS_DATA : response.json())
      .then(response => callback({ books: response }))
  ),
  deleteBook: (params, callback) => (
    fetch(`http://localhost:${PORT}/api/book`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        action: 'delete',
        ...filterNotNullParams(params),
      }),
    })
      .then(response => isDebug ? BOOKS_DATA : response.json())
      .then(response => callback({ books: response }))
  ),
};
