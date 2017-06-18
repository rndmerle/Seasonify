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

export type Season = {
  id: string,
  allocine: number,
  year: number,
  episodes: number,
};
export type Seasons = {
  [id: string]: Season,
};

export type Tvshow = {
  id: string,
  allocine: number,
  name: string,
  year: number,
  localizedName?: string,
  poster?: string,
  seasons: Seasons | {},
};
export type Tvshows = {
  [id: string]: Tvshow,
};

export type Friend = {
  id: string,
  name: string,
};
export type Friends = {
  [id: string]: Friend,
};

export type Message = {
  level: string,
  text: string,
};

export type ApiResponse =
  | {
      error: null,
      data: Array<Object>,
    }
  | {
      error: string,
      data: null,
    };

export type ApiPromise = Promise<ApiResponse>;
