import { IAction, OTActionName } from "./action";
import { Document } from "./document";

/**
 * The operation model of an OT system is the set of operations directly processed by transformation functions. 
 * For example, the operation model of a basic OT system consists of two primitive operations: character-wise insert and delete.
 */
export interface IOperation {
  context: IOperation[];

  /**
   * When an operation is applied to an input string,
   * you can think of this as if an imaginary cursor runs over the entire string and skips over some parts,
   * deletes some parts and inserts characters at some positions.
   * These actions (skip/delete/insert) are stored as an array in the "actions" property.
   */
  action: IAction;
}

export class Operation implements IOperation {
  context: IOperation[];

  action: IAction;
}

/**
 * breaking delete-tie using I (identity op)
 */
export const I: IOperation = {
  context: [],

  action: {
    n: OTActionName.InvalidAction,
  },
};

export function newOperation(context: Document, action: IAction): IOperation {
  return {
    context: context.operations.slice(),
    action,
  };
}
