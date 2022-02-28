export interface ICar {
  name: string;
  color: string;
  id: number;
}

export interface IWinner {
  id: number;
  wins: number;
  time: number;
}

export type ICarNoID = {
  name: string;
  color: string;
};

export interface ICarObj {
  name: string;
  color: string;
}

export enum METHODS {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

export interface IPathData {
  velocity: number;
  distance: number;
}

export type SortParams = 'ASC' | 'DESC';
