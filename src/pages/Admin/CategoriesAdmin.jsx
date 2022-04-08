import React, { useState, useEffect } from 'react';
import { Loader } from 'semantic-ui-react';
import { HeaderPage, TableCategoryAdmin, AddEditCategoryForm } from '../../components/Admin';
import { ModalBasic } from '../../components/Common';
import { useCategory } from '../../hooks';

export function CategoriesAdmin() {
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState(null);
    const [contentModal, setContentModal] = useState(null);
    const [refetch, setRefetch] = useState(false);
    const { loading, categories, getCategories, deleteCategory } = useCategory();

    useEffect(() => getCategories(), [refetch]);

    const openCloseModal = () => setShowModal((prev) => !prev);
    const onRefetch = () => setRefetch((prev) => !prev); // Refetch para actualizar la tabla

    // Abrir popup para agregar categoría
    const addCategory = () => {
        setTitleModal('Agregar nueva categoría');
        setContentModal(
            <AddEditCategoryForm onClose={openCloseModal} onRefetch={onRefetch} />
        );
        openCloseModal();
    }

    // Update category
    const updateCategory = (data) => {
        setTitleModal('Editar categoría');
        setContentModal(
            <AddEditCategoryForm onClose={openCloseModal} onRefetch={onRefetch} category={data} />
        );
        openCloseModal();
    }

    // Delete category
    const onDeleteCategory = async (data) => {
        const result = window.confirm(`¿Estás seguro de eliminar la categoría: ${data.title}?`);
        if (result) {
            await deleteCategory(data.id);
            onRefetch();
        }
    }

    return (
        <>
            <HeaderPage title="Categorías" btnTitle="Nueva categoría" btnClick={addCategory} />
            {loading ? (
                <Loader active inline="centered">
                    Cargando categorías...
                </Loader>
            ) : (
                <TableCategoryAdmin
                    categories={categories}
                    updateCategory={updateCategory}
                    deleteCategory={onDeleteCategory}
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
