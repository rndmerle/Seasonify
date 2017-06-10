import testReducer from 'Libs/testReducer';
import edit, { reducer, INITIAL_STATE } from '../editState';

describe('Reducer', () => {
  it('provides initial state', () => {
    testReducer(reducer, undefined, {}, INITIAL_STATE);
    expect(INITIAL_STATE).toMatchSnapshot();
  });

  it('handles editStart action', () => {
    testReducer(reducer, undefined, [edit.actions.editStart()], {
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
      [edit.actions.editEnd()],
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
      [edit.actions.editUpdate({ name: 'Some new name', subname: 'Subname' })],
      { editedObject: { year: 2017, name: 'Some new name', subname: 'Subname' } },
    );
  });
});

/* ======= SELECTORS ======= */

describe('Selectors', () => {
  it('isEditing', () => {
    expect(
      edit.selectors.isEditing({
        edit: {
          isEditing: true,
        },
      }),
    ).toEqual(true);
  });

  it('editedObject', () => {
    expect(
      edit.selectors.editedObject({
        edit: {
          editedObject: { name: 'Some name' },
        },
      }),
    ).toEqual({ name: 'Some name' });
  });
});
