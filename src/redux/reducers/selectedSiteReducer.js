const selectedSite = (state = {}, action) => {
    switch (action.type) {
      case 'SET_SELECTED_SITE':
        return action.payload;
      case 'UNSET_USER':
        return {};
      case 'ADD_SITE_TO_PROJECT':
        return {};
      default:
        return state;
    }
  };

// sites will be on the redux state at:
// state.sites
  export default selectedSite;