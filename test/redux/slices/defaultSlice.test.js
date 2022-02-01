import reducer, { initialState, toggleMemory } from '../../../src/redux/slices/defaultSlice';

describe('default slice reducer test', function () {
  
  test('dispatching toggle memory section', () => {
    // given
    let state = {
      ...initialState,
      isMemoryOpen: false
    };
    
    // 1. isMemoryOpen이 false일 때, toggleMemory dispatch시 true가 됨
    // when
    state = reducer(state, toggleMemory());
    // then
    expect(state.isMemoryOpen).toEqual(true);
    
    // 2. isMemoryOpen이 true 때, toggleMemory dispatch시 false가 됨
    // when
    state = reducer(state, toggleMemory());
    expect(state.isMemoryOpen).toEqual(false);
  });
  
});
