import { BASE_API, ORDER_STATUS } from '../utils/constants';

// Para traer toda la información de una orden
export async function getOrdersByTableApi(id, status = '', ordering = '') {
    try {
        const tableFilter = `table=${id}`;
        const statusFilter = `status=${status}`;
        const closeFilter = 'close=False';

        const url = `${BASE_API}/api/orders/?${tableFilter}&${statusFilter}&${closeFilter}&${ordering}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

// Para marcar un pedido como entregado
export async function checkDeliveredOrderApi(id) {
    try {
        const url = `${BASE_API}/api/orders/${id}/`;
        const params = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status: ORDER_STATUS.DELIVERED
            })
        };
        const response = await fetch(url, params);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}

// Para añadir un pedido
export async function addOrderToTableApi(idTable, idProduct) {
    try {
        const url = `${BASE_API}/api/orders/`;
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                status: ORDER_STATUS.PENDING,
                table: idTable,
                product: idProduct
            })
        };
        await fetch(url, params);
    } catch (error) {
        throw error;
    }
}

export async function addPaymentToOrderApi(idOrder, idPayment) {
    try {
        const url = `${BASE_API}/api/orders/${idOrder}/`;
        const params = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                payment: idPayment
            })
        };
        await fetch(url, params);
    } catch (error) {
        throw error;
    }
}

export async function closeOrderApi(idOrder) {
    try {
        const url = `${BASE_API}/api/orders/${idOrder}/`;
        const params = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                close: true
            })
        };
        await fetch(url, params);
    } catch (error) {
        throw error;
    }
}

export async function getOrdersByPaymentApi(idPayment) {
    try {
        const paymentFilter = `payment=${idPayment}`;
    
        const url = `${BASE_API}/api/orders/?${paymentFilter}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        throw error;
    }
}