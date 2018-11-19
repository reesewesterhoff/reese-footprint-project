const allSiteTypes = (state = [], action) => {
    switch (action.type) {
      case 'SET_ALL_SITE_TYPES':
        return action.payload;
      default:
        return state;
    }
  };


export default allSiteTypes;
  