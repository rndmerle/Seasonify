import Ident from './Ident';

// test('generate a new ID and check if lastId is the same (dynamic calls)', () => {
//   const ids = new Ids();
//   expect(ids.genId()).toEqual(ids.sameId());
// });

test('generate a new ID and check if lastId is the same (static calls)', () => {
  expect(Ident.newid()).toEqual(Ident.id());
});
