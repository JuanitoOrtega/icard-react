import React, { useEffect } from 'react';
import { Loader } from 'semantic-ui-react';
import { HeaderPage, TablesListAdmin } from '../../components/Admin';
import { useTable } from '../../hooks';

export function OrdersAdmin() {
    const { loading, tables, getTables } = useTable();

    useEffect(() => getTables(), []);
    // console.log(tables);

    return (
        <>
            <HeaderPage title='Restaurante' />

            {loading ? (
                <Loader active inline='centered'>
                    Cargando mesas...
                </Loader>
            ) : (
                <TablesListAdmin tables={tables} />
            )}
        </>
    );
}