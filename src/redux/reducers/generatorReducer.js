const generator = (state = {}, action) => {
    switch (action.type) {
        case 'ADD_GENERATOR':
            return {...action.payload};
        default:
            return state;
    }
};

export default generator;