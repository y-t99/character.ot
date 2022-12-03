import { IOperation } from "./operation";
import { diff, transform } from "../cot";
import { IAction, OTActionName } from "./action";

/**
 * The data model of an OT system defines the way data objects in a document are related to each other and referenced by operations. 
 * the data model of a basic OT system is a collection of independent objects addressed by a single linear address space (each object has a positional reference in this address space). 
 */
export class Document {
  private _content: string;

  private _operations: IOperation[];

  private _version: number;

  constructor(content = "", operations = [], version = 0) {
    this._content = content;
    this._operations = operations;
    this._version = version;
  }

  public execute(operation: IOperation): void {
    this._content = _executeAction(this._content, operation.action);
    operation.context = this._operations.slice(0, this._operations.length);
    this._operations.push(operation);
    this._version = this._version + 1;
  }

  public executeWithTransform(operation: IOperation): void {
    let X = transform(operation, diff(this._operations, operation.context));
    this.execute(X);
  }

  get version(): number {
    return this.version;
  }

  get operations(): IOperation[] {
    return this._operations;
  }

  get content(): string {
    return this._content;
  }
}

function _executeAction(content: string, action: IAction): string {
  switch (action.n) {
    case OTActionName.InvalidAction:
      return content;
    case OTActionName.CharacterInsert:
      return `${content.substring(0, action.p)}${action.c}${content.substring(
        action.p
      )}`;
    case OTActionName.CharacterDelete:
      return `${content.substring(0, action.p)}${content.substring(
        action.p + 1
      )}`;
    default:
      throw new Error("unknown action type");
  }
}
