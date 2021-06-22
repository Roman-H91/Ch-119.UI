import { call, put, select, StrictEffect, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';

import { OrderActionTypes } from '../types/orderTypes';
import { makeOrder, updateOrder } from '../services/orderService';
import {
  ORDER_DRIVER_ACTIVE_ROUTE,
  ORDER_USER_ACTIVE_ROUTE,
  ORDER_USER_ROUTE,
} from './../constants/routerConstants';
import {
  changeOrderValue,
  finishOrderErrorAction,
  finishOrderSuccessAction,
  makeOrderErrorAction,
  makeOrderSuccessAction,
} from './../actions/orderActions';

export const getUserID = (state: any) => state.auth.id;
export const getOrder = (state: any) => state.order;

function* makeOrderWorker(): Generator<StrictEffect, void, any> {
  const userID = yield select(getUserID);
  const order = yield select(getOrder);

  try {
    const data = yield call(makeOrder(order, userID));
    console.log(ORDER_USER_ROUTE + data.data.id);
    if (data.status === 200) {
      yield put(changeOrderValue('id', data.data.id));
      yield put(makeOrderSuccessAction());
      yield put(push(ORDER_USER_ROUTE + data.data.id));
    } else {
      yield put(makeOrderErrorAction());
    }
  } catch (error) {
    yield put(makeOrderErrorAction());
  }
}

function* finishOrderWorker(): Generator<StrictEffect, void, any> {
  yield put(finishOrderSuccessAction());
  const userID = yield select(getUserID);
  const order = yield select(getOrder);

  try {
    const data = yield call(updateOrder(order, userID));
    if (data.status === 200) {
      yield put(push(ORDER_DRIVER_ACTIVE_ROUTE));
      yield put(changeOrderValue('showModalForDriver', true));
    } else {
      yield put(finishOrderErrorAction());
    }
  } catch (error) {
    yield put(finishOrderErrorAction());
  }
}

export function* orderWatcher() {
  yield takeEvery(OrderActionTypes.MAKE_ORDER, makeOrderWorker);
  yield takeEvery(OrderActionTypes.FINISH_ORDER, finishOrderWorker);
}
