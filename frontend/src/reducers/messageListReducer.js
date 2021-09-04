const messageListReducers = (state, action) => {
  const draftState = [...state];
  switch (action.type) {
    case 'addMessage':
      return [...draftState, action.payload];
    default:
      return state;
  }
};

export default messageListReducers;
