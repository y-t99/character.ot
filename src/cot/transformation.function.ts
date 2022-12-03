import { I, IOperation } from "../cot_model/operation";
import {
  ICharacterDeleteAction,
  ICharacterInsertAction,
  OTActionName,
} from "../cot_model/action";

function _newContext(o: IOperation): IOperation[] {
  let newContext = o.context.slice();
  newContext.push(o);
  return newContext;
}

function _tii(a: IOperation, b: IOperation): IOperation {
  if (
    (a.action as ICharacterInsertAction).p <
      (b.action as ICharacterInsertAction).p
  ) {
    return a;
  }
  return {
    context: _newContext(b),
    action: {
      n: OTActionName.CharacterInsert,
      p: (a.action as ICharacterInsertAction).p + 1,
      c: (a.action as ICharacterInsertAction).c,
    },
  };
}

function _tid(a: IOperation, b: IOperation): IOperation {
  if (
    (a.action as ICharacterInsertAction).p <=
    (b.action as ICharacterDeleteAction).p
  ) {
    return a;
  }
  return {
    context: _newContext(b),
    action: {
      n: OTActionName.CharacterInsert,
      p: (a.action as ICharacterInsertAction).p - 1,
      c: (a.action as ICharacterInsertAction).c,
    },
  };
}

function _tdi(a: IOperation, b: IOperation): IOperation {
  if (
    (a.action as ICharacterDeleteAction).p <
    (b.action as ICharacterInsertAction).p
  ) {
    return a;
  }
  return {
    context: _newContext(b),
    action: {
      n: OTActionName.CharacterDelete,
      p: (a.action as ICharacterDeleteAction).p + 1,
    },
  };
}

function _tdd(a: IOperation, b: IOperation): IOperation {
  if (
    (a.action as ICharacterDeleteAction).p >
    (b.action as ICharacterDeleteAction).p
  ) {
    return {
      context: _newContext(b),
      action: {
        n: OTActionName.CharacterDelete,
        p: (a.action as ICharacterDeleteAction).p - 1,
      },
    };
  }
  if (
    (a.action as ICharacterDeleteAction).p <
    (b.action as ICharacterDeleteAction).p
  ) {
    return a;
  }
  return I;
}

/**
 * Pre-Condition for IT (Pre-IT): C(Oa) = C(Ob) which means that Oa and Ob can be IT-transformed only if they are context-equivalent.
 * 
 * @param a the operation will being transformed
 * @param b the related operation
 * @returns the transformed operation
 */
export function inclusionTransform(a: IOperation, b: IOperation): IOperation {
  if (
    a.action.n === OTActionName.InvalidAction ||
    b.action.n === OTActionName.InvalidAction
  ) {
    return a;
  }

  if (
    a.action.n === OTActionName.CharacterInsert &&
    b.action.n === OTActionName.CharacterInsert
  ) {
    return _tii(a, b);
  }

  if (
    (a.action.n as OTActionName) === OTActionName.CharacterInsert &&
    b.action.n === OTActionName.CharacterDelete
  ) {
    return _tid(a, b);
  }

  if (
    a.action.n === OTActionName.CharacterDelete &&
    b.action.n === OTActionName.CharacterInsert
  ) {
    return _tdi(a, b);
  }

  if (
    a.action.n === OTActionName.CharacterDelete &&
    b.action.n === OTActionName.CharacterDelete
  ) {
    return _tdd(a, b);
  }

  throw new Error("unknown action type");
}

export function exclusionTransform(): void {}
