import {
  ICar, ICarObj, IWinner, METHODS, SortParams,
} from './server-types';

class ServerAPI {
  private static baseUrl: string = 'http://localhost:3000';

  public static readonly postWinner = async (
    data: IWinner,
  ): Promise<Response | null> => {
    try {
      const response = await fetch(`${ServerAPI.baseUrl}/winners/`, {
        method: METHODS.POST,
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  public static readonly getWinner = async (
    id: number,
  ): Promise<IWinner | null> => {
    try {
      const response = await fetch(`${ServerAPI.baseUrl}/winners/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  public static readonly removeWinner = async (id: number): Promise<void> => {
    try {
      await fetch(`${ServerAPI.baseUrl}/winners/${id}`, {
        method: METHODS.DELETE,
      });
    } catch (error) {
      console.log(error);
    }
  };

  public static readonly updateWinner = async (
    data: IWinner,
  ): Promise<Response | null> => {
    try {
      const response = await fetch(`${ServerAPI.baseUrl}/winners/${data.id}`, {
        method: METHODS.PUT,
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify({ wins: data.wins, time: data.time }),
      });
      return response;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  public static readonly getData = async <T>(
    endpoint: string,
    page?: number,
    limit?: number,
  ): Promise<[T, string] | null> => {
    try {
      const response = await fetch(
        `${ServerAPI.baseUrl}/${endpoint}?_page=${page}&_limit=${limit}`,
      );
      const totalCount = response.headers.get('X-Total-Count') || 'No total count';
      const data = await response.json();
      return [data, totalCount];
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  public static readonly getFullCars = async (): Promise<ICar[] | null> => {
    try {
      const response = await fetch(`${ServerAPI.baseUrl}/garage`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  public static readonly postCar = async (carObj: ICarObj): Promise<void> => {
    try {
      await fetch(`${ServerAPI.baseUrl}/garage`, {
        method: METHODS.POST,
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(carObj),
      });
    } catch (error) {
      console.log(error);
    }
  };

  public static readonly removeCar = async (id: number): Promise<void> => {
    try {
      await fetch(`${ServerAPI.baseUrl}/garage/${id}`, {
        method: METHODS.DELETE,
      });
    } catch (error) {
      console.log(error);
    }
  };

  public static readonly updateCar = async (
    id: number,
    data: { name: string; color: string },
  ): Promise<void> => {
    try {
      await fetch(`${ServerAPI.baseUrl}/garage/${id}`, {
        method: METHODS.PUT,
        headers: {
          'Content-type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    } catch (error) {
      console.log(error);
    }
  };

  public static readonly enginePath = async (
    id: number,
    status: string,
  ): Promise<null | Response> => {
    try {
      const response = await fetch(
        `${ServerAPI.baseUrl}/engine?id=${id}&status=${status}`,
        {
          method: METHODS.PATCH,
        },
      );
      return response;
    } catch (error) {
      return null;
    }
  };

  public static readonly fetchSortedWinners = async (
    page: number,
    whatToSort?: string,
    sortParam?: SortParams,
  ): Promise<[IWinner[], string] | null> => {
    try {
      const response = await fetch(
        `${ServerAPI.baseUrl}/winners?_page=${page}&_limit=10&_sort=${whatToSort}&_order=${sortParam}`,
      );
      const data = await response.json();
      const totalCount = response.headers.get('X-Total-Count') || 'No total count';
      return [data, totalCount];
    } catch (error) {
      console.log(error);
      return null;
    }
  };
}

export default ServerAPI;
