import Identity from '../Identity';

// test('generate a new ID and check if lastId is the same (dynamic calls)', () => {
//   const ids = new Ids();
//   expect(ids.genId()).toEqual(ids.sameId());
// });

test('generate a new ID and check if lastId is the same (static calls)', () => {
  expect(Identity.newid()).toEqual(Identity.id());
});

test('Force an ID and check if we get it on next call', () => {
  Identity.forceId('abc123');
  expect(Identity.newid()).toEqual('abc123');
  expect(Identity.newid()).not.toEqual('abc123');
});

test('Force an array of IDs and check if we always get em', () => {
  Identity.forceId(['abc123', 'xyz890']);
  expect(Identity.newid()).toEqual('abc123');
  expect(Identity.newid()).toEqual('xyz890');
  expect(Identity.newid()).not.toEqual('xyz890');
});
