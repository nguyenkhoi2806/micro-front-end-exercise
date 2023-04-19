const remotes = {
  account: {
    url: `http://localhost:${process.env.REACT_APP_ACCOUNT_PORT || 3001}/remoteEntry.js`,
    scope: 'account'
  },
  blog: {
    url: `http://localhost:${process.env.REACT_APP_BLOG_PORT || 3002}/remoteEntry.js`,
    scope: 'blog'
  },
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

export default remotes