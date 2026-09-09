export default {
  routes: [
    {
      method: 'GET',
      path: '/books/catalog',
      handler: 'book.catalog',
      config: { auth: { scope: ['api::book.book.catalog'] } },
    },
    {
      method: 'GET',
      path: '/books/dashboard',
      handler: 'book.dashboard',
      config: { auth: { scope: ['api::book.book.dashboard'] } },
    },
  ],
};