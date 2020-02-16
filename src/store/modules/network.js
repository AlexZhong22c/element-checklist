const network = {
  state: {
    isOffline: false
  },
  mutations: {
    SET_IS_OFFLINE (state, payload) {
      state.isOffline = payload;
    }
  }
};

export default network;
