import * as Cot from "../src/index";
import { IAction, ICharacterDeleteAction, ICharacterInsertAction, OTActionName } from "../src/index";

describe("the it transformation function", () => {
  let invalidOperation = {
    context: [],
    action: { n: OTActionName.InvalidAction } as IAction,
  };

  let insertOperation = {
    context: [],
    action: { n: OTActionName.CharacterInsert, p: 0, c: "o" },
  };

  let insertM = {
    context: [insertOperation],
    action: { n: OTActionName.CharacterInsert, p: 1, c: "m" },
  };

  let insertL = {
    context: [insertOperation],
    action: { n: OTActionName.CharacterInsert, p: 0, c: "l" },
  };

  let insertR = {
    context: [insertOperation],
    action: { n: OTActionName.CharacterInsert, p: 1, c: "r" },
  };

  let deleteM = {
    context: [insertOperation],
    action: { n: OTActionName.CharacterDelete, p: 0} as IAction,
  }

  let deleteL = {
    context: [insertOperation, insertM],
    action: { n: OTActionName.CharacterDelete, p: 0} as IAction
  }

  let deleteR = {
    context: [insertOperation, insertM],
    action: { n: OTActionName.CharacterDelete, p: 1} as IAction
  }

  describe("Inclusion Transformation: I", () => {
    test("the operation will being transformed is I", () => {
      let x = Cot.inclusionTransform(invalidOperation, insertOperation);
      expect(invalidOperation == x).toBeTruthy();
    });

    test("the related operation is I", () => {
      let x = Cot.inclusionTransform(insertOperation, invalidOperation);
      expect(insertOperation == x).toBeTruthy();
    });
  });

  describe("Inclusion Transformation: Insert & Insert", () => {

    test("insertL and insertM", () => {
      let x = Cot.inclusionTransform(insertL, insertM);
      expect(insertL).toEqual(x);
    })

    test("insertR and insertM", () => {
      let x = Cot.inclusionTransform(insertR, insertM);
      expect((x.action as ICharacterInsertAction).p).toEqual(2);
    })

  });

  describe("Inclusion Transformation: Insert & Delete", () => {
    test("insertR and deleteM", () => {
      let x = Cot.inclusionTransform(insertR, deleteM);
      expect((x.action as ICharacterInsertAction).p).toEqual(0);
    });

    test("insertL and deleteM", () => {
      let x = Cot.inclusionTransform(insertL, deleteM);
      expect(x).toEqual(insertL);
    });
  });

  describe("Inclusion Transformation: Delete & Insert", () => {
    test("deleteM and insertR", () => {
      let x = Cot.inclusionTransform(deleteM, insertR);
      expect(x).toEqual(deleteM);
    });

    test("deleteM and insertL", () => {
      let x = Cot.inclusionTransform(deleteM, insertL);
      expect((x.action as ICharacterDeleteAction).p).toEqual(1);
    });
  });

  describe("Inclusion Transformation: Delete & Delete", () => {
    test("delete the same character", () => {
      let x = Cot.inclusionTransform(deleteM, deleteM);
      expect(x.action.n).toEqual(OTActionName.InvalidAction);
    });

    test("deleteL and deleteR", () => {
      let x = Cot.inclusionTransform(deleteL, deleteR);
      expect(x).toEqual(deleteL);
    });

    test("deleteR and deleteL", () => {
      let x = Cot.inclusionTransform(deleteR, deleteL);
      expect((x.action as ICharacterDeleteAction).p).toEqual(0);
    });
  });
});
