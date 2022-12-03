import * as Cot from "../src/index";
import { OTActionName } from "../src/index";
describe("it successfully execute operation.", () => {

  test("execute one operation.", () => {
    let document = new Cot.Document("abc", [], 0);
    let action = {
      n: OTActionName.CharacterInsert,
      p: 3,
      c: "d",
    };
    let operation = Cot.newOperation(document, action);
    document.execute(operation);
    expect(document.content).toEqual("abcd");
  });

  test("execute more than one operation.", () => {
    let document = new Cot.Document("abc");
    let a = {
      n: OTActionName.CharacterInsert,
      p: 3,
      c: "d",
    };
    let A = Cot.newOperation(document, a);
    document.execute(A);
    let b = {
      n: OTActionName.CharacterInsert,
      p: 4,
      c: "e",
    };
    let B = Cot.newOperation(document, b);
    document.execute(B);
    expect(document.content).toEqual("abcde");
  });
});
