import testReducer from 'Libs/testReducer';

import reducer, { editActions, editSelectors, INITIAL_STATE } from '../editState';

describe('Reducer', () => {
  it('provides initial state', () => {
    testReducer(reducer, undefined, {}, INITIAL_STATE);
    expect(INITIAL_STATE).toMatchSnapshot();
  });

  it('handles editStart action', () => {
    testReducer(reducer, undefined, [editActions.editStart()], {
      isEditing: true,
    });
  });

  it('handles editEnd action', () => {
    testReducer(
      reducer,
      {
        isEditing: true,
        editedObject: { name: 'Edited name' },
      },
      [editActions.editEnd()],
      {
        isEditing: false,
        editedObject: {},
      },
    );
  });

  it('handles editUpdate action', () => {
    testReducer(
      reducer,
      { editedObject: { year: 2017, name: 'Some name' } },
      [editActions.editUpdate({ name: 'Some new name', subname: 'Subname' })],
      { editedObject: { year: 2017, name: 'Some new name', subname: 'Subname' } },
    );
  });
});

/* ======= SELECTORS ======= */

describe('Selectors', () => {
  it('isEditing', () => {
    expect(
      editSelectors.isEditing({
        edit: {
          isEditing: true,
        },
      }),
    ).toEqual(true);
  });

  it('editedObject', () => {
    expect(
      editSelectors.editedObject({
        edit: {
          editedObject: { name: 'Some name' },
        },
      }),
    ).toEqual({ name: 'Some name' });
  });
});
