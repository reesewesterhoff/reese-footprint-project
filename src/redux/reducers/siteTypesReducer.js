const siteTypesReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_SITE_TYPES':
        return action.payload;
      case 'UNSET_USER':
        return [];
      case 'ADD_SITE_TO_PROJECT':
        return [];
      default:
        return state;
    }
  };


export default siteTypesReducer;
  