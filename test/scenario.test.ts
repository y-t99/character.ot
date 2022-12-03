import * as Cot from "../src/index";
import { IAction, OTActionName } from "../src/index";

describe("simulating actual use scenario.", () => {
  /**
   * scenario 1:
   *  given
   *    the init document is "abc".
   *  when
   *    user A insert 'd' into the index '3' position in init document,
   *    and user B also want to insert 'e' into the same position in init document.
   *    the document firstly execute user A's operation, and then execute user B'.
   *  then
   *    the document is "abcde".
   */
  test("scenario 1", () => {
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

  /**
   * scenario 2:
   *  given
   *    the init document is "abc".
   *  when
   *    user A insert 'd' into the index '3' position in init document,
   *    and user B to insert '_' into the index '0' position  in init document.
   *    the document firstly execute user A's operation, and then execute user B'.
   *  then
   *    the document is "_abcd".
   */
  test("scenario 2", () => {
    let document = new Cot.Document("abc");

    let a = {
      n: OTActionName.CharacterInsert,
      p: 3,
      c: "d",
    };
    let A = Cot.newOperation(document, a);
    let b = {
      n: OTActionName.CharacterInsert,
      p: 0,
      c: "_",
    };
    let B = Cot.newOperation(document, b);
    document.executeWithTransform(A);
    document.executeWithTransform(B);

    expect(document.content).toEqual("_abcd");
  });

  /**
   * scenario 3:
   *  given
   *    the init document is "abc".
   *  when
   *    user A insert '_' into the index '0' position in init document,
   *    and user B to insert 'd' into the index '3' position  in init document.
   *    the document firstly execute user A's operation, and then execute user B'.
   *  then
   *    the document is "_abcd".
   */
  test("scenario 3", () => {
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
  });

  /**
   * scenario 4:
   *  given
   *    the init document is "abc".
   *  when
   *    user A delete the character in the index '2' position in init document,
   *    and user B also want.
   *    the document firstly execute user A's operation, and then execute user B'.
   *  then
   *    the document is "ab".
   */
  test("scenario 4", () => {
    let document = new Cot.Document("abc");

    let a = {
      n: OTActionName.CharacterDelete,
      p: 2,
    } as IAction;
    let A = Cot.newOperation(document, a);
    let b = {
      n: OTActionName.CharacterDelete,
      p: 2,
    } as IAction;
    let B = Cot.newOperation(document, b);
    document.executeWithTransform(A);
    document.executeWithTransform(B);

    expect(document.content).toEqual("ab");
  });

  /**
   * scenario 5:
   *  given
   *    the init document is "abc".
   *  when
   *    user A delete the character in the index '1' position in init document,
   *    and user B insert '_' into the index '3' position in init document.
   *    the document firstly execute user A's operation, and then execute user B'.
   *  then
   *    the document is "ac_".
   */
  test("scenario 5", () => {
    let document = new Cot.Document("abc");

    let a = {
      n: OTActionName.CharacterDelete,
      p: 1,
    } as IAction;
    let A = Cot.newOperation(document, a);
    let b = {
      n: OTActionName.CharacterInsert,
      p: 3,
      c: "_",
    };
    let B = Cot.newOperation(document, b);
    document.executeWithTransform(A);
    document.executeWithTransform(B);

    expect(document.content).toEqual("ac_");
  });

  /**
   * scenario 6:
   *  given
   *    the init document is "abc".
   *  when
   *    user A delete the character in the index '2' position in init document,
   *    and user B insert '_' into the index '0' position in init document.
   *    the document firstly execute user A's operation, and then execute user B'.
   *  then
   *    the document is "_ab".
   */
  test("scenario 6", () => {
    let document = new Cot.Document("abc");

    let a = {
      n: OTActionName.CharacterDelete,
      p: 2,
    } as IAction;
    let A = Cot.newOperation(document, a);
    let b = {
      n: OTActionName.CharacterInsert,
      p: 0,
      c: "_",
    };
    let B = Cot.newOperation(document, b);
    document.executeWithTransform(A);
    document.executeWithTransform(B);

    expect(document.content).toEqual("_ab");
  });

  /**
   * scenario 7:
   *  given
   *    the init document is "abc".
   *  when
   *    user A insert '_' into the index '3' position in init document,
   *    and user B delete the character in the index '2' position in init document,
   *    the document firstly execute user A's operation, and then execute user B'.
   *  then
   *    the document is "ab_".
   */
  test("scenario 7", () => {
    let document = new Cot.Document("abc");

    let a = {
      n: OTActionName.CharacterInsert,
      p: 3,
      c: "_",
    };
    let A = Cot.newOperation(document, a);
    let b = {
      n: OTActionName.CharacterDelete,
      p: 2,
    } as IAction;
    let B = Cot.newOperation(document, b);
    document.executeWithTransform(A);
    document.executeWithTransform(B);

    expect(document.content).toEqual("ab_");
  });

  /**
   * scenario 8:
   *  given
   *    the init document is "abc".
   *  when
   *    user A insert '_' into the index '2' position in init document,
   *    and user B delete the character in the index '2' position in init document,
   *    the document firstly execute user A's operation, and then execute user B'.
   *  then
   *    the document is "ab_".
   */
  test("scenario 8", () => {
    let document = new Cot.Document("abc");

    let a = {
      n: OTActionName.CharacterInsert,
      p: 2,
      c: "_",
    };
    let A = Cot.newOperation(document, a);
    let b = {
      n: OTActionName.CharacterDelete,
      p: 2,
    } as IAction;
    let B = Cot.newOperation(document, b);
    document.executeWithTransform(A);
    document.executeWithTransform(B);

    expect(document.content).toEqual("ab_");
  });

  /**
   * scenario 9:
   *  given
   *    the init document is "abc".
   *  when
   *    user A delete the character in the index '1' position in init document,
   *    and user B delete the character in the index '2' position in init document,
   *    the document firstly execute user A's operation, and then execute user B'.
   *  then
   *    the document is "a".
   */
  test("scenario 9", () => {
    let document = new Cot.Document("abc");

    let a = {
      n: OTActionName.CharacterDelete,
      p: 1,
    } as IAction;
    let A = Cot.newOperation(document, a);
    let b = {
      n: OTActionName.CharacterDelete,
      p: 2,
    } as IAction;
    let B = Cot.newOperation(document, b);
    document.executeWithTransform(A);
    document.executeWithTransform(B);

    expect(document.content).toEqual("a");
  });

  /**
   * scenario 10:
   *  given
   *    the init document is "abc".
   *  when
   *    user A delete the character in the index '2' position in init document,
   *    and user B delete the character in the index '1' position in init document,
   *    the document firstly execute user A's operation, and then execute user B'.
   *  then
   *    the document is "a".
   */
  test("scenario 10", () => {
    let document = new Cot.Document("abc");

    let a = {
      n: OTActionName.CharacterDelete,
      p: 2,
    } as IAction;
    let A = Cot.newOperation(document, a);
    let b = {
      n: OTActionName.CharacterDelete,
      p: 1,
    } as IAction;
    let B = Cot.newOperation(document, b);
    document.executeWithTransform(A);
    document.executeWithTransform(B);

    expect(document.content).toEqual("a");
  });
});
