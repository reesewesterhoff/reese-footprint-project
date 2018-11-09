let showGeneratorInputs = false;

const generatorReducer = (state = {}, action) => {
    switch (action.type) {
        case 'TOGGLE_GENERATOR':
            showGeneratorInputs = !showGeneratorInputs;
            return showGeneratorInputs;
        default:
            return state;
    }
}