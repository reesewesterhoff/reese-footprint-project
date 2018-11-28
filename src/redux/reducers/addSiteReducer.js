const sites = (state = [], action) => {
    switch (action.type) {
      case 'ADD_SITE':
        return [...state, action.payload];
      case 'CLEAR_FORM':
        return [];
      case 'UNSET_USER':
        return [];
      default:
        return state;
    }
  };

// sites will be on the redux state at:
// state.sites
  export default sites;