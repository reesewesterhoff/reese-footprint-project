const projectsReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_PROJECTS':
        return action.payload;
      case 'UNSET_USER':
        return [];
      default:
        return state;
    }
  };


export default projectsReducer;