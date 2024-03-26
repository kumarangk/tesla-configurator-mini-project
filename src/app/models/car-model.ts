export interface ICarTabList {
  id: string;
  name: string;
  value: number;
  disabled?: boolean;
}

export interface ICarModelResponse{
  code: string;
  description: string;
  colors: ICarColors[];
}

export interface ICarColors{
  code: string;
  description: string;
  price: number;
}

export interface IConfigData{
  configs: IConfigs[]
  towHitch: boolean;
  yoke: boolean;
}

export interface IConfigs{
  id: number;
  description: string;
  price: number;
  range: number;
  speed: number;
}

export interface IPriceData{
  title: string;
  value: number;
  hasDescription?: boolean;
  range?: number;
  speed?: number;
}

export interface ICarDetails{
  model: string;
  color: string;
}

export interface IConfigDetails{
  config: number;
  towHitch: boolean;
  yoke: boolean;
}
