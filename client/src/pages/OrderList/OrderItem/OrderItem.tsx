import { FC } from 'react';

import { useTypedSelector } from '../../../hooks/useTypedSelector';
import {
  useDriverOrderNewActions,
  useUserOrderActions,
} from '../../../hooks/useActions';
import { Statuses } from '../../../constants/statuses';

import { extraServicesIcons } from '../../../components/ExtraServices/icons';
import { Pages } from '../OrderList';

import './OrderItem.scss';

interface CustomerInfoI {
  name: string;
  phone: string;
}

interface DriverInfoI {
  carType: string;
  carColor: string;
  carNumber: string;
  carModel: string;
  rating: number | null;
}

interface FeedBackI {
  id: number;
  text: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
  orderId: number;
  authorRole: number;
  subjectRole: number;
}

interface OrderItemPropsI {
  orderId: number;
  from: string;
  to: string;
  status: string;
  price: string;
  carType: string;
  extraServices: [number];
  lastUpdate: string;
  isDriver: boolean;
  page: Pages;
  customerInfo?: CustomerInfoI;
  driverInfo?: DriverInfoI;
  mayTakeOrder?: boolean;
  feedback?: FeedBackI;
}

export const OrderItem: FC<OrderItemPropsI> = ({
  orderId,
  from,
  to,
  status,
  price,
  carType,
  extraServices,
  lastUpdate,
  isDriver,
  page,
  customerInfo,
  driverInfo,
  mayTakeOrder,
  feedback,
}) => {
  const { extra_services } = useTypedSelector((state) => state.cityInfo);
  const newFrom = from.split(', ').slice(0, 2).join(', ');
  const newTo = to.split(', ').slice(0, 2).join(', ');
  const date = new Date(lastUpdate).toLocaleDateString();
  const time = new Date(lastUpdate).toLocaleTimeString();

  const { changeOrderStatusAction } = useDriverOrderNewActions();
  const { changeOrderStatusAction: changeUserOrderStatusAction } =
    useUserOrderActions();
  // TODO do not have cityInfo without open order page
  const extraServicesNames =
    extraServices.map((id: number) => {
      const extServItem = extra_services.find((extServ) => extServ.id === id);
      return extServItem?.name;
    }) || [];

  const onCancelHandler = () => {
    if (isDriver) {
      changeOrderStatusAction({
        status: Statuses.CANCELED,
        id: orderId,
      });
    } else {
      changeUserOrderStatusAction({
        status: Statuses.CANCELED,
        id: orderId,
      });
    }
  };

  const getFeedback = (feedback: string, maxLength = 35) => {
    const isOver = feedback.length > maxLength;
    let text;
    if (isOver) {
      text = feedback.substring(0, maxLength) + '...';
    } else {
      text = feedback;
    }

    return (
      <div className="info" title={isOver ? feedback : ''}>
        <p className="info__label">Feedback:</p>
        <p className="info__value">{text}</p>
      </div>
    );
  };

  return (
    <li className="request__item">
      <div className="group request__up">
        <div className="request__adress">
          <div className="request__street">
            <span className="info__label">From:</span>
            <span>{newFrom}</span>
          </div>

          <div className="request__street">
            <span className="info__label">To:</span>
            <span>{newTo}</span>
          </div>
        </div>

        <div className="request__data">
          <ul className="request__info list group">
            <li>
              {/* icon carType
              <i
                title="{ true }"
                id="request.carType"
                className="request__car"
              ></i> */}
              <span> {carType} </span>
            </li>

            <li>
              <span className="info__label">price: </span>
              <span className="info__value">{price}</span>
            </li>
            {driverInfo?.rating && (
              <li>
                <span className="info__label">rating: </span>
                <span className="info__value">{driverInfo.rating}</span>
              </li>
            )}
          </ul>
          <div className="group">
            {page === Pages.CURRENT && (
              <button
                onClick={onCancelHandler}
                className="request__button cancel button button--hovered button--outlined button--border"
              >
                Cancel order
              </button>
            )}

            {isDriver && page === Pages.CURRENT && (
              <button
                onClick={() =>
                  changeOrderStatusAction({
                    status: Statuses.FINISHED,
                    id: orderId,
                  })
                }
                className="request__button finish button button--hovered button--outlined button--border"
              >
                Finish order
              </button>
            )}

            {isDriver && page === Pages.ALL && (
              <button
                onClick={() => {
                  changeOrderStatusAction({
                    status: Statuses.ACCEPTED,
                    id: orderId,
                  });
                }}
                className="request__button take button button--hovered button--outlined button--border"
                disabled={mayTakeOrder}
                title={
                  mayTakeOrder
                    ? 'You should finish current order!'
                    : 'Take order.'
                }
              >
                Take order
              </button>
            )}
            {page === Pages.HISTORY && !feedback && (
              <button
                onClick={() => 'leaveFeedback'}
                className="request__button take button button--hovered button--outlined button--border"
                title={'Leave feedback'}
              >
                Feedback
              </button>
            )}
          </div>
          {page === Pages.HISTORY && feedback && getFeedback(feedback.text)}
        </div>
      </div>
      <div className="request__status">
        <div className="info">
          <p className="info__label">Status:</p>
          <p className="info__value">{status}</p>
        </div>
        <div className="info">
          <p className="info__label">
            {page === Pages.HISTORY ? 'Date:' : 'Time:'}
          </p>
          <p className="info__value date">
            {page === Pages.HISTORY && (
              <span>
                {date}
                <br />
              </span>
            )}
            {time}
          </p>
        </div>
        {extraServicesNames.length > 0 && (
          <div className="info" title="request.description">
            <p className="info__label">Services:</p>
            {/* <p className="info__value">{ description }</p> */}

            <div className="info__extra-services">
              {extraServicesNames
                .filter((name) => {
                  return !!name;
                })
                .map((serviceName: any) => {
                  const Icon = extraServicesIcons[serviceName];
                  return (
                    <Icon
                      key={serviceName}
                      className="info__extra-services-icon"
                      title={serviceName}
                    />
                  );
                })}
            </div>
          </div>
        )}

        {isDriver && page === Pages.CURRENT && (
          <div className="info" title="User phone number">
            <p className="info__label">Phone:</p>
            <a className="info__value" href={'tel:' + customerInfo!.phone}>
              {customerInfo && customerInfo.phone}
            </a>
          </div>
        )}

        {!isDriver && driverInfo && (
          <>
            <div className="info" title="!isDriver && info">
              <p className="info__label">Car model:</p>
              <p className="info__value">{driverInfo.carModel}</p>
            </div>
            <div className="info" title="!isDriver && info">
              <p className="info__label">Car color:</p>
              <p className="info__value">{driverInfo.carColor}</p>
            </div>
            <div className="info" title="!isDriver && info">
              <p className="info__label">Car number:</p>
              <p className="info__value">{driverInfo.carNumber}</p>
            </div>
          </>
        )}
      </div>
    </li>
  );
};
