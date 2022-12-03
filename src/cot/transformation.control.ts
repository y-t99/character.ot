import { IAction, OTActionName } from "../cot_model/action";
import { IOperation } from "../cot_model/operation";
import { inclusionTransform } from "./transformation.function";

export function transform(o: IOperation, contextDiff: IOperation[]): IOperation {
  while (contextDiff.length > 0) {
    // the under two line code now no effect.
    let x = contextDiff.shift();
    transform(x!, diff(o.context, x!.context));
    o = inclusionTransform(o, x!);
    o.context.push(x!);
  }
  return o;
}

/**
 * get the context difference between the current document state and defined document state
 * 
 * @param documentState the current document state
 * @param context defined document state
 * @returns the difference operations
 */
export function diff(
  documentState: IOperation[],
  context: IOperation[]
): IOperation[] {
  if (!documentState || context == undefined || context.length >= documentState.length) {
    return [];
  }
  return documentState.slice(context.length);
}
