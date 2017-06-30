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

export type Season = {
  id: string,
  allocine: number,
  year: number,
  episodes: number,
};
export type Seasons = {
  [id: string]: Season,
};

export type Uuid = {
  id: string,
};

export type TvshowWithoutID = {
  allocine: number,
  name: string,
  year: number,
  localizedName?: string,
  poster?: string,
  seasons: Seasons | {},
};
export type Tvshow = TvshowWithoutID & Uuid;
export type Tvshows = {
  [id: string]: Tvshow,
};

export type FriendWithoutID = {
  name: string,
};
export type Friend = FriendWithoutID & Uuid;
export type Friends = {
  [id: string]: Friend,
};

export type Message = {
  level: string,
  text: string,
  button?: string,
  callback?: Object, // an action to dispatch
};

export type Toast = {
  text: string,
  level: string,
  duration: number,
};
export type Toasts = {
  [id: string]: Toast,
};
