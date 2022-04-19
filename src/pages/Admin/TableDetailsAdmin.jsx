import React, { useState, useEffect } from 'react';
import { Loader } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { forEach, size } from 'lodash';
import { HeaderPage, AddOrderForm } from '../../components/Admin';
import { ModalBasic } from '../../components/Common';
import { ListOrderAdmin, PaymentDetail } from '../../components/Admin/TableDetails';
import { useOrder, useTable, usePayment } from '../../hooks';

export function TableDetailsAdmin() {
    const [reloadOrders, setReloadOrders] = useState(false);
    const [paymentData, setPaymentData] = useState(null);
    const { id } = useParams();
    // console.log(params);
    const { loading, orders, getOrdersByTable, addPaymentToOrder } = useOrder();
    const { table, getTable } = useTable();
    const { createPayment, getPaymentByTable } = usePayment();

    const [showModal, setShowModal] = useState(false);

    // console.log(table);

    useEffect(() => {
        getOrdersByTable(id, '', 'ordering=-status,created_at');
    }, [id, reloadOrders]);

    // console.log(orders);

    useEffect(() => getTable(id), [id]);

    useEffect(() => {
        (async () => {
            const response = await getPaymentByTable(id);
            if (size(response) > 0) {
                setPaymentData(response[0]);
            } else {
                console.log('Cuenta no pedida');
            }
        })();
    }, [reloadOrders]); // Este useEffect se ejecuta cada vez que reloadOrders cambia

    const onReloadOrders = () => setReloadOrders((prev) => !prev);
    const openCloseModal = () => setShowModal((prev) => !prev);

    const onCreatePayment = async () => {
        const result = window.confirm('¿Estás seguro que quieres generar la cuenta de la mesa?');
        if (result) {
            let totalPayment = 0;
            forEach(orders, (order) => {
                totalPayment += Number(order.product_data.price);
            });

            const resultTypePayment = window.confirm(
                'Pago con tarjeta pulsa ACEPTAR, pago con efectivo pulsa CANCELAR'
            );

            const paymentData = {
                table: id,
                amount: totalPayment.toFixed(2),
                payment_type: resultTypePayment ? 'CARD' : 'CASH',
                status_payment: 'PENDING'
            };
            const payment = await createPayment(paymentData);

            for await (const order of orders) {
                await addPaymentToOrder(order.id, payment.id);
            }
            // console.log(payment);
            onReloadOrders();
        }
    }

    return (
        <>
            <HeaderPage
                title={`Mesa ${table?.number || ''}`}
                btnTitle={paymentData ? 'Ver cuenta' : 'Añadir pedido'}
                btnClick={openCloseModal}
                btnTitleTwo={!paymentData ? 'Generar cuenta' : null}
                btnClickTwo={onCreatePayment}
            />
            {loading ? (
                <Loader active inline='centered'>
                    Cargando...
                </Loader>
            ) : (
                <ListOrderAdmin orders={orders} onReloadOrders={onReloadOrders} />
            )}
            <ModalBasic show={showModal} onClose={openCloseModal} title={paymentData ? 'Cuenta' : 'Generar pedido'}>
                {paymentData ? (
                    <PaymentDetail payment={paymentData} orders={orders} openCloseModal={openCloseModal} onReloadOrders={onReloadOrders} />
                ) : (
                    <AddOrderForm idTable={id} openCloseModal={openCloseModal} onReloadOrders={onReloadOrders} />
                )}
            </ModalBasic>
        </>
    );
}
