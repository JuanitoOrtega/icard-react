import React from 'react';
import { Table, Button, Icon } from 'semantic-ui-react';
import { usePayment, useOrder } from '../../../../hooks';
import './PaymentDetail.scss';

export function PaymentDetail(props) {
    const { payment, orders, openCloseModal, onReloadOrders } = props;
    const { closePayment } = usePayment();
    const { closeOrder } = useOrder();
    
    // console.log(payment);

    const getIconPayment = (key) => {
        if (key === 'CARD') return <Icon name='credit card outline' />;
        if (key === 'CASH') return <Icon name='money bill alternate outline' />;
        return null;
    }

    const onCloseTable = async () => {
        const result = window.confirm('Are you sure to close this table?');
        if (result) {
            await closePayment(payment.id);

            for await (const order of orders) {
                await closeOrder(order.id);
                // console.log(order);
            }
            onReloadOrders();
            openCloseModal();
        }
    }

    return (
        <div className='payment-detail'>
            <Table striped>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>Mesa:</Table.Cell>
                        <Table.Cell>{payment.table_data.number}</Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Total:</Table.Cell>
                        <Table.Cell>Bs. <strong>{payment.amount}</strong></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell>Pagado:</Table.Cell>
                        <Table.Cell>
                            {getIconPayment(payment.payment_type)}
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
            </Table>
            <Button color='green' fluid onClick={onCloseTable}>
                Marcar como pagado y cerrar mesa
            </Button>
        </div>
    );
}
