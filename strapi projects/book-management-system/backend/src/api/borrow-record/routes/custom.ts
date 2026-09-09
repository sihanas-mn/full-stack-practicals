export default {
  routes: [
    {
      method: 'POST',
      path: '/borrow-records/borrow',
      handler: 'borrow-record.borrow',
      config: { auth: { scope: ['api::borrow-record.borrow-record.borrow'] } },
    },
    {
      method: 'POST',
      path: '/borrow-records/:id/return',
      handler: 'borrow-record.return',
      config: { auth: { scope: ['api::borrow-record.borrow-record.return'] } },
    },
    {
      method: 'GET',
      path: '/borrow-records/me',
      handler: 'borrow-record.mine',
      config: { auth: { scope: ['api::borrow-record.borrow-record.mine'] } },
    },
  ],
};