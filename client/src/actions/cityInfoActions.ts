import { CityInfoValues, InfoActionTypes } from '../types/cityInfoTypes';
import { CityInfoI } from '../pages/Order/mapService';

export const getCityInfoCreator = (cityName: string) => {
  console.log('action get info', cityName);

  return {
    type: InfoActionTypes.GET_INFO,
    payload: {
      name: cityName,
    },
  };
};

export const setCityInfoCreator = (info: CityInfoI) => {
  return {
    type: InfoActionTypes.SET_INFO,
    payload: info,
  };
};
export const changeCityInfoValueCreator = (
  prop: keyof CityInfoI,
  value: CityInfoValues,
) => {
  return {
    type: InfoActionTypes.CHANGE_VALUE,
    payload: {
      prop,
      value,
    },
  };
};