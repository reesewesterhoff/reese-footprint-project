const sitesByProject = (state = [], action) => {
    switch (action.type) {
      case 'SET_SITES_BY_PROJECT':
        return action.payload;
      default:
        return state;
    }
  };


export default sitesByProject;