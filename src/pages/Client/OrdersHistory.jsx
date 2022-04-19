import React, { useState, useEffect } from 'react';
import { Loader, Button } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { map, size, forEach } from 'lodash';
import { OrderHistoryItem } from '../../components/Client';
import { ModalConfirm } from '../../components/Common';
import { useOrder, useTable, usePayment } from '../../hooks';

export function OrdersHistory() {
    const [idTable, setIdTable] = useState(null);
    const [showTypePayment, setShowTypePayment] = useState(false);
    const [isRequestAccount, setIsRequestAccount] = useState(false);
    const { loading, orders, getOrdersByTable, addPaymentToOrder } = useOrder();
    const { getTableByNumber } = useTable();
    const { tableNumber } = useParams();
    const { createPayment, getPaymentByTable } = usePayment();

    useEffect(() => {
      (async () => {
            const table = await getTableByNumber(tableNumber);
            const idTableTemp = table[0].id;
            setIdTable(idTableTemp);

            getOrdersByTable(idTableTemp, '', 'ordering=-status,-created_at');
      })();
    }, []);

    useEffect(() => {
        (async () => {
            if (idTable) {
                const response = await getPaymentByTable(idTable);
                // console.log(response);
                setIsRequestAccount(response);
            }
        })();
    }, [idTable]);
    

    const onCreatePayment = async (payment_type) => {
        setShowTypePayment(false);

        let amount = 0;
        forEach(orders, (order) => {
            amount += Number(order.product_data.price);
        });

        // console.log('Tipo de pago ---> ', payment_type);
        // console.log('Total a pagar ---> ', amount);

        const paymentData = {
            table: idTable,
            amount: amount.toFixed(2),
            payment_type,
            status_payment: 'PENDING'
        }
        // console.log(paymentData);
        const payment = await createPayment(paymentData);
        for await (const order of orders) {
            await addPaymentToOrder(order.id, payment.id);
        }
        window.location.reload();
    }

    return (
        <div>
            <h1>Historial de pedidos</h1>

            {loading ? (
                <Loader active inline="centered">
                    Cargando...
                </Loader>
            ) : (
                <div>
                    {size(orders) > 0 && (
                        <Button
                            primary
                            fluid
                            onClick={() => size(isRequestAccount) === 0 && setShowTypePayment(true)}
                        >
                            {size(isRequestAccount) > 0 ? (
                                'La cuenta ya está pedida'
                            ) : (
                                'Pedir la cuenta'
                            )}
                        </Button>
                    )}

                    {map(orders, (order) => (
                        <OrderHistoryItem key={order.id} order={order} />
                    ))}
                </div>
            )}

            <ModalConfirm
                title='Pagar con tarjeta o efectivo'
                show={showTypePayment}
                onClose={() => onCreatePayment('CASH')}
                onCloseText='Efectivo'
                onConfirm={() => onCreatePayment('CARD')}
                onConfirmText='Tarjeta'
            />
        </div>
    );
}
