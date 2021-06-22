import React, { useState, useEffect, SyntheticEvent } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {
  faMapMarkerAlt,
  faArrowAltCircleRight,
  faHryvnia,
  faInfoCircle,
  faPhone,
  faTaxi,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { Container, Row } from 'reactstrap';
import { ColInfo } from '../../components/colInfo';
import { useOrderActions } from '../../hooks/useActions';

/**
 * @return {Object}
 */
const OrderDriverAccepted = ({ match }: any) => {
  console.log(match);
  const [order, setOrder]: any = useState<any[]>([]);
  // const accepted = useSelector(state => state.orderList.accepted)
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const data = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}order/${match.params.id}`,
    );

    console.log(data);
    setOrder(data.data.data);
  };

  const { finishOrderAction } = useOrderActions();

  return (
    <div className="jumbotron">
      <div>
        <div className="walk-img animation">
          <p>passenger is waiting</p>
        </div>
        <div className="box">
          <Container>
            <Row>
              <ColInfo xs="col-6" icon={faMapMarkerAlt} order={order.from} />
              <ColInfo
                icon={faPhone}
                order={<a href="tel:+38 099 123 45 67">099 123 45 67</a>}
              />
            </Row>

            <Row>
              <ColInfo
                xs="col-6"
                icon={faArrowAltCircleRight}
                order={order.to}
              />
              <ColInfo icon={faInfoCircle} order={order.extra_services} />
            </Row>

            <Row>
              <ColInfo
                xs="col-6"
                icon={faHryvnia}
                order={<strong>{order.price}</strong>}
              />
              <ColInfo
                icon={faStar}
                order={<span>{order.info} 4.5 Oleg</span>}
              />
            </Row>

            <Row>
              <ColInfo xs="col-6" icon={faTaxi} order={order.car_type} />
            </Row>
            <div className="btn-space">
              <Link to={'#'}>
                <Button variant="success">Start</Button>
              </Link>
              <Button variant="primary" onClick={finishOrderAction}>
                Finish
              </Button>
              <Link to={'#'}>
                <Button variant="danger">Cancel</Button>
              </Link>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
};

export default OrderDriverAccepted;
