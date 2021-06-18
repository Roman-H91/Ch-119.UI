export interface OrderState {
  from: string;
  to: string;
  carType: CarTypeI;
  extraServices: Array<any>;
  paymentType: string;
  price: number;
  status: string;
  distance: google.maps.Distance | undefined;
}

interface CarTypeI {
  name: string;
  id: number;
}

type ValueOf<T> = T[keyof T];

export type OrderValues = ValueOf<OrderState>;

export interface ChangeValueAction {
  type: OrderActionTypes.CHANGE_VALUE;
  payload: {
    prop: keyof OrderState;
    value: OrderValues;
  };
}
export enum OrderActionTypes {
  CHANGE_VALUE = 'CHANGE_ORDER_VALUE',
}
export type OrderAction = ChangeValueAction;
