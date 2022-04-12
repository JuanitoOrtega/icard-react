import React from 'react';
import { Button, Image } from 'semantic-ui-react';
import classNames from 'classnames';
import moment from 'moment';
import 'moment/locale/es';
import { useOrder } from '../../../../hooks';
import { ORDER_STATUS } from '../../../../utils/constants';
import './OrderItemAdmin.scss';

export function OrderItemAdmin(props) {
    const { order, onReloadOrders } = props;
    // console.log(order);
    const { title, image } = order.product_data;
    const { checkDeliveredOrder } = useOrder();

    const onCheckDeliveredOrder = async () => {
        try {
            await checkDeliveredOrder(order.id);
            onReloadOrders();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div
            className={classNames('order-item-admin', {
                [order.status.toLowerCase()] : true
            })}
        >
            <div className='order-item-admin__time'>
                <span>{moment(order.created_at).format('HH:mm')}</span> {' - '}
                <span>{moment(order.created_at).startOf('seconds').fromNow()}</span>
            </div>

            <div className='order-item-admin__product'>
                <Image src={image} size='tiny' rounded />
                <p>{title}</p>
            </div>
            {order.status === ORDER_STATUS.PENDING && (
                <Button primary onClick={onCheckDeliveredOrder}>
                    Marcar como entregado
                </Button>
            )}
            {order.note && (
                <div className='order-item-admin__note'>
                    <p>Nota: {order.note}</p>
                </div>
            )}
        </div>
    );
}
