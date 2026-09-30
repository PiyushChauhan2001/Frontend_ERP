// Mock client module replacing live Axios/Django backend calls
const client = {
  get: async () => ({ data: {} }),
  post: async () => ({ data: {} }),
  patch: async () => ({ data: {} }),
  delete: async () => ({ data: {} }),
  interceptors: {
    request: { use: () => {} },
    response: { use: () => {} },
  },
};

export default client;
