/* @flow */

export type HeaderIconButton = {
  icon: string,
  action: Function,
  visibleIf?: boolean,
  hideByDefault?: boolean,
};
export type HeaderTextButton = {
  text: string,
  action: Function,
  visibleIf?: boolean,
  hideByDefault?: boolean,
};
export type HeaderButton = HeaderIconButton | HeaderTextButton;

export type Seasons = {
  id: number,
  allocine: number,
  year: number,
  episodes: number,
};

export type Message = {
  level: string,
  text: string,
};
