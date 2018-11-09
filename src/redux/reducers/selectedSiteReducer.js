const selectedSite = (state = {}, action) => {
    switch (action.type) {
      case 'SET_SELECTED_SITE':
        return action.payload;
      default:
        return state;
    }
  };

// sites will be on the redux state at:
// state.sites
  export default selectedSite;