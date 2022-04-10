import React, { useState, useEffect } from 'react';
import { Loader } from 'semantic-ui-react';
import { HeaderPage, TableTablesAdmin, AddEditTableForm } from '../../components/Admin';
import { ModalBasic } from '../../components/Common';
import { useTable } from '../../hooks';

export function TablesAdmin() {
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);
    const [refetch, setRefetch] = useState(false);

    const { loading, tables, getTables, deleteTable } = useTable();

    useEffect(() => {
        getTables();
    }, [refetch]);

    console.log(tables);

    const openCloseModal = () => setShowModal((prev) => !prev);
    const onRefetch = () => setRefetch((prev) => !prev);

    const addTable = () => {
        setTitleModal('Agregar mesa');
        setContentModal(<AddEditTableForm onClose={openCloseModal} onRefetch={onRefetch} />);
        openCloseModal();
    }

    // Para actualizar una mesa
    const updateTable = (data) => {
        setTitleModal('Actualizar mesa');
        setContentModal(
            <AddEditTableForm
                onClose={openCloseModal}
                onRefetch={onRefetch}
                table={data}
            />
        );
        openCloseModal();
    }

    // Delete table
    const onDeleteTable = async (data) => {
        const result = window.confirm(`¿Estás seguro de eliminar la mesa: ${data.number}?`);
        if (result) {
            // console.log('Eliminado');
            await deleteTable(data.id);
            onRefetch();
        }
    }

    return (
        <>
            <HeaderPage
                title='Mesas'
                btnTitle='Crear mesa'
                btnClick={addTable}
            />

            {loading ? (
                <Loader active inline="centered">
                    Cargando mesas...
                </Loader>
            ) : (
                <TableTablesAdmin
                    tables={tables}
                    updateTable={updateTable}
                    deleteTable={onDeleteTable}
                />
            )}

            <ModalBasic
                show={showModal}
                onClose={openCloseModal}
                title={titleModal}
                children={contentModal}
            />
        </>
    );
}
