const selectedSite = (state = {}, action) => {
    switch (action.type) {
      case 'SET_SELECTED_SITE':
        return action.payload;
      case 'UNSET_USER':
        return {};
      default:
        return state;
    }
  };

// sites will be on the redux state at:
// state.sites
  export default selectedSite;