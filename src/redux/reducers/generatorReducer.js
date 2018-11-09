let showGeneratorInputs = false;

const generator = (state = {}, action) => {
    switch (action.type) {
        case 'TOGGLE_GENERATOR':
            showGeneratorInputs = !showGeneratorInputs;
            return showGeneratorInputs;
        case 'ADD_GENERATOR':
            return {...action.payload};
        default:
            return state;
    }
};

export default generator;