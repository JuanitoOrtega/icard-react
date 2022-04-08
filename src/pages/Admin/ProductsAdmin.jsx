import React, { useState, useEffect } from 'react';
import { Loader } from 'semantic-ui-react';
import { HeaderPage, TableProductAdmin, AddEditProductForm } from '../../components/Admin';
import { ModalBasic } from '../../components/Common';
import { useProduct } from '../../hooks';

export function ProductsAdmin() {
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);
    const [refetch, setRefetch] = useState(false);
    const { loading, products, getProducts, deleteProduct } = useProduct();

    useEffect(() => getProducts(), [refetch]);

    const openCloseModal = () => setShowModal((prev) => !prev); // función para cerrar el modal
    const onRefetch = () => setRefetch((prev) => !prev); // función para recargar la página

    // Abrir popup para agregar producto
    const addProduct = () => {
        setTitleModal('Agregar nuevo producto');
        setContentModal(
            <AddEditProductForm onClose={openCloseModal} onRefetch={onRefetch} />
        );
        openCloseModal();
    }

    // Para actualizar un producto
    const updateProduct = (product) => {
        setTitleModal('Actualizar producto');
        setContentModal(
            <AddEditProductForm onClose={openCloseModal} onRefetch={onRefetch} product={product} />
        );
        openCloseModal();
    }

    // Delete product
    const onDeleteProduct = async (data) => {
        const result = window.confirm(`¿Estás seguro de eliminar el producto: ${data.title}?`);
        if (result) {
            // console.log('Eliminado');
            await deleteProduct(data.id);
            onRefetch();
        }
    }

    return (
        <>
            <HeaderPage title='Productos' btnTitle='Nuevo producto' btnClick={addProduct} />

            {loading ? (
                <Loader active inline='centered'>
                    Cargando productos...
                </Loader>
            ) : (
                <TableProductAdmin
                    products={products}
                    updateProduct={updateProduct}
                    deleteProduct={onDeleteProduct}
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
