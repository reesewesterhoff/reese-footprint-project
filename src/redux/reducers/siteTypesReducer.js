const siteTypesReducer = (state = [], action) => {
    switch (action.type) {
      case 'SET_SITE_TYPES':
        return action.payload;
      default:
        return state;
    }
  };


export default siteTypesReducer;
  