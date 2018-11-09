let showGeneratorInputs = false;

const generator = (state = {}, action) => {
    switch (action.type) {
        case 'TOGGLE_GENERATOR':
            showGeneratorInputs = !showGeneratorInputs;
            return showGeneratorInputs;
        default:
            return state;
    }
};

export default generatorReducer;