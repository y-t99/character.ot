import * as Cot from "../src/index";
import { OTActionName } from "../src/index";

describe("it successfully transform operation.", () => {
  test("operation a and operation b are context-equivalent.", () => {
    let document = new Cot.Document();
    let a = {
      n: OTActionName.CharacterInsert,
      p: 0,
      c: "a",
    };
    let A = Cot.newOperation(document, a);
    let b = {
      n: OTActionName.CharacterInsert,
      p: 0,
      c: "b",
    };
    let B = Cot.newOperation(document, b);
    document.execute(A);
    let X = Cot.transform(B, Cot.diff(document.operations, B.context));
    document.execute(X);
    expect(document.content).toEqual("ab");
  });

  test("execute the operation which context behind the current document.", () => {
    let document = new Cot.Document();
    let x = {
      n: OTActionName.CharacterInsert,
      p: 0,
      c: "x",
    }
    let X = Cot.newOperation(document, x);
    let a = {
      n: OTActionName.CharacterInsert,
      p: 0,
      c: "a",
    };
    let A = Cot.newOperation(document, a);
    document.executeWithTransform(A);
    let b = {
      n: OTActionName.CharacterInsert,
      p: 1,
      c: "b",
    };
    let B = Cot.newOperation(document, b);
    document.executeWithTransform(B);
    document.executeWithTransform(X);
    expect(document.content).toEqual("abx");
  });

});
