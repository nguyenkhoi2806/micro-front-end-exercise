const remotes = {
  checkout: {
    url: `http://localhost:${process.env.REACT_APP_CHECKOUT_PORT || 3003}/remoteEntry.js`,
    scope: 'checkout'
  },
  product: {
    url: `http://localhost:${process.env.REACT_APP_PRODUCT_PORT || 3004}/remoteEntry.js`,
    scope: 'product'
  },
  shared: {
    url: `http://localhost:${process.env.REACT_APP_SHARED_PORT || 3005}/remoteEntry.js`,
    scope: 'shared'
  },
  chat: {
    url: `http://localhost:${process.env.REACT_APP_CHAT_PORT || 3006}/remoteEntry.js`,
    scope: 'chat'
  },
};

module.exports = { remotes };
