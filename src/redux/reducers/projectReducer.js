const project = (state = [], action) => {
    switch (action.type) {
      case 'SET_PROJECT':
        return action.payload;
      case 'UNSET_USER':
        return [];
      default:
        return state;
    }
  };


export default project;