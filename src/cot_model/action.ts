export enum OTActionName {
  CharacterInsert = "CI",
  CharacterDelete = "CD",
  InvalidAction = "I",
}

export interface IInvalidAction {
  n: OTActionName.InvalidAction;
}

export interface ICharacterInsertAction {
  n: OTActionName.CharacterInsert;
  p: number;
  c: string;
}

export interface ICharacterDeleteAction {
  n: OTActionName.CharacterDelete;
  p: number;
}

export type IAction =
  | ICharacterInsertAction
  | ICharacterDeleteAction
  | IInvalidAction;
