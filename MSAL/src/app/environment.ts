export const environment = {
  production: false,
  msalConfig: {
    auth: {
      clientId: 'decbb51f-384b-4bd3-bf3c-427944a29b39',
      authority: '8f6bd982-92c3-4de0-985d-0e287c55e379',
    },
  },
  apiConfig: {
    scopes: ['User.Read'],
    uri: 'https://graph.microsoft.com/v1.0/me',
  },
};
