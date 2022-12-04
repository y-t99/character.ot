# character.ot

![code coverage](https://img.shields.io/badge/coverage-94%25-brightgreen)

character.ot: The term of a basic OT system is often used to mean an OT system that has the basic capability of consistency maintenance for a pair of primitive character-wise insert and delete operations. The character.ot give the support.

### Install
```shell
npm i character.ot
```

### Quick start

#### Execute Operation

```typescript
import * as Cot from "character.ot";
import { OTActionName } from "character.ot";

// the init document state
let document = new Cot.Document("abc");
// the operator action
let action = {
  n: OTActionName.CharacterInsert,
  p: 3,
  c: "d",
};
// context which operation is defined is the init document state
// action denotes an operation to do
let operation = Cot.newOperation(document, action);
// execute operation
document.execute(operation);
expect(document.content).toEqual("abcd");
```

#### Transform Operation

```typescript
let document = new Cot.Document("abc");

let a = {
  n: OTActionName.CharacterInsert,
  p: 3,
  c: "d",
};
let A = Cot.newOperation(document, a);
let b = {
  n: OTActionName.CharacterInsert,
  p: 3,
  c: "e",
};
let B = Cot.newOperation(document, b);
document.executeWithTransform(A);
document.executeWithTransform(B);

expect(document.content).toEqual("abcde");
```

### Use Scenario

There is the init document is "abc". The user A insert '_' into the index '0' position in init document, and user B to insert 'd' into the index '3' position  in init document. When the document firstly execute user A's operation, and then execute user B'. Finally, the document is "_abcd".

```typescript
let document = new Cot.Document("abc");

let a = {
  n: OTActionName.CharacterInsert,
  p: 0,
  c: "_",
};
let A = Cot.newOperation(document, a);
let b = {
  n: OTActionName.CharacterInsert,
  p: 3,
  c: "d",
};
let B = Cot.newOperation(document, b);
document.executeWithTransform(A);
document.executeWithTransform(B);

expect(document.content).toEqual("_abcd");
```

More use scenario under file `test\scenario.test.ts`.

### How To Describe Bug

**Please give a test**, for example the `test\scenario.test.ts`:

```typescript
/**
 * scenario:
 *  given
 *    the init document is "abc".
 *  when
 *    user A insert 'd' into the index '3' position in init document,
 *    and user B also want to insert 'e' into the same position in init document.
 *    the document firstly execute user A's operation, and then execute user B'.
 *  then
 *    the document is "abcde".
 */
test("scenario", () => {
  let document = new Cot.Document("abc");

  let a = {
    n: OTActionName.CharacterInsert,
    p: 3,
    c: "d",
  };
  let A = Cot.newOperation(document, a);
  let b = {
    n: OTActionName.CharacterInsert,
    p: 3,
    c: "e",
  };
  let B = Cot.newOperation(document, b);
  document.executeWithTransform(A);
  document.executeWithTransform(B);

  expect(document.content).toEqual("abcde");
});
```
