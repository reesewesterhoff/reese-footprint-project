const sites = (state = [], action) => {
    switch (action.type) {
      case 'SET_SITES':
        return action.payload;
      default:
        return state;
    }
  };

// sites will be on the redux state at:
// state.sites
  export default sites;