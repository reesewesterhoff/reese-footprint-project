const projectId = (state = 0, action) => {
    switch (action.type) {
      case 'SELECT_PROJECT':
        return action.payload;
      default:
        return state;
    }
  };

// sites will be on the redux state at:
// state.sites
  export default projectId;