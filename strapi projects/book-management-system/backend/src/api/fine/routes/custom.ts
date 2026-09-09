export default {
  routes: [
    {
      method: 'GET',
      path: '/fines/me',
      handler: 'fine.mine',
      config: { auth: { scope: ['api::fine.fine.mine'] } },
    },
  ],
};