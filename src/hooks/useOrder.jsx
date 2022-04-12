import { useState } from 'react';
import { getOrdersByTableApi, checkDeliveredOrderApi, addOrderToTableApi } from '../api/order';

export function useOrder() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [orders, setOrders] = useState(null);

    const getOrdersByTable = async (id, status, ordering) => {
        try {
            setLoading(true);
            const response = await getOrdersByTableApi(id, status, ordering);
            setLoading(false);
            setOrders(response);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    }

    const checkDeliveredOrder = async (id) => {
        try {
            setLoading(true);
            const response = await checkDeliveredOrderApi(id);
            setLoading(false);
            setOrders(response);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    }

    const addOrderToTable = async (idTable, idProduct) => {
        try {
            setLoading(true);
            await addOrderToTableApi(idTable, idProduct);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(error);
        }
    }

    return {
        loading,
        error,
        orders,
        getOrdersByTable,
        checkDeliveredOrder,
        addOrderToTable
    }
}