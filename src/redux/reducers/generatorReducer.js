const generator = (state = [], action) => {
    switch (action.type) {
        case 'ADD_GENERATOR':
            return [...state, action.payload];
        case 'CLEAR_FORM':
            return [];
      case 'UNSET_USER':
          return [];
        default:
            return state;
    }
};

export default generator;